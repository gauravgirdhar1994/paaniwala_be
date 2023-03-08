const db = require('../config/db.config');
const { createNewProduct: createNewProductQuery, getAllProducts } = require('../database/queries');
const { logger } = require('../utils/logger');

class Product {
    constructor(productTitle, productDescription, productImage, size, quantity, color) {
        this.productTitle = productTitle;
        this.productDescription = productDescription;
        this.productImage = productImage;
        this.size = size;
        this.quantity = quantity;
        this.color = color;
    }

    static create(newProduct, cb) {
        db.query(createNewProductQuery, 
            [
                newProduct.productTitle, 
                newProduct.productImage, 
                newProduct.productDescription, 
                newProduct.size,
                newProduct.quantity,
                newProduct.color,
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    productTitle: newProduct.productTitle,
                    productImage: newProduct.productImage,
                    productDescription: newProduct.productDescription,
                    size: newProduct.size,
                    quantity: newProduct.quantity,
                    color: newProduct.color,
                });
        });
    }

    static getAllProducts(cb) {
        db.query(getAllProducts, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = Product;