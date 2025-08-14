import createHttpError from "http-errors";
import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import { config } from "../config/config.js";

const { sign } = pkg;

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      const error = createHttpError(400, "User already exists with this email");
      next(error);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // User save to the Database
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: hashedPassword,
      },
    });

    //JOSN web token
    const token = sign({ sub: user.id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ acessToken: token });
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error while getting user"));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(createHttpError(400, "Please provide email and password"));

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) return next(createHttpError(400, "User not found"));

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
    if (!isMatch) return next(createHttpError(400, "Invalid password"));

    // Create and assign a token
    const token = sign({ sub: existingUser.id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ accessToken: token });
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error while getting user"));
  }
};

export { createUser, login };
