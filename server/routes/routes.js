const orderController = require("../controllers/orderController");
const productController = require("../controllers/productController");

const router = app => {
    app.get('/', (req, res) => {
        res.send('OrderAPI');
    });

    app.get('/products', productController.getAllProducts);

    app.get('/products_limit', productController.getAllProductsLimit);

    app.get('/orders', orderController.getAllOrders);

    app.get('/products/:id', productController.getProduct);

    app.get('/orders/:id', orderController.getOrder);

    app.post('/products', productController.createProduct);

    app.post('/orders', orderController.createOrder);

    app.delete('/products/:id', productController.deleteProduct);

    app.delete('/orders/:id', orderController.deleteOrder);

    app.put('/products/:id', productController.updateProduct);

    app.put('/orders/:id', orderController.updateOrder);
}

module.exports = router;