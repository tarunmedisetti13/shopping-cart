const { getPasswordbyEmail,
    CheckEmail, CreateUser, getUserInfo, updatePassword,
    AddProductToWishlist,
    AddItemToCart,
    RemoveItemFromCart,
    RemoveItemFromWishlist,
    UpdateItemQuantityFromCart,
    ClearCart
} = require('../dboperations/Userdboperations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/UserModel');
const { off } = require('../model/ProductModel');

//For Sign Up
const createUser = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData.name || !userData.email || !userData.password) {
            return res.status(400).json(
                {
                    error: "Bad Request",
                    message: "All fields are required"
                });
        }
        const exists = await CheckEmail(userData.email);
        if (exists) {
            return res.status(409).json({
                error: "Conflict",
                message: "User already exists please try logging in",
            })
        }
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashedpassword;
        const newUser = await CreateUser(userData);
        // const { password, ...userWithoutPassword } = newUser.toObject();
        //Creating jwt on signup
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(201).json({
            message: "User Created Successfully",
            id: newUser._id,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}
//For Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(
                {
                    error: "Bad Request",
                    message: "All fields are required"
                });
        }
        const user = await CheckEmail(email);
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Invalid credentials."  // generic for security
            });
        }
        const passwordDB = await getPasswordbyEmail(email);
        if (!passwordDB) {
            return res.status(422).json({ message: "Password is invalid or null" });
        }
        const matches = await bcrypt.compare(password, passwordDB);
        if (!matches) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Invalid credentials. Password not matches"
            });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({
            message: "Login successful.",
            id: user._id,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
            message: "Failed to process login request."
        });
    }
}
//Getting User Info
const UserInfo = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json(
            {
                error: "Bad Request",
                message: " UserId required"
            });
    }
    const UserInfo = await getUserInfo(id);
    if (!UserInfo) {
        return res.status(401).json({ message: 'Not Found' });
    }
    res.status(200).json({
        success: true,
        email: UserInfo.email,
        role: UserInfo.role,
        joined: UserInfo.createdAt
    })
}
//Updating Password
const UpdatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        if (!id || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const exists = await getUserInfo(id);
        if (!exists) {
            res.status(401).json({ success: false, message: "User Id not found" });
        }
        const result = await updatePassword(id, newPassword);
        res.status(200).json({
            success: result,
            message: "Password Updated Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Error",
            message: "Check out the logic"
        });
    }
}

//---------------Products Logic-------------------

//add productId to user wishlist
const addProductToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const exists = await getUserInfo(id);
        if (!exists) {
            res.status(401).json({ success: false, message: "User Id not found" });

        }
        const result = await AddProductToWishlist(userId, productId);
        res.status(200).json({
            message: "Product Added to wishlist",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to get Product on given ProductId" });
    }
}

const removeItemFromWishlist = async (req, res) => {
    const { id, email } = req.body;
    const result = await RemoveItemFromWishlist(id, email);
    res.status(200).json({
        message: "Product Removed from Wishlist",
        data: result
    });
}
const removeItemFromCart = async (req, res) => {
    try {
        const { id, email } = req.body;
        const result = await RemoveItemFromCart(id, email);
        res.status(200).json({
            message: "Product Removed from Cart",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}
const addItemToCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        const result = await AddItemToCart(productId, userId);
        if (result.error) {
            return res.status(500).json({
                message: result.error
            })
        }
        console.log(result.error);
        res.status(200).json({
            data: result
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to get Product on given id" });
    }
}
const updateItemQuantityFromCart = async (req, res) => {
    try {
        const { id, email, quantity } = req.body; // ✅ unpack the data
        const result = await UpdateItemQuantityFromCart(id, email, quantity);
        if (result.error) {
            return res.status(404).json({
                message: result.error
            });
        }
        res.status(200).json({
            message: "Product Quantity Updated successfully from Cart",
            data: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update Quantity from Cart" });
    }

}
const clearCart = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await ClearCart(email);
        if (result.error) {
            return res.status(500).json({
                message: result.error
            });
        }
        res.status(200).json({
            message: result.messsage
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    createUser, loginUser, UserInfo, UpdatePassword,
    addProductToWishlist,
    addItemToCart,
    removeItemFromCart,
    removeItemFromWishlist,
    updateItemQuantityFromCart,
    clearCart
};
