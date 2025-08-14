import createHttpError from "http-errors";
import pkg from "jsonwebtoken";
import { config } from "../config/config.js";

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  const { verify } = pkg;
  if (!token) {
    return next(createHttpError(401, "Authorization is required"));
  }

  try {
    const parsedToken = token.split(" ")[1];
    const decoded = verify(parsedToken, config.JWT_SECRET);
    const _req = req;
    _req.userId = decoded.sub;
    next();
  } catch (error) {
    console.error(error);
    return next(createHttpError(401, "Token expired"));
  }
};

export default authenticate;
