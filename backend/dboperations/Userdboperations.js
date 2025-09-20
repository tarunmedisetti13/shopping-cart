// const connectDB = require('./dbconnect');
const Product = require('../model/ProductModel');
const { User } = require('../model/UserModel');

async function CreateUser(userDetails) {
    const user = new User(userDetails);
    return await user.save();
}
async function CheckEmail(email) {
    const user = await User.findOne({ email: email });
    if (!user) {
        return null;
    };
    return user;
}
//get password by email
async function getPasswordbyEmail(email) {
    const user = await User.findOne({ email: email }).select('password');
    if (!user) {
        return false;
    }
    return user.password;
}
async function getUserInfo(id) {
    const UserInfo = await User.findById(id);
    return UserInfo;
}
async function updatePassword(id, password) {
    const user = await User.findById(id);
    user.password = password;
    await user.save();
    return true;
}

//-------products logic---------

async function AddProductToWishlist(userId, productId) {
    const product = await Product.findById(productId);
    if (!product) {
        return { error: "Product not found" };
    }
    // Find the user by email
    const user = await User.findById(id);
    // Avoid duplicates in wishlist
    if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        await user.save();
    }
    else {
        return { error: "Product already added to your wishlist" };
    }
    return user;
}

async function RemoveItemFromWishlist(productId, email) {
    const user = await User.findOne({ email });
    if (!user) {
        return { error: "User Not Found" };
    }
    user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId.toString()
    );
    await user.save();

}
async function AddItemToCart(productId, userId) {
    const product = await Product.findById(productId);
    if (!product) {
        return { error: "Product not found" };
    }
    // Find the user by email
    const user = await User.findById(userId);
    if (!user) {
        return { error: "User not found" };
    }
    // Check if product already in cart
    const cartItem = user.cart.find(item =>
        item.product && item.product.toString() === productId.toString()
    );
    if (cartItem) {
        // Product is already in cart → do nothing
        return { message: "Product already in cart", data: user };
    }

    // Add new product with quantity = 1
    user.cart.push({
        product: productId,
        quantity: 1
    });

    await user.save();
    return { message: "Product added to cart" };

}
async function RemoveItemFromCart(productId, email) {
    const user = await User.findOne({ email });
    if (!user) {
        return { error: "User Not Found" };
    }
    const cartItem = user.cart.find(item =>
        item.product && item.product.toString() === productId.toString()
    );
    if (!cartItem) {
        return { error: "Product not found in cart" };
    }

    cartItem.quantity = quantity;
    await user.save();
    return { message: "Product quantity updated", data: user };
}

//update Cart Quantity
async function UpdateItemQuantityFromCart(id, email, quantity) {
    const user = await User.findOne({ email });
    if (!user) {
        return { error: "User Not found" };
    }
    const cartItem = user.cart.find(item =>
        item.product && item.product.toString() === id.toString());
    if (!cartItem) {
        return { error: "Product not found in cart" };
    }
    cartItem.quantity = quantity;
    const result = await user.save();
    return result;
}

async function ClearCart(email) {
    const user = await User.findOne({ email });
    if (!user) {
        return { error: "User Not Found" };
    }
    user.cart = []
    await user.save();
    return { messsage: "Cart cleared successfully" };

}

module.exports = {
    CreateUser, CheckEmail, getUserInfo, getPasswordbyEmail, updatePassword,
    AddProductToWishlist,
    AddItemToCart,
    RemoveItemFromCart,
    RemoveItemFromWishlist,
    UpdateItemQuantityFromCart,
    ClearCart
};