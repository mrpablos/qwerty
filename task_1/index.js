import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

// console.log(decoded)

function decoded(encoded, translations) {
  // Создаем 2 переменные в которые записываются результаты декодирования, значения ключей которые остаются без изменения
  let list = encoded;
  let blackList = ["groupId", "service", "formatSize", "ca"];
  // Создаем переменную в которую будут записывать множество уникальных ключей, которые не поддаются дешифровке
  let uniqueId = new Set();
  // Достаем из массива объектов каждый элемент
  list.forEach((element) => {
    // из каждого элемента достаем ключи
    Object.keys(element).forEach((key) => {
      // каждый ключ приводим к нижнему регистру, проверяем строку на наличие подстроки "id" И на отсутствие ключа
      // из массива blackList
      if (key.toLowerCase().indexOf("id") > -1 && !blackList.includes(key)) {
        // если  ключ при декодировании имеет значение undefined
        if (translations[element[key]] == undefined) {
          // записываем его в коллекцию уникальных значений
          uniqueId.add(key);
        } else {
          // дальше декодируем значения
          element[key] = translations[element[key]];
        }
      }
    });
  });
  // выводим в консоль
  console.log(list);
  console.log(uniqueId);
}
// вызываем функцию
decoded(encoded, translations);
