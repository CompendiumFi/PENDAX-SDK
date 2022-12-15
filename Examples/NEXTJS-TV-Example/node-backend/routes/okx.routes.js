import { Router } from "express";
import {
  getAllMarkets,
  getOrderHistory,
} from "../controllers/okx.controllers.js";
const router = Router();
router.get("/markets", getAllMarkets);
router.get("/orders", getOrderHistory);

export default router;
