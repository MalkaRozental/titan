import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./src/config/db";
import logger from "./src/config/logger";
import orderRoutes from "./src/routes/orders";
import photoRoutes from "./src/routes/photos";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use("/api/orders", orderRoutes);
app.use("/api/photos", photoRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
export default app;
