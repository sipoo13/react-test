const db = require('./db');

const getAllProducts = async () => {
    return await db.any('select * from products');
};

const getAllProductsLimit = async (limit, offset) => {
    return await db.any('select * from products limit $1 offset $2', [limit, offset]);
};

const getProduct = async (id) => {
    return await db.oneOrNone(`select * from products where id_product = $1`, id)
}

const createProduct = async (productData) => {
    return await db.none(`
        insert into products (product_name, price, created_at, quantity)
        values($1, $2, $3, $4)`, 
        [productData.product_name, productData.price, productData.created_at, productData.quantity]);
};

const updateProduct = async (id, productData) => {
    return await db.none(`
        update products
        set product_name = $1,
        price = $2,
        quantity = $3 
        where id_product = $4`, 
        [productData.product_name, productData.price, productData.quantity, id]);
};

const deleteProduct = async (id) => {
    return await db.none(`delete from products where id_product = $1`, id)
}

module.exports = {
    getAllProducts,
    getAllProductsLimit,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}