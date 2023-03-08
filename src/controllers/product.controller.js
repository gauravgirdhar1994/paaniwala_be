const Product = require('../models/product.model');

exports.createProduct = (req, res) => {
    const { productTitle, productDescription, productImage, color, size, quantity } = req.body;

    const product = new Product(productTitle, productDescription, productImage, color, size, quantity);

    Product.create(product, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    });
}

exports.getProducts = (req, res) => {

    Product.getAllProducts((err, data) => {
        console.log('error', err);
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    });
};