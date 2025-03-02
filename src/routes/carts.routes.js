import { Router } from "express";
import { createCart, createPurchase } from "../controllers/carts.controller.js";
import { authorizeUser } from "../middlewares/auth.middleware.js"; 

const router = Router();

router.post("/", createCart);
router.post("/:cid/purchase", authorizeUser, createPurchase); 

export default router;
