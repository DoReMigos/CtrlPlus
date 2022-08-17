const express = require('express');
const apiRouter = express.Router();
const { requireUser, requireAdminUser } = require("./utils");
const { Products } = require("../db/models")

apiRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await Products.getAllProducts();
        console.log(allProducts , "this is all Products")
        res.send(allProducts);
    } catch (error) {
        next(error);
    }
})

apiRouter.post('/', requireAdminUser, async (req, res, next) => {
    const { title, brand, description, price, inventory, category, image } = req.body;
    const _product = await Products.createProducts({ title, brand, description, price, inventory, category, image })
    try {
        if (_product) {
            res.send(_product)
        }
    } catch (error) {
        next(error);
    }
})

apiRouter.patch('/:productId', requireAdminUser, async (req, res, next) => {
    const { title, brand, description, price, inventory, category, image } = req.body;
    const id = req.params.productsId;
    const product = await Products.getProductById(id)
    try {
        if (!req.user.isAdmin) {
            res.status(403)
            next({
                name: "UserNotAdminUser",
                message: `Only admins allowed to update ${product.name}`,
            });
        }
        const updatedProduct = await Products.updateProduct({ title, brand, description, price, inventory, category, image });
        res.send(updatedProduct);
    } catch ({ name, message }) {
        next({ name, message });
    }
})

apiRouter.delete('/:productId', requireAdminUser, async (req, res, next) => {
    const id = req.params.productsId;
    const product = await Products.getProductById(id)
    try {
        if (!req.user.isAdmin) {
            res.status(403)
            next({
                name: "UserNotAdminUser",
                message: `Only admins allowed to delete ${product.name}`,
            })
        }
            const deletedProduct = Products.deleteProduct(id)
            res.send(deletedProduct)
    } catch (error) {
        next(error);
    }
})

apiRouter.get('/categories', async (req, res, next) => {
    try {
        const productsByCategory = await Products.getProductByCategory();
        res.send(productsByCategory);
    } catch (error) {
        next(error);
    }
})

apiRouter.get('/id', async (req, res, next) => {
    try {
        const productById = await Products.getProductById();
        res.send(productById);
    } catch (error) {
        next(error);
    }
})

module.exports = apiRouter;