import createHttpError from "http-errors";
import prisma from "../config/prismaClient.js";
import fs from "node:fs";
import AdmZip from "adm-zip";

const addLocation = async (req, res, next) => {
  try {
    const { name, latitude, longitude } = req.body;

    const userId = req.userId;

    // Check if all fields are provided
    if (!name || !latitude || !longitude) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    // Save location to DB
    const location = await prisma.location.create({
      data: {
        name,
        latitude,
        longitude,
        userId,
      },
    });
    res.status(201).json(location);
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error while adding location"));
  }
};

const uploadLocationFile = async (req, res, next) => {
  try {
    const { file } = req.files;
    const userId = req.userId;

    const zip = new AdmZip(file[0].path);
    const txtFiles = zip
      .getEntries()
      .filter(
        (entry) =>
          !entry.isDirectory && entry.entryName.toLowerCase().endsWith(".txt")
      );

    if (txtFiles.length !== 1) {
      const error = createHttpError(
        400,
        "ZIP must contain exactly one text file"
      );
      next(error);
    }

    const textContent = txtFiles[0].getData().toString("utf8");

    const lines = textContent
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const locations = lines.slice(1).map((line) => {
      const [name, latitude, longitude] = line.split(",").map((s) => s.trim());
      return {
        name,
        latitude: latitude,
        longitude: longitude,
        userId,
      };
    });

    // Save all locations
    await prisma.location.createMany({ data: locations });

    try {
      await fs.promises.unlink(file[0].path);
    } catch (error) {
      console.log("Error in deleting file : ", error);
    }

    res.json({ locations });
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error while uploading file"));
  }
};

const getAllLocations = async (req, res, next) => {
  try {
    const locations = await prisma.location.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: req.userId,
      },
    });
    res.json({ locations });
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error while getting all locations"));
  }
};

export { addLocation, uploadLocationFile, getAllLocations };
