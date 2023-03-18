const Product = require("../models/product.model");

exports.createProduct = (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "Product image is not found" });
  }

  const myFile = req.files.file;

  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/../../public/img/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "Error occured" });
    } else {
      const {
        productTitle,
        productDescription,
        color,
        size,
        quantity,
      } = req.body;

      const productImage = myFile.name;

      const product = new Product(
        productTitle,
        productDescription,
        productImage,
        color,
        size,
        quantity
      );

      Product.create(product, (err, data) => {
        if (err) {
          res.status(500).send({
            status: "error",
            message: err.message,
          });
        } else {
          res.status(201).send({
            status: "success",
            data: {
              data,
            },
          });
        }
      });
    }
  });
};

exports.getProducts = (req, res) => {
  Product.getAllProducts((err, data) => {
    console.log("error", err);
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(201).send({
        status: "success",
        data: {
          data,
        },
      });
    }
  });
};
