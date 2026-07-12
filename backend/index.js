import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routers/authRouter.js";
import vehicleRoutes from "./src/routers/vehicleRoutes.js";
import driverRoutes from "./src/routers/driverRoutes.js";
import tripRoutes from "./src/routers/tripRoutes.js";
import dashboardRoutes from "./src/routers/dashboardRoutes.js";
import maintenanceRoutes from "./src/routers/maintenanceRoutes.js";
import fuelRoutes from "./src/routers/fuelRoutes.js";
import analyticsRoutes from "./src/routers/analyticsRoutes.js";
import settingsRoutes from "./src/routers/settingsRoutes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  console.log("server is working");
  res.send("server is working");
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.log("Error Found", {ErrorMessage,StatusCode});

  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log("Server Started at Port: ", port);
  });
};

startServer();
