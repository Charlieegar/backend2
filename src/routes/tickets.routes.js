import { Router } from "express";
import { createPurchase } from "../controllers/tickets.controller.js";

const router = Router();

router.post("/purchase", createPurchase); 

export default router;
