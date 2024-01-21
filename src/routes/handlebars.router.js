//import { Router } from 'express';
const express = require('express');
const router = express.Router();
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


// .get("/vistacarrito", (req, res) => {
//     console.log('Renderizando .. /vistacarrito..');    
//     res.render("vistacarrito", {
//         title: "Vista carrito",
//         programa: "vistacarrito"
//     });
// })
;

//export { router as default }; 
module.exports = router;

