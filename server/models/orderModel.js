const db = require('./db');

const getAllOrders = async () => {
    return await db.any(`
        select
            o.id_order,
            o.product_id,
            p.product_name,
            o.customer_name,
            o.order_date,
            o.total_amount
        from 
            orders o
        join
            products p ON o.product_id = p.id_product
    `);
};

const getOrder = async (id) => {
    return await db.oneOrNone(`select * from orders where id_order = $1`, id)
}

const createOrder = async (orderData) => {
    return await db.one(`
        insert into orders (product_id, customer_name, order_date, total_amount)
        values($1, $2, $3, $4)
        returning id_order`,
        [orderData.product_id, orderData.customer_name, orderData.order_date, orderData.total_amount]);
};

const updateOrder = async (id, orderData) => {
    return await db.none(`
        update orders
        set product_id = $1,
        customer_name = $2,
        order_date = $3 
        where id_order = $4`, 
        [orderData.product_id, orderData.customer_name, orderData.order_date, orderData.total_amount, id]);
};

const deleteOrder = async (id) => {
    return await db.none(`delete from orders where id_order = $1`, id)
}

module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}