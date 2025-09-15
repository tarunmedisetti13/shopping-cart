const Product = require('../model/ProductModel');
const fs = require('fs');
const path = require("path");
const cloudinary = require('../config/cloudinary');
//create a new Productconst 
const CreateProduct = async (data, files) => {
    if (!files || files.length === 0) {
        throw new Error("No images uploaded");
    }

    const uploadedImages = [];

    for (const file of files) {
        const filePath = path.join(__dirname, "../uploads", file.filename);

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "ecommerce_products",
        });

        uploadedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
        });

        // Delete local file
        fs.unlinkSync(filePath);
    }

    // Save product with images
    const newProduct = new Product({
        ...data,
        images: uploadedImages,
    });

    return await newProduct.save();
};
//get list of all products  
const getAllProducts = async () => {
    const Products = await Product.find();
    return Products;

}
//get list of all products by category
const getProductsByCategory = async (category) => {
    const Products = await Product.find({ category });
    return Products;
}

//get list of products by name
const getProductsByName = async (name) => {
    const Products = await Product.find({ name });
    return Products;
}
const getProductsById = async (_id) => {
    const product = await Product.find({ _id });
    return product;
}

module.exports = {
    CreateProduct, getAllProducts,
    getProductsByCategory, getProductsByName,
    getProductsById
};

