const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const productController = require('../controllers/product.controller');


router.route('/all')
    .get(asyncHandler(productController.getProducts));

router.route('/create')
    .post(asyncHandler(productController.createProduct));


module.exports = router;