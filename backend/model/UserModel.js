const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: {
        categories: { type: [String], default: [] },
        priceRange: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
    },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    // Empty by default when signing up
    wishlist: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    ],
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, min: 1, default: 1 }
        }
    ]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User };
