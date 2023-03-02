const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const userController = require('../controllers/user.controller');


router.route('/all')
    .get(asyncHandler(userController.getUsers));


module.exports = router;