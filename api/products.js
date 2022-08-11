const express = require('express');
const router = express.Router();
const { requireUser, requireAdminUser } = require("./utils");
const { getAllProducts, createProducts, getProductByCategory, getProductById, updateProduct, deleteProduct } = require("../db/models")

apiRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts);
    } catch (error) {
        next(error);
    }
})

apiRouter.post('/', requireAdminUser, async (req, res, next) => {
    const { title, brand, description, price, inventory, category, image } = req.body;
    const _product = await createProducts({ title, brand, description, price, inventory, category, image })
    try {
        if (_product) {
            res.send(_product)
        }
    } catch (error) {
        next(error);
    }
})

apiRouter.patch('/:productsId', requireAdminUser, async (req, res, next) => {
    const { title, brand, description, price, inventory, category, image } = req.body;
    const id = req.params.productsId;
    const product = await getProductById(id)
    try {
        if (!req.user.isAdmin) {
            res.status(403)
            next({
                name: "UserNotAdminUser",
                message: `Only admins allowed to update ${product.name}`,
            });
        }
        const updatedProduct = await updateProduct({ title, brand, description, price, inventory, category, image });
        res.send(updatedProduct);
    } catch ({ name, message }) {
        next({ name, message });
    }
})

apiRouter.delete('/:productsId', requireAdminUser, async (req, res, next) => {
    const id = req.params.productsId;
    const product = await getProductById(id)
    try {
        if (!req.user.isAdmin) {
            res.status(403)
            next({
                name: "UserNotAdminUser",
                message: `Only admins allowed to delete ${product.name}`,
            })
        }
            const deletedProduct = deleteProduct(id)
            res.send(deletedProduct)
    } catch (error) {
        next(error);
    }
})

apiRouter.get('/categories', async (req, res, next) => {
    try {
        const productsByCategory = await getProductByCategory();
        res.send(productsByCategory);
    } catch (error) {
        next(error);
    }
})

apiRouter.get('/id', async (req, res, next) => {
    try {
        const productById = await getProductById();
        res.send(productById);
    } catch (error) {
        next(error);
    }
})

module.exports = apiRouter;