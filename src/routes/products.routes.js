import { Router } from "express";
import { authorizeAdmin } from "../middlewares/auth.middleware.js";
import { createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";

const router = Router();

// Crear producto (solo admin)
router.post("/", authorizeAdmin, createProduct);

// Actualizar producto (solo admin)
router.put("/:id", authorizeAdmin, updateProduct);

// Eliminar producto (solo admin)
router.delete("/:id", authorizeAdmin, deleteProduct);

export default router;
