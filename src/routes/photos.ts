import express from "express";
import { getPhotoURLs } from "../controllers/photoController";

const photoRouter = express.Router();
photoRouter.get("/:n?", getPhotoURLs);

export default photoRouter;
