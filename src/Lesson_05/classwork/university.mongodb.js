use("university");

// // Вставка факультетов
// db.faculties.insertMany([
//   { _id: "f1", name: "Информатика и вычислительная техника" },
//   { _id: "f2", name: "Прикладная математика и физика" },
//   { _id: "f3", name: "Биоинженерия и биоинформатика" },
//   { _id: "f4", name: "Экономика и управление" },
// ]);

// // Вставка студентов с вложенным документом диплома
// db.students.insertMany([
//   {
//     _id: "s1",
//     faculty_id: "f1",
//     name: "Алексей Иванов",
//     age: 20,
//     discharged: false,
//     diploma: { title: "Разработка веб-приложения на React" },
//   },
//   {
//     _id: "s2",
//     faculty_id: "f1",
//     name: "Мария Петрова",
//     age: 30,
//     discharged: false,
//     diploma: { title: "Применение машинного обучения в финансах" },
//   },
//   {
//     _id: "s3",
//     faculty_id: "f2",
//     name: "Иван Сергеев",
//     age: null,
//     discharged: false,
//     diploma: { title: "Анализ больших данных в биоинформатике" },
//   },
//   {
//     _id: "s4",
//     faculty_id: "f3",
//     name: "Елена Васильева",
//     age: 50,
//     discharged: false,
//     diploma: { title: "Исследование квантовых вычислений" },
//   },
//   {
//     _id: "s5",
//     faculty_id: "f4",
//     name: "Дмитрий Николаев",
//     age: null,
//     discharged: false,
//     diploma: { title: "Разработка игры на Unity" },
//   },
//   {
//     _id: "s6",
//     faculty_id: "f1",
//     name: "Никита Жуков",
//     age: 22,
//     discharged: false,
//   },
//   {
//     _id: "s7",
//     faculty_id: "f2",
//     name: "Ольга Кузнецова",
//     age: null,
//     discharged: false,
//   },
//   {
//     _id: "s8",
//     faculty_id: "f3",
//     name: "Павел Новиков",
//     age: 25,
//     discharged: false,
//   },
//   {
//     _id: "s9",
//     faculty_id: "f4",
//     name: "Анна Зайцева",
//     age: null,
//     discharged: false,
//   },
//   {
//     _id: "s10",
//     faculty_id: "f1",
//     name: "Сергей Морозов",
//     age: 24,
//     discharged: false,
//   },
// ]);

// // Вставка преподавателей
// db.teachers.insertMany([
//   { _id: "t1", name: "Андрей Андреев", students: ["s1", "s2", "s3"] },
//   { _id: "t2", name: "Виктория Семенова", students: ["s4", "s5"] },
//   { _id: "t3", name: "Георгий Павлов", students: ["s6", "s7"] },
//   { _id: "t4", name: "Светлана Алексеева", students: ["s8", "s9", "s10"] },
// ]);
