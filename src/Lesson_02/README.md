
    Типы ключей, связи между таблицами
    Проектирование БД при помощи https://drawsql.app/
    JOIN-операции

Как связать таблицы в PostgreSQL и получить нужные данные?

Связывание таблиц в PostgreSQL осуществляется с помощью оператора JOIN. Оператор JOIN позволяет объединять строки из двух или более таблиц в зависимости от заданных условий.
Внешний ключ

Для связывания таблиц в PostgreSQL используются внешние ключи. Внешний ключ в таблице связывает ее с другой таблицей, указывая идентификатор связанной записи.
Способы связывания таблиц
Один-к-одному (One-to-One)

Каждая запись в одной таблице связана с одной записью в другой таблице.
Один-ко-многим (One-to-Many)

Каждая запись в одной таблице связана с несколькими записями в другой таблице.
Многие-ко-многим (Many-to-Many)

Каждая запись в одной таблице может быть связана с несколькими записями в другой таблице, и наоборот.
Примеры связи
Один-к-одному (One-to-One)

CREATE TABLE employees (
id integer PRIMARY KEY,
name varchar(100)
);

CREATE TABLE contact_info (
employee_id integer REFERENCES employees(id) UNIQUE,
email text,
phone_number varchar(9)
);

Один-ко-многим (One-to-Many)

CREATE TABLE orders (
order_number integer,
customer_id integer REFERENCES customers(id),
);

CREATE TABLE customers (
id integer PRIMARY KEY,
name text
);

Многие-ко-многим (Many-to-Many)

CREATE TABLE songs (
id integer PRIMARY KEY,
name varchar(100)
);

CREATE TABLE artists (
id integer PRIMARY KEY,
name varchar(100)
);

CREATE TABLE songs_artists (
artist_id integer REFERENCES artists(id),
song_id integer REFERENCES songs(id),
PRIMARY KEY (artist_id, song_id)
);

Пример JOIN

SELECT
*
FROM
product
JOIN category ON category.id = product.category_id;

Преимущества связывания таблиц:

    Исключение повторений данных: связывание позволяет избежать дублирования информации в разных таблицах. Например, если в базе данных есть таблица «Пользователи» и таблица «Заказы», то связывание позволит связать каждый заказ с соответствующим пользователем, не дублируя информацию о пользователе в каждой записи заказа.
    Улучшение эффективности запросов: при связывании таблиц можно выполнять запросы, отбирая данные из нескольких таблиц одним запросом. Это уменьшает количество запросов к базе данных и повышает производительность системы.
    Обеспечение целостности данных: связывание таблиц позволяет определить связи между разными сущностями в базе данных и задать ограничения на значения ключевых полей. Например, при связывании таблиц «Пользователи» и «Заказы» можно задать ограничение, что каждый заказ должен быть связан с существующим пользователем.
    Связывание таблиц является одним из важнейших инструментов реляционных баз данных, таких как PostgreSQL. Оно помогает организовать структуру данных, улучшить производительность системы и обеспечить целостность информации.

Задание 1 (в https://drawsql.app/)

Создайте схему для некторой предметной области на ваш выбор (например: ресторан, детский сад, ферма), где у вас будет несколько таблиц. Пусть на ней будут отражены отношения: 1:1, 1:many, many:many. Минимальное количество таблиц - 5.

Прислать ДЗ в виде скриншота или ссылки на вашу схему.
Задание 2 (в beekeeper)

Создайте таблицы со своей схемы с помошью SQL, отразите отношения между ними, задав внешние и первичные ключи.

Прислать ДЗ в виде SQL запросов.
Задание 3 (со звёздочкой)

Заполнить таблицы данными и напишите три JOIN-запроса для каждой из связей.
./code/queries.sql

-- ссылка на БД в google drive: https://docs.google.com/spreadsheets/d/1_F82nkr52Ed5iCwnURmVgvdHrkBftWMc5LmuDNuCO5o/edit#gid=0
-- ссылка на схему БД: https://drawsql.app/teams/team-3027/diagrams/contacts-book
-- создаём БД и таблицы
CREATE DATABASE contacts_book OWNER postgres;

CREATE TABLE person (id serial PRIMARY KEY, name text);

CREATE TABLE contact (
id serial PRIMARY KEY,
-- REFERENCES - означает связь между таблицами
-- REFERENCES person (id) - колонка связана с id из таблицы person
person_id integer REFERENCES person (id),
type text,
value text
);

-- Заполняем таблицы данными
INSERT INTO
person (name)
VALUES
('Иванов Иван'),
('Иванов Иван'),
('Петров Пётр'),
('Сидоров Арсений');

INSERT INTO
contact (person_id, type, value)
VALUES
(1, 'phone', '+49111111111'),
(1, 'phone', '88005555555'),
(2, 'email', 'ivan@mail.com'),
(3, 'link', 'vk.com/petr-1'),
(3, 'email', 'petr@mail.com'),
(4, 'email', 'arseniy@gmail.com'),
(4, 'phone', '+79234440909');

-- JOIN - запрос позволяет выбрать данные из нескольких таблиц
SELECT
*
FROM
person
JOIN contact -- соединяем таблицу person и contact
ON person.id = contact.person_id;

-- соединяем по этому условию
-- выбираем имя и телефон (только телефоны)
SELECT
person.name,
contact.value
FROM
person
JOIN contact ON person.id = contact.person_id
WHERE
contact.type = 'phone';

-- А теперь добавим таблицу группы и заполним данными
CREATE TABLE group (id serial PRIMARY KEY, name text);

INSERT INTO
group (name)
VALUES
('friends'),
('work');

-- группы связаны с людьми связью многое ко многим
-- создаём промежуточную таблицу
CREATE TABLE person_group (
person_id integer REFERENCES person (id),
group_id integer REFERENCES group (id),
-- в промежуточной таблице составной первичный ключ:
PRIMARY KEY (person_id, group_id)
);

-- Добавляем людей в группы по ID
INSERT INTO
person_group (person_id, group_id)
VALUES
-- Иван - друг
(1, 1),
-- другой Иван тоже друг
(2, 1),
-- Пётр и друг
(3, 1),
-- и коллега
(3, 2),
-- Арсений - коллега
(4, 2);

-- покажем все группы, в которые входит Арсений
-- тут нам придётся соединить 3 таблицы (person -> person_group -> group)
SELECT
group.name
FROM
person
JOIN person_group ON person.id = person_group.person_id
JOIN group ON person_group.group_id = group.id
WHERE
person.name = 'Сидоров Арсений';

