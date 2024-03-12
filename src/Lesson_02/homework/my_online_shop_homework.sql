 -- CREATE DATABASE online_shop OWNER postgres;
-- DROP DATABASE online_shop;
CREATE TABLE
  clients (
    client_id SERIAL PRIMARY KEY NOT NULL,
    username TEXT,
    email TEXT,
    password VARCHAR(20)
  );

CREATE TABLE
  products (
    product_id SERIAL PRIMARY KEY NOT NULL,
    product_name TEXT,
    description TEXT,
    price DOUBLE PRECISION,
    stock_quantity BIGINT
  );

CREATE TABLE
  orders (
    order_id SERIAL PRIMARY KEY NOT NULL,
    client_id SERIAL REFERENCES clients (client_id),
    order_date DATE,
    total_amount BIGINT
  );

CREATE TABLE
  order_details (
    order_detail_id SERIAL PRIMARY KEY NOT NULL,
    order_id SERIAL REFERENCES orders (order_id),
    product_id SERIAL REFERENCES products (product_id),
    quantity BIGINT,
    unit_price DOUBLE PRECISION
  );

CREATE TABLE
  shipping_addresse (
    address_id SERIAL NOT NULL,
    client_id SERIAL REFERENCES clients (client_id),
    street TEXT,
    city TEXT,
    state TEXT,
    zip_code BIGINT
  );

