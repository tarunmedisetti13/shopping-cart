const express = require('express');

const userRouter = express.Router();
const { loginUser, createUser, UserInfo, UpdatePassword,
    addProductToWishlist,
    addItemToCart,
    removeItemFromCart,
    removeItemFromWishlist,
    updateItemQuantityFromCart,
    clearCart
} = require('../controllers/UserController');
const { User } = require('../model/UserModel');

//user-routes
userRouter.post('/create-user', createUser);
userRouter.post('/login-user', loginUser);
userRouter.get('/user-info/:id', UserInfo);
userRouter.patch('/update-password/:id', UpdatePassword);

//product-routes
userRouter.post('/add-to-wishlist/:userId/:productId', addProductToWishlist);
userRouter.post('/add-to-cart', addItemToCart);
userRouter.post('/remove-from-wishlist', removeItemFromWishlist);
userRouter.post('/remove-from-cart', removeItemFromCart);
userRouter.put('/update-item-quantity', updateItemQuantityFromCart);
userRouter.delete('/clear-cart', clearCart);



module.exports = userRouter;