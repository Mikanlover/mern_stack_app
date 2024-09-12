import Product from "../models/product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
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
};

export const createProducts = async (req, res) => {
    const product = req.body;
    if (product.name === undefined || product.price === undefined || product.image === undefined) {
        return res.status(400).json({ "message": "Please provide all fields !" });
    }
    if (typeof product.name != "string" || typeof product.price != "number" || typeof product.image != "string") {
        return res.status(400).json({ "message": "Incorrect values on the fields !" });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ "message": "The product is created with success !", "product": newProduct.toJSON() });
    } catch (error) {
        console.error("Error in create product :", error.message);
        res.status(500).json({ "message": "Server Error !" });
    }
};

export const updateProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ "message": "Product deleted !"});
    } catch (error) {
        res.status(404).json({ "message": error.message });
    }
};