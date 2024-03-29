//import { Router } from 'express';
const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManagerMongo.js');
const cartManager = new CartManager(); // Instantiate CartManager

router
.get("/products", (req, res) => {
    console.log('Renderizando .. /products..');    
    res.render("home", {
        title: "Listado de  productos por API-WINSOCK",
        programa: "home"
    });
})

.get("/add", (req, res) => {
    console.log('Renderizando .. /add..');    
    res.render("addproduct", {
        title: "ingreso de productos por API-WINSOCK",
        programa: "addproduct"
    });
})


.get("/realTimeProducts", (req, res) => {
    console.log('Renderizando .. /realTimeProducts..');    
    res.render("realTimeProducts", {
        title: "Real time Refresh WINSOCK",
        programa: "realTimeProducts"
    });
})

.get("/carts", async (req, res) => {
    console.log('Renderizando .. /listacarritos..');    

    try {
        const carts = await cartManager.getCarts();

        res.render("listacarritos", {
            title: "Listado de Carritos",
            programa: "Listacarritos",
            cartData: carts,  // Pasa los datos de los carritos a la vista
        });
    } catch (error) {
        console.error('Error al obtener carritos:', error);
        res.status(500).send('Error interno del servidor');
    }
})

//export { router as default }; 
module.exports = router;

