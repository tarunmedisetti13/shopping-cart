const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { AllProducts, createProduct
    , productsByCategory,
    productsByName,
    ProductById
} = require('../controllers/productController');
const { route } = require('./UserRouter');

router.get('/all-products', AllProducts);
router.post('/create-product', upload.array('images', 5), createProduct);
router.get('/id/:id', ProductById);
router.get('/name/name', productsByName);
router.get('/category/:category', productsByCategory);


module.exports = router;