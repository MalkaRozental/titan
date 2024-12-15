import express from "express";
import { getPhotoURLs } from "../controllers/photoController";

const photoRoutes = express.Router();
photoRoutes.get("/:n", getPhotoURLs);

export default photoRoutes;
