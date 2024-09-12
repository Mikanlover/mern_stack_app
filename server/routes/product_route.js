import express from "express";
import { createProducts, deleteProduct, getProducts, updateProduct } from "../controllers/product_controller.js";

const router = express.Router();

router.get("/:id?", getProducts);
router.post("/", createProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;