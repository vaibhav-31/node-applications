const express = require('express');
const router = express.Router();
const productController = require('../controller/product')



router
// First Api to get(read) all the products
.get("/", productController.getProduct)

//  To Add a new product
.post("/", productController.addProduct)

// To Update a product
.patch("/:id", productController.updateProduct)

// To Delete a Product
.delete("/:id", productController.deleteProduct);

exports.router = router;