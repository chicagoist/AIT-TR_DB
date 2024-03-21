use("cars");

// db.cars.insertMany([
//     { _id: 1, brand: "BMW", price: 20000, model: "X5", year: 2015, horsepower: 300 },
//     { _id: 2, brand: "Audi", price: 25000, model: "A4", year: 2015, horsepower: 220 },
//     { _id: 3, brand: "Mercedes", price: 30000, model: "E-Class", year: 2015, horsepower: 250 },
//     { _id: 4, brand: "BMW", price: 18000, model: "3 Series", year: 2017, horsepower: 200 },
//     { _id: 5, brand: "Audi", price: 22000, model: "Q5", year: 2017, horsepower: 240 },
//     { _id: 6, brand: "Toyota", price: 15000, model: "Corolla", year: 2018, horsepower: 150 },
//     { _id: 7, brand: "Lexus", price: 28000, model: "RX", year: 2018, horsepower: 270 },
//     { _id: 8, brand: "Mercedes", price: 32000, model: "S-Class", year: 2018, horsepower: 350 },
//     { _id: 9, brand: "Honda", price: 17000, model: "Civic", year: 2019, horsepower: 160 },
//     { _id: 10, brand: "Toyota", price: 20000, model: "Rav4", year: 2019, horsepower: 180 }
//   ]);
  
  // Средняя цена по брендам
  db.cars.aggregate([
    { $group: { _id: "$brand", avgPrice: { $avg: "$price" } } }
  ]);
  
//   // Средняя цена по годам
  db.cars.aggregate([
    { $group: { _id: "$year", avgPrice: { $avg: "$price" } } }
  ]);
  
//   // Максимальная мощность по брендам
  db.cars.aggregate([
    { $group: { _id: "$brand", maxHorsepower: { $max: "$horsepower" } } }
  ]);
  
  // Три самые дешевые машины
  db.cars.find().sort({ price: 1 }).limit(3);
  
//   // Три самые дорогие машины определенного бренда (например, BMW)
  db.cars.find({ brand: "BMW" }).sort({ price: -1 }).limit(3);
  
//   // Случайный автомобиль марки BMW
  db.cars.aggregate([
    { $match: { brand: "BMW" } },
    { $sample: { size: 1 } }
  ]);
  
  //  задания (на оператор lookup)
  
  // Добавление коллекции owners
//   db.owners.insertMany([
//     { car_id: 1, owner: "Ivanov Ivan", phone: "1234567" },
//     { car_id: 2, owner: "Petrov Petr", phone: "2345678" },
//     { car_id: 3, owner: "Sidorov Sidor", phone: "3456789" },
//     { car_id: 4, owner: "Ivanov Ivan", phone: "1234567" },
//     { car_id: 5, owner: "Petrov Petr", phone: "2345678" },
//     { car_id: 6, owner: "Sidorov Sidor", phone: "3456789" },
//     { car_id: 7, owner: "Ivanov Ivan", phone: "1234567" },
//     { car_id: 8, owner: "Petrov Petr", phone: "2345678" },
//     { car_id: 9, owner: "Sidorov Sidor", phone: "3456789" },
//     { car_id: 10, owner: "Ivanov Ivan", phone: "1234567" }
//   ]);
  
  
  db.owners.aggregate([
    {
      $lookup: {
        from: "cars",
        localField: "car_id",
        foreignField: "_id",
        as: "cars"
      }
  }
  ]);










  
//   // Те, кто владеет автомобилями дороже 20000
//   db.owners.aggregate([
//     {
//       $lookup: {
//         from: "cars",
//         localField: "car_id",
//         foreignField: "_id",
//         as: "cars"
//       }
//     },
//     { $unwind: "$cars" },
//     { $match: { "cars.price": { $gt: 20000 } } },
//     { $group: { _id: "$_id", owner: { $first: "$owner" }, cars: { $push: "$cars" } } }
//   ]);
  
  // Средняя цена машин у каждого владельца, если цена больше 20000


















//  db.owners.aggregate([
//   {
//     $lookup: {
//       from: "cars",
//       localField: "car_id",
//       foreignField: "_id",
//       as: "cars"
//     }
//   },
//   {
//     $match: { "cars.price": { $gt: 20000 } }
//   },
//   {
//     $project: {
//       owner: 1,
//       cars: {
//         $filter: {
//           input: "$cars",
//           as: "car",
//           cond: { $gt: ["$$car.price", 20000] }
//         }
//       }
//     }
//   },
//   {
//     $match: { "cars": { $ne: [] } }
//   },
//   {
//     $group: {
//       _id: "$owner",
//       avgPrice: { $avg: { $arrayElemAt: ["$cars.price", 0] } }
//     }
//   }
// ]);

  
  //db.cars.find();
  //db.owners.find();