import express from "express";
import ExportSales from "../../Model/ExportSales.js";
const router = express.Router();


router.post("/export/sales", ExportSales);
router.post("/export/purchase", ExportSales);
router.post("/export/payments", ExportSales);


export default router;
