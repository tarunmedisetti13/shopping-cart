const { CreateProduct, getAllProducts,
    getProductsByCategory, getProductsByName,
    getProductsById } = require('../dboperations/Productdboperations');
const { get } = require('../router/UserRouter');


const createProduct = async (req, res) => {
    try {

        const product = await CreateProduct(req.body, req.files);
        res.status(200).json({
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        })
    }
}
const AllProducts = async (req, res) => {
    try {
        const result = await getAllProducts();
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({
            message: error
        }
        );
    }
}

const productsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        console.log(category);
        const result = await getProductsByCategory(category);
        if (result.length == 0) {
            return res.status(404).json({ message: "No products found for this category" });
        }
        return res.status(200).json({ data: result });

    } catch (error) {
        res.status(500).status({
            message: error
        });
    }
}
const productsByName = async (req, res) => {
    try {
        const name = req.params.name;
        const result = await getProductsByName(name);
        if (result == 0) {
            return res.status(404).json({
                message: "No item found for this item"
            });
        }
        res.status(200).json({
            data: result
        });

    } catch (error) {
        res.status(500).status({
            message: error
        });
    }
}
const ProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await getProductsById(id);
        res.status(200).json({
            data: result
        })

    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

module.exports = {
    createProduct, AllProducts
    , productsByName,
    productsByCategory,
    ProductById
};

