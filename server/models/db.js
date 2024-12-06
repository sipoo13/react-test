const pgp = require('pg-promise')();

const cn = 'postgres://postgres:123@localhost:5432/order_db';

const db = pgp(cn);

module.exports = db;