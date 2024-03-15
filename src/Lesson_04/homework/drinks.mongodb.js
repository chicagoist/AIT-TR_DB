use("drinks_db");

//db.drinks.drop();

db.drinks.insertMany([
    { _id: 1, title: 'Rum', country: 'Jamaica', vol: 70 },
    { _id: 2, title: 'Sangria', country: 'Spain', vol: 12 },
    { _id: 3, title: 'Vodka', country: 'Russia', vol: 40 },
    { _id: 4, title: 'Grappa', country: 'Greece', vol: 35 },
    { _id: 5, title: 'Cognac ', country: 'France', vol: 40 }
]);


// //Добавляем дополнительное поле цены
db.drinks.updateMany(
    { },
    { $set: { price: 0 } }
 );

// //Обновляем одно единственное цены
//  db.drinks.updateOne(
//     { _id: 1}, 
//     { $set: { price: '10$' } } 
// );


// //Обновляем в цикле все значения цен 
const prices = [50,10,5,40,20];

for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    db.drinks.updateOne(
        { _id: i + 1 }, 
        { $set: { price: price } }
    );
}

// //Самый дорогой
// db.drinks.aggregate([
//     { $group: { _id: null, maxPrice: { $max: "$price" } } }
// ]);

// // Самый дорогой и его название
// db.drinks.find({}, {_id: 0, title: 1, price: 1}).sort({price: -1}).limit(1)



// //Три самых дешёвых
// db.drinks.find({}, {_id: 0, title: 1, price: 1}).sort({ price: 1 }).limit(3);

// // Самый крепкий напиток и его название
//db.drinks.find({}, {_id: 0, title: 1, vol: 1}).sort({vol: -1}).limit(1);


// // Добавляем теги
db.drinks.updateMany({}, { $set: { tags: [] } })

// //Вносим несколько тегов
db.drinks.updateOne({ title: "Rum" }, { $push: { tags: "strong" } });
db.drinks.updateOne({ title: "Sangria" }, { $push: { tags: "wine" } });

// //Выводим тег "вино"
//db.drinks.find({tags: "wine"});


db.drinks.find();