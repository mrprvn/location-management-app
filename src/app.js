import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import createHttpError from "http-errors";
import userRouter from "./user/userRouter.js";
import locationRouter from "./location/locationRouter.js";
import { config } from "./config/config.js";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: config.FRONTEND_URL,
  })
);

app.get("/", () => {
  const error = createHttpError(400, "something went wrong");
  throw error;
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/locations", locationRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
