const express = require('express');
const CartManager = require('../managers/CartManagerMongo.js');
const router = express.Router();
const cartManager = new CartManager(); // Instantiate CartManager

router

    // traer todos los carritos
    .get('/', async (req, res) => {
        const carts = await cartManager.getCarts();

        res.send({
            status: 'success',
            payload: carts,
        });
    })

    // traer un carrito por id
    .get('/:cid', async (req, res) => {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        res.send({
            status: 'success',
            payload: cart,
        });
    })


    // crear un carrito
    .post('/', async (req, res) => {
        const newCart = req.body;
        const result = await cartManager.createCart(newCart);

        res.send({
            status: 'success',
            payload: result,
        });
    })

    
    // agregar un producto(s) a un carrito
    .put('/:cid', async (req, res) => {
        const { cid } = req.params;
        const updatedProducts = req.body.products;
        console.log(updatedProducts)
        const result = await cartManager.updateCart(cid, updatedProducts);

        res.send({
            status: 'success',
            payload: result,
        });
    })
     
    // aumenta cantidad de  un producto en el carrito
    .put('/:cid/products/:pid', async (req, res) => {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity;
        const result = await cartManager.updateProductQuantity(cid, pid, quantity);

        res.send({
            status: 'success',
            payload: result,
        });
    })

    // Elimina un producto de un carrito
    .delete('/:cid/products/:pid', async (req, res) => {
        const { cid, pid } = req.params;
        console.log("elimina producto del carrito",cid,pid)

        const result = await cartManager.removeProductFromCart(cid, pid);
        //result = "elimnina producto del carrito"

        res.send({
            status: 'success',
            payload: result,
        });
    })

    // Elmimina un carrito
    .delete('/:cid', async (req, res) => {
        const { cid } = req.params;
        const result = await cartManager.emptyCart(cid);        
        res.send({
            status: 'success',
            payload: result,
        });
    });



module.exports = router;
