const productModel = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при получении продуктов' });
    }
};

const getAllProductsLimit = async (req, res) => {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    try {
        const products = await productModel.getAllProductsLimit(limit,offset);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при получении продуктов' });
    }
};

const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.getProduct(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при получении продукта' });
    }
};

const createProduct = async (req, res) => {
    const productData = req.body;
    try {
        const result = await productModel.createProduct(productData);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при добавлении продукта' });
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const productData = req.body;
    try {
        const result = await productModel.updateProduct(id,productData);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при изменении продукта' });
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await productModel.deleteProduct(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при удалении продукта' });
    }
};

module.exports = {
    getAllProducts,
    getAllProductsLimit,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}