const express = require('express');
const CartManager = require('../managers/CartManagerMongo.js');
const router = express.Router();
const cartManager = new CartManager(); // Instantiate CartManager

router
    .get('/:cid', async (req, res) => {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        res.send({
            status: 'success',
            payload: cart,
        });
    })

    .get('/', async (req, res) => {
        const carts = await cartManager.getCarts();

        res.send({
            status: 'success',
            payload: carts,
        });
    })

    .post('/', async (req, res) => {
        const newCart = req.body;
        const result = await cartManager.createCart(newCart);

        res.send({
            status: 'success',
            payload: result,
        });
    })

    .put('/:cid', async (req, res) => {
        const { cid } = req.params;
        const updatedProducts = req.body.products;

        const result = await cartManager.updateCart(cid, updatedProducts);

        res.send({
            status: 'success',
            payload: result,
        });
    })

    .delete('/:cid', async (req, res) => {
        const { cid } = req.params;

        const result = await cartManager.deleteCart(cid);

        res.send({
            status: 'success',
            payload: result,
        });
    })

    .put('/:cid/products/:pid', async (req, res) => {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity;

        const result = await cartManager.updateProductQuantity(cid, pid, quantity);

        res.send({
            status: 'success',
            payload: result,
        });
    })

    .delete('/:cid/products/:pid', async (req, res) => {
        const { cid, pid } = req.params;

        const result = await cartManager.removeProductFromCart(cid, pid);

        res.send({
            status: 'success',
            payload: result,
        });
    });

module.exports = router;
