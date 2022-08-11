const express = require('express');
const router = express.Router();
const { requireUser, requireAdminUser } = require("./utils");
const { getAllProducts, createProducts, getProductByCategory, getProductById, updateProduct, deleteProduct } = require("../db/models")

router.get('/', async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts);
    } catch (error) {
        next(error);
    }
})

router.post('/', requireAdminUser, async (req, res, next) => {
    const { title, brand, description, price, inventory, category, image } = req.body;
    const _product = await createProduct({ title, brand, description, price, inventory, category, image })
    try {
        if (_product) {
            res.send(_product)
        }
    } catch (error) {
        next(error);
    }
})