**Plan**

    Введение в NoSQL, типы NoSQL-баз данных,примеры
    Сценарии использования NoSQL
    Установка MongoDB compass
    Основы работы с MongoDB
    Базовые структуры данных
    MongoDB Atlas - подключение

**SQL**

_**Принципиальные отличия MongoDB от RDBMS**_

    Другой язык для выполнения запросов (NoSQL - QUERY API)
    Модель данных - ДОКУМЕНТНАЯ (документ - ассоц/массив)
    Динамическая схема данных (без схемы, schemaless) - каждый документ может иметь свой набор полей
    Использует JSON и Binary JSON (BSON)
    Позволяет хранить вложенные структуры данных

// пример

`users = [
{username: 'hacker', email: '123@example.org', is_blocked: true}, {username: 'user1', email: 'hello@example.org', phone: '+0000000000'}
]`

Базовые структуры данных

    Скаляр (скалярное значение)
    Массив (список значений)
    Ассоц/массив (пары ключ/значение)
    Множество (список уникальных элементов)

Категории запросов

    CRUD - более простые запросы
    Aggregation - получение вычисленных данных

**MongoDB: CRUD**

_**Create**_

    insertOne() добавить один документ
        один аргумент
            ассоц/массив (объект)
    insertMany() добавить несколько документов
        один аргумент
            массив ассоц/массивов

_**Read**_

    findOne() найти (выбрать) один документ
    find() найти (выбрать) несколько документов
        аргументы
            filter
            projection
    countDocuments() ко-во совпадений
        аргументы
            filter

_**Update**_

    updateOne() изменить один документ
    updateMany() изменить несколько документов
        аргументы
            filter
            action

_**Delete**_

    deleteOne() удалить один документ
    deleteMany() удалить несколько документов
        аргументы
            filter

_**БД music сервис онлайн-прослушивания музыльных треков (Отдельный пример)_**

_**Основные сущности**_

    users
    tracks
    playlists

_**Пример. Добавление юзеров**_

```js
db.users.insertMany([
    {_id: 1, fullname: 'Ivan Ivanov', country: 'Germany'},
    {_id: 2, fullname: 'Petr Ivanov', country: 'USA'},
    {_id: 3, fullname: 'Sidr Ivanov', country: 'Germany'},
    {_id: 4, fullname: 'hacker', country: 'USA'},
    {_id: 5, fullname: 'noname', country: 'France'}
])
```

_**Пример. Вывести всех юзеров**_

```js

db.users.find()

Пример.Вывести
юзеров
из
USA

db.users.find(
    {country: 'USA'} // filter
)

// с проекцией
db.users.find(
    {country: 'USA'}, // filter
    {fullname: 1, _id: 0} // projection
)

// с проекцией
db.users.find(
    {country: 'USA'}, // filter
    {country: 0} // projection
)

Задача.Вывести
имена
юзеров
из
Germany

db.users.find(
    {country: 'Germany'}, // filter
    {fullname: 1, _id: 0} // projection
)

Задача.Вывести
страну
юзера
1

db.users.findOne(
    {_id: 1},
    {country: 1, _id: 0}
)

Задача.Добавить
пять
треков(tracks)

db.tracks.insertMany([
    {_id: 1, title: 'Track 1', duration_secs: 5 * 60, author_id: 1},
    {_id: 2, title: 'Track 2', duration_secs: 4 * 60, author_id: 2},
    {_id: 3, title: 'Track 3', duration_secs: 6 * 60, author_id: 3},
    {_id: 4, title: 'Track 4', duration_secs: 7 * 60, author_id: 4},
    {_id: 5, title: 'Track 5', duration_secs: 9 * 60, author_id: 5}
])

Задача.Вывести
название
и
продолжительность
трека
4

db.tracks.findOne(
    {_id: 4}, // filter
    {title: 1, duration_secs: 1, _id: 0} // projection
)

Задача.Вывести
названия
всех
треков

db.tracks.find(
    {}, // filter
    {title: 1, _id: 0}
)

Задача.Вывести
треки
юзера
2(кроме
поля
author_id
)

db.tracks.find(
    {author_id: 2},
    {author_id: 0, _id: 0}
)
```

_**Операторы сравнения**_
`
$eq равно (equal)

$ne не равно (not equal)

$gt больше (greater than)

$gte больше или равно (greater than or equal)

$lt меньше (less than)

$lte меньше или равно (less than or equal)

$in проверка принадлежности к списку значений

$nin не принадлежит списку значений`

_**Пример. Вывести треки с продолжительностью от 5 мин_**

```js
db.tracks.find(
    {duration_secs: {$gte: 5 * 60}}
)

Задача.Вывести
треки
продолжительностью
до
одного
часа(включительно)

(проекция
:
название_трека, продолжительность_трека
)

db.tracks.find(
    {duration_secs: {$lte: 60 * 60}},
    {title: 1, duration_secs: 1, _id: 0}
)

Задача.Вывести
треки
продолжительностью
от
2
до
10
мин

db.tracks.find(
    {duration_secs: {$gte: 2 * 60, $lte: 10 * 60}}
)
```

_**Дополнительные операторы_**

```js
$exist - проверка
наличия
поля.Все
у
кого
есть
поле
age

db.users.find({age: {$exists: true}});

$and - логическое
и.Найдем
человека
с
возрастом
34
и
именем != анна
:

db.users.find({$and: [{age: 34}, {name: {$ne: "Anna"}}]});

$or - логическое
или.Найдем
людей, удовлетворябщего
хотя
бы
одному
условию:

    db.user.find({$or: [{age: 76}, {name: "Ded Igor"}]});

Добавьте
несколько
напитков
в
коллекцию
drinks(лучше
5 - 6
).
(Она
создастся - как
только
вы
добавите
туда
документы
).

Пусть
у
напитков
будут
поля
цена, крепость, и
прочие
на
ваше
усмотрение.Выведите
самый
дорогой
напиток

Выведите
топ
три
самых
дешевых
напитка

Выведите
название
самого
крепкого
напитка.Дополнительное
задание:

    создайте
напитки
с
тегами(дессертный, коктейль, горячий
и
пр.
)
получите
название
напитков, в
которых
присутсвует
искомый
тег
```

```js
code / homework.sql

--разбор
предыдущего
домашнего
задания
CREATE
TABLE
faculty(
    id
serial
PRIMARY
KEY,
    name
text
NOT
NULL
UNIQUE
)
;

--Студенты
--связь
один
ко
многим
с
факультетами: в
одном
факультете
может
учиться
много
студентов
CREATE
TABLE
student(
    id
serial
PRIMARY
KEY,
    faculty_id
int
NOT
NULL
REFERENCES
faculty(id),
    name
text
NOT
NULL,
    age
int
CHECK(
    age
BETWEEN
16
AND
90
),
discharged
bool
NOT
NULL
DEFAULT(false)
)
;

CREATE
INDEX
student_name_index
ON
student(name);

--Преподаватели
CREATE
TABLE
teacher(id
serial
PRIMARY
KEY, name
text
NOT
NULL
)
;

--Промежуточная
таблица
между
студентами
и
преподавателями
--для
связи
многие
ко
многим: один
студент
может
учиться
у
многих
преподавателей
--и
один
преподаватель
может
преподавать
многим
студентам
CREATE
TABLE
student_teacher(
    student_id
int
REFERENCES
student(id)
ON
DELETE
CASCADE,
    teacher_id
int
REFERENCES
teacher(id)
ON
DELETE
CASCADE,
    PRIMARY
KEY(student_id, teacher_id)
)
;

--Дипломы
--связь
один
к
одному
с
таблицей
студентов: у
одного
студента
может
быть
только
один
диплом
и
наоборот
CREATE
TABLE
diploma(
    student_id
int
PRIMARY
KEY
REFERENCES
student(id)
ON
DELETE
CASCADE,
    title
text
NOT
NULL
)
;

INSERT
INTO
faculty(name)
VALUES
('Информатика и вычислительная техника'),
    ('Прикладная математика и физика'),
    ('Биоинженерия и биоинформатика'),
    ('Экономика и управление');

INSERT
INTO
student(faculty_id, name, age)
VALUES
(1, 'Алексей Иванов', 20),
    (1, 'Мария Петрова', 30),
    (2, 'Иван Сергеев', 40),
    (3, 'Елена Васильева', 50),
    (4, 'Дмитрий Николаев', 60);

INSERT
INTO
teacher(name)
VALUES
('Андрей Андреев'),
    ('Виктория Семенова'),
    ('Георгий Павлов'),
    ('Светлана Алексеева');

INSERT
INTO
student_teacher(student_id, teacher_id)
VALUES
(1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 1);

INSERT
INTO
diploma(student_id, title)
VALUES
(1, 'Разработка веб-приложения на React'),
    (2, 'Применение машинного обучения в финансах'),
    (3, 'Анализ больших данных в биоинформатике'),
    (4, 'Исследование квантовых вычислений'),
    (5, 'Разработка игры на Unity');

--После
удаления
студента
сработают
правила
ON
DELETE
внешних
ключей
DELETE
FROM
student
WHERE
id = 1;

--LIKE
SELECT
*
FROM
student
WHERE
name
LIKE
'Е%';

--ILIKE
SELECT
*
FROM
student
WHERE
name
ILIKE
'е%';

--IN
SELECT
*
FROM
student
WHERE
faculty_id
IN(2, 3)--
NOT
IN
SELECT
*
FROM
student
WHERE
faculty_id
NOT
IN(2, 3)--
BETWEEN
SELECT
*
FROM
student
WHERE
age
BETWEEN
30
AND
50;

SELECT
*
FROM
student
WHERE
age
NOT
BETWEEN
30
AND
50;

SELECT
*
FROM
student
WHERE
age
IS
NULL;

--COUNT
SELECT
COUNT( *
)
as
students_count
FROM
student
WHERE
age
IS
NULL;

--MAX, MIN, AVG
SELECT
MAX(age)
FROM
student;

SELECT
MIN(age)
FROM
student;

SELECT
AVG(age)
FROM
student;

--GROUP
BY
SELECT
COUNT( *
)
as
count,
    AVG(age)
as
avg_age
FROM
student
GROUP
BY
faculty_id;

SELECT
faculty_id,
COUNT( *
)
as
count,
    AVG(age)
as
avg_age
FROM
student
GROUP
BY
faculty_id
HAVING
AVG(age)
IS
NOT
NULL;

SELECT
faculty.name,
COUNT( *
)
as
count,
    AVG(student.age)
as
avg_age
FROM
student
JOIN
faculty
ON
student.faculty_id = faculty.id
GROUP
BY
faculty.name
HAVING
AVG(student.age)
IS
NOT
NULL;
```

```js
code / readme.md
MongoDB
PostgreSQL
vs
MongoDB
PostgreSQL(реляционные
базы
данных
)
MongoDB(nosql
базы
данных
)
хранят
данные
в
виде
таблиц / столбцов / ячеек
и
связей
между
ними
хранят
данные
в
виде
коллекций
с
документами(JSON - объекты)
данные
всегда
строго
структурированы(БД
отвечает
за
структурированность
)
каждый
документ
может
быть
любой
структуры(проще
разрабатывать
)
чаще
используется
в
проектах
где
необходим
строгий
контроль
данных(банки, безопасность, валютные
биржи
)
чаще
используются
в
стартапах, в
прототипах, либо
в
проектах
где
данные
не
имеют
чёткой
структуры
либо
где
у
них
очень
сложная
структура
    .
/code/u
niversity.mongodb.js

use("university");

db.faculties.insertMany([
    {
        name: "Информатика и вычислительная техника",
        students: [
            {
                _id: "1",
                name: "Алексей Иванов",
                diploma: {
                    title: "Разработка веб-приложения на React",
                },
            },
            {
                _id: "2",
                name: "Мария Петрова",
                diploma: {
                    title: "Применение машинного обучения в финансах",
                },
            },
        ],
    },
    {
        name: "Прикладная математика и физика",
        students: [
            {
                _id: "3",
                name: "Иван Сергеев",
                diploma: {
                    title: "Анализ больших данных в биоинформатике",
                },
            },
        ],
    },
    {
        name: "Биоинженерия и биоинформатика",
        students: [
            {
                _id: "4",
                name: "Елена Васильева",
                diploma: {
                    title: "Исследование квантовых вычислений",
                },
            },
        ],
    },
    {
        name: "Экономика и управление",
        students: [
            {
                _id: "5",
                name: "Дмитрий Николаев",
                diploma: {
                    title: "Разработка игры на Unity",
                },
            },
        ],
        dean: "Андрей Ёлкин",
        documents: ["Устав", "Смета"],
    },
]);

db.teachers.insertMany([
    {
        name: "Андрей Андреев",
        students: ["1", "5"],
    },
    {
        name: "Виктория Семенова",
        students: ["2"],
    },
    {
        name: "Георгий Павлов",
        students: ["3"],
    },
    {
        name: "Светлана Алексеева",
        students: ["4"],
    },
]);
```

```js
code / users.mongodb.js

// будем работать с базой данных school_db, не надо комментировать
use("school_db");

// Добавили пользователя с именем Фред (сразу создаётся новая коллекция users)
// db.users.insertOne({ name: "Fred" });

// Пример вложенности: поле адрес - это объект
// db.users.insertOne({
//   name: "Davit",
//   age: 34,
//   adress: { city: "Berlin" },
// });

// Массивы - добавление нескольких пользователей
// db.users.insertMany([
//   { name: "Egor", age: 25 },
//   { name: "Ded Igor", age: 76 },
// ]);

// db.users.insertOne({
//   name: "John",
//   age: 20,
//   hobbys: ["music", "serfing", "video-games", "snowboard"],
// });

// получить всех пользователей
// db.users.find();

// limit - ограничивает
// вывести первые три значения
// db.users.find().limit(3);

// db.[название коллекции].методы

// Если хотим вывести упорядоченно
// sort - в алф порядке a...z
// db.users.find().sort({ name: 1 });
// в порядке от z...a
// db.users.find().sort({name: -1});

// сортировка по имени и потом по возрасту
// db.users.find().sort({name: -1, age: 1});

// как мы можем вывести и пропустить первые значения
// мы можем пропустили первых двух - вывели остальных
// db.users.find().skip(3);

// Но как найти всех пользователей по значениям?
// передадим соответвующий параметр в find
// найдем человека с возрастом 34
// db.users.insertOne({name: "Anna", age: 34});
// db.users.find({age: 34});

// найдем первого попавшегося удовлетворяющиего условию
// db.users.findOne({age: 34});

// найдём первого попавшегося удовлетворяющиего условию и выведем только его имя
// db.users.findOne({ age: 34 }, { name: 1 });

// дальше - дополнительный материал не нужный для выполнения основного ДЗ!!
// Операторы

// Больше $gt - greater then
// Получим всех старше 25
// У кого не был указан не попали в этот диапазон
// db.users.find({age: {$gt: 25}});

// Меньше $lt - less then
// db.users.find({age: {$lt: 25}});

// Меньше $lte - less or equal then - меньше или равно
// db.users.find({age: {$lte: 25}});

// Больше или равно $gte
// db.users.find({age: {$gte: 25}});

// Равно $eq
// всех у кого имя Егор
// db.users.find({ name: { $eq: "Egor" } });

// Неравно $ne
// все у кого имя не егор
// db.users.find({name: {$ne: "Egor"}});

// все, у кого возраст не равен чему-то
// у кого не задано значение - тоже подойдут
// db.users.find({age: {$ne: 34}});

// Мы можем вибирать те поля, которые нужны
// вторым параметрам передаем в метод find
// db.users.find({age: 34}, {name: 1});

// Тоже самое, но без id
// db.users.find({age: 34}, {name: 1, _id: 0});

// выведем всех пользователей с возрастом 34
// у них покажутся - все поля кроме id
// db.users.find({age: 34}, {_id: 0});

// Оператор $in - входит в
// выведем всех с именами джон или анна
// db.users.find({name: {$in: ["John", "Anna"]}});

// Оператор $nin - not in - не входит в "черный лист"
// все у кого имя не джон и не анна
// db.users.find({name: {$nin: ["John", "Anna"]}});

// Логическое и - $and
// найдем человека с возрастом 34 и именем != анна
// db.users.find({$and: [{age: 34}, {name:{$ne: "Anna"}}]});

// Чаще всего можем обойтись без and
// db.users.find({age: 34, name: {$ne: "Anna"}});

// Логическое или
// db.user.find({$or: [{age: 76}, {name: "Ded Igor"}]});

// Отрицание
// все у кого возраст не больше семидесяти
// db.users.find({age: {$not: {$gt: 70}}});

// Exist - проверка наличия поля - $exist
// все у кого есть поле age
// db.users.find({age: {$exists: true}});
//  все у кого есть поле age - только их имена
// db.users.find({age: {$exists: true}}, {name: 1, _id:0 });

// db.users.insertMany([
//   {name: "Fred", salary: 2000, costs: 1500},
//   {name: "Kristina", salary: 1300, costs: 2500}
// ]);

// Вывести всех, кто живет по средствам: salary > costs
// $expr
// db.users.find({$expr: {$gt: ["$salary", "$costs"]}});

// Вывести тех, кто не живет по средствам: salary < costs
// db.users.find({$expr: {$lt: ["$salary", "$costs"]}});

//
// db.users.insertMany([
//   {name: "John Snow", hobbys: ["swords", "bows", "wolfs", "red-head"], age: 20},
//   {name: "Han Solo", hobbys: ["space", "blasters"], age: 36}
// ]);

// выбрать людей с хотя одним из указанных хобби: "space", "snowboard"
// db.users.find({hobbys: {$in: ["space", "snowboard"]}});

// Все  кто не интересуется "space", "snowboard"
// db.users.find({ hobbys: { $nin: ["space", "snowboard"] } });
```
