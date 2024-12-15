import { Request, Response } from "express";
import logger from "../config/logger";
import NodeCache from "node-cache";
import axios from "axios";

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
const cacheKey = "photoURLs";

export const getPhotoURLs = async (req: Request, res: Response) => {
  const n = parseInt(req.params.n, 10);

  if (isNaN(n) || n <= 0) {
    logger.error("Invalid number of photos requested.");
    res.status(400).json({ error: "Invalid number of photos requested." });
    return;
  }

  const cachedPhotos: string[] = cache.get(cacheKey) ?? [];

  if (cachedPhotos && cachedPhotos.length >= n) {
    res.status(200).json(cachedPhotos.slice(0, n));
    return;
  }

  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: process.env.PIXABAY_API_KEY,
        per_page: 200,
      },
    });

    const photoUrls = response.data.hits.map((hit: any) => hit.webformatURL);
    cache.set(cacheKey, cachedPhotos.concat(photoUrls));
    res.status(200).json(cachedPhotos.slice(0, n));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch photos from Pixabay." });
  }
};
