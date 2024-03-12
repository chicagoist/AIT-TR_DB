CREATE TABLE "shipping_addresse"(
    "address_id" SERIAL NOT NULL,
    "client_id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" BIGINT NOT NULL
);
ALTER TABLE
    "shipping_addresse" ADD PRIMARY KEY("address_id");
CREATE TABLE "client"(
    "client_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(20) NOT NULL
);
ALTER TABLE
    "client" ADD PRIMARY KEY("client_id");
CREATE TABLE "order_details"(
    "order_detail_id" SERIAL PRIMARY KEY NOT NULL,
    "order_id" SERIAL REFERENCES order (order_id) NOT NULL,
    "product_id" SERIAL REFERENCES product (product_id) NOT NULL,
    "quantity" BIGINT,
    "unit_price" DOUBLE NOT NULL
);
ALTER TABLE
    "order_details" ADD PRIMARY KEY("order_detail_id");
CREATE TABLE "order"(
    "order_id" SERIAL NOT NULL,
    "client_id" SERIAL NULL DEFAULT 'REFERENCES client (client_id)',
    "order_date" DATE NOT NULL,
    "total_amount" BIGINT NOT NULL
);
ALTER TABLE
    "order" ADD PRIMARY KEY("order_id");
COMMENT
ON COLUMN
    "order"."client_id" IS 'REFERENCES client (client_id)';
CREATE TABLE "product"(
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock_quantity" BIGINT NOT NULL
);
ALTER TABLE
    "product" ADD PRIMARY KEY("product_id");
ALTER TABLE
    "shipping_addresse" ADD CONSTRAINT "shipping_addresse_client_id_foreign" FOREIGN KEY("client_id") REFERENCES "client"("client_id");
ALTER TABLE
    "order_details" ADD CONSTRAINT "order_details_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("product_id");
ALTER TABLE
    "order_details" ADD CONSTRAINT "order_details_order_id_foreign" FOREIGN KEY("order_id") REFERENCES "order"("order_id");
ALTER TABLE
    "order" ADD CONSTRAINT "order_client_id_foreign" FOREIGN KEY("client_id") REFERENCES "client"("client_id");