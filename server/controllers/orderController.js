const orderModel = require('../models/orderModel');

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при получении заказов' });
    }
};

const getOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await orderModel.getOrder(id);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при получении заказа' });
    }
};

const createOrder = async (req, res) => {
    const orderData = req.body;
    try {
        const result = await orderModel.createOrder(orderData);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при добавлении заказа' });
    }
};

const updateOrder = async (req, res) => {
    const id = req.params.id;
    const orderData = req.body;
    try {
        const result = await orderModel.updateOrder(id, orderData);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при изменении заказа' });
    }
};

const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await orderModel.deleteOrder(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при удалении заказа' });
    }
};

module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}