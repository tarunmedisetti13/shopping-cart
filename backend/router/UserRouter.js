const express = require('express');

const userRouter = express.Router();
const { checkPasswordByEmail,
    createUser,
    addProductToWishlist,
    addItemToCart,
    removeItemFromCart,
    removeItemFromWishlist,
    updateItemQuantityFromCart,
    clearCart
} = require('../controllers/UserController');
//create a user
userRouter.post('/create-user', createUser);


//Check Email is in db

//compare  req password and db password using Email
userRouter.post('/verify-login', checkPasswordByEmail);
//Add product to user wishlist
userRouter.post('/add-to-wishlist', addProductToWishlist);

//Add Product to user Cart List
userRouter.post('/add-to-cart', addItemToCart);

//Add product to user wishlist
userRouter.post('/remove-from-wishlist', removeItemFromWishlist);

//Add Product to user Cart List
userRouter.post('/remove-from-cart', removeItemFromCart);

//Update Product Quantity in Cart 
userRouter.put('/update-item-quantity', updateItemQuantityFromCart);

//Clear Cart
userRouter.delete('/clear-cart', clearCart);



module.exports = userRouter;