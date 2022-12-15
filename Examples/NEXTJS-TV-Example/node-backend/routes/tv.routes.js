import { Router } from "express";
import { config, getSymbol, timeFunc, tvHistory } from "../controllers/tv.controller.js";
const router = Router();
router.get("/config", config);
router.get("/symbols", getSymbol);
router.get("/symbol_info", getSymbol);
router.get("/history", tvHistory);
router.get("/time",timeFunc)

export default router;
