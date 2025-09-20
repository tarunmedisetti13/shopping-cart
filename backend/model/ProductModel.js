const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, enum: ['Clothing', 'Electronics', 'Shooes & Footwear', 'Home & Furniture', 'TVs & Appliances', 'Books & Stationary', 'Beauty & Personal Care', 'Sports & Outdoor', 'Toys & Games', 'Others'], default: 'Others' },
    images: [
        {
            url: { type: String, required: true },
            public_id: { type: String, required: true }
        }
    ]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
