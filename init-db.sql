CREATE DATABASE order_db;

CREATE TABLE products
(
    id_product serial not null primary key,
    product_name varchar(100) not null,
    price numeric(10,2) not null,
    created_at date not null,
    quantity integer not null
);

insert into products(product_name, price, created_at, quantity)
values('Сахар 1кг', 66.99, current_date, 130),
('Вода 1.5л', 53.99, current_date, 100),
('Соль поваренная пищевая крупная 1кг', 11.99, current_date, 78),
('Вода 0.5л', 30.99, current_date, 100),
('Йогурт', 54.99, current_date, 70),
('Молоко 1л', 45.99, current_date, 120),
('Хлеб белый', 25.99, current_date, 200),
('Яйца куриные (10 шт)', 60.99, current_date, 150),
('Куриное филе 1кг', 199.99, current_date, 80),
('Гречка 1кг', 45.99, current_date, 90),
('Рис 1кг', 55.99, current_date, 100),
('Макароны 1кг', 30.99, current_date, 150),
('Капуста белокочанная 1кг', 20.99, current_date, 100),
('Морковь 1кг', 15.99, current_date, 120),
('Картофель 1кг', 25.99, current_date, 200),
('Лук репчатый 1кг', 18.99, current_date, 150),
('Помидоры 1кг', 70.99, current_date, 80),
('Огурцы 1кг', 60.99, current_date, 90),
('Перец сладкий 1кг', 80.99, current_date, 70),
('Бананы 1кг', 55.99, current_date, 100),
('Яблоки 1кг', 45.99, current_date, 150),
('Груши 1кг', 50.99, current_date, 80),
('Апельсины 1кг', 60.99, current_date, 90),
('Киви 1кг', 100.99, current_date, 50),
('Виноград 1кг', 120.99, current_date, 60),
('Клубника 1кг', 150.99, current_date, 40),
('Малина 1кг', 200.99, current_date, 30),
('Чай черный 100г', 25.99, current_date, 200),
('Кофе молотый 250г', 150.99, current_date, 100),
('Сахар 5кг', 299.99, current_date, 50),
('Соль 5кг', 49.99, current_date, 100),
('Масло растительное 1л', 85.99, current_date, 80),
('Майонез 500г', 45.99, current_date, 90),
('Кетчуп 500г', 55.99, current_date, 70),
('Горчица 200г', 30.99, current_date, 100),
('Сметана 500г', 60.99, current_date, 80),
('Творог 500г', 70.99, current_date, 90),
('Сыр твердый 200г', 150.99, current_date, 60),
('Колбаса вареная 300г', 120.99, current_date, 50),
('Бекон 200г', 200.99, current_date, 40),
('Пельмени 1кг', 150.99, current_date, 70),
('Замороженные овощи 1кг', 80.99, current_date, 60),
('Замороженная рыба 1кг', 250.99, current_date, 30),
('Шоколад 100г', 45.99, current_date, 100),
('Конфеты 1кг', 200.99, current_date, 50),
('Чипсы 150г', 35.99, current_date, 80),
('Орехи 200г', 150.99, current_date, 40),
('Сухофрукты 200г', 120.99, current_date, 50),
('Пиво 0.5л', 70.99, current_date, 100),
('Вино 0.75л', 300.99, current_date, 60),
('Водка 0.5л', 400.99, current_date, 30),
('Крепкий алкоголь 0.5л', 500.99, current_date, 20),
('Соки 1л', 60.99, current_date, 100),
('Газировка 1.5л', 45.99, current_date, 150),
('Энергетик 0.5л', 70.99, current_date, 80),
('Кофе растворимый 100г', 150.99, current_date, 90),
('Чай зеленый 100г', 30.99, current_date, 200);

CREATE TABLE orders 
(
    id_order serial not null primary key,
    product_id integer not null,
    customer_name varchar(100) not null,
    order_date date not null,
    total_amount numeric(10,2) not null,
    foreign key (product_id) references products(id_product) on delete cascade
);

insert into orders(product_id, customer_name, order_date, total_amount)
values(1, 'Алексей', current_date, 66.99),
(1, 'Денис', current_date, 66.99),
(3, 'Мария', current_date, 11.99);