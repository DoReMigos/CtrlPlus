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

// apiRouter.patch('/:productId', requireAdminUser, async (req, res, next) => {
//     const { title, brand, description, price, inventory, category, image } = req.body;
//     const id = req.params.routineId;
//     const routine = await getProductsById(id)
//     try {
//         if (!user.isAdmin) {
//             res.status(403)
//             next({
//                 name: "UserNotAdminUserOrFound",
//                 message: `User ${req.user.username} is not allowed to update ${routine.name}`,
//             });
//         }
//         const updatedProduct = await updateProduct({ title, brand, description, price, inventory, category, image });
//         res.send(updatedProduct);
//     } catch ({ name, message }) {
//         next({ name, message });
//     }
// })


module.exports = apiRouter;