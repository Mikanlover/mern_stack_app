import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
import Product from './models/product.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/products/:id?", async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ "message": "Invalid ID format" });
            }
            const product = await Product.findById(id);
            if (product == null) {
                return res.status(404).json({ "message": "No product found !" });
            }
            res.status(200).json({ "data": products });
        } else {
            const products = await Product.find({});
            if (products == null) {
                return res.status(404).json({ "message": "No products found !" });
            }
            res.status(200).json({ "data": products });
        }
    } catch (error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ "message": "Server error !" });
    }
});

app.post("/products", async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image || typeof product.name != String || typeof product.price != Number || typeof product.image != String) {
        return res.status(400).json({ "message": "Please provide all fields !" });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ "message": "The product is created with success !", "product": newProduct.toJSON() });
    } catch (error) {
        console.error("Error in create product :", error.message);
        res.status(500).json({ "message": "Server Error !" });
    }
});

app.put("/put/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ "message": "Invalid Product Id !"});
    }
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new:true });
        res.status(200).json({ "data": updatedProduct});
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ "message": "Product deleted !"});
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
});

app.get("/", (req, res) => {
    res.send(`Server is ready !`);
});

app.listen(5000, () => {
    console.log(`Server started at http://localhost:5000`);
    connectDB();
});