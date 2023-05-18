/*
Авто:
 id
 model
 Owner
 Year
 Color
 Weight
 Engine:
  Power
  Nuber
  Guarantee

50 штук
*/

let models = ["toyota camry", "lada granta", "wolkswagen polo", "bmw x7"]
let colors = ["red", "green", "black", "yellow", "blue"]
let years = [2019, 2020, 2021, 2022]
let owners = ["yandex", "deli"]
let power_boards = [60, 250]
let dist = [20000, 200000]


let data_base = [];

for (i = 0; i < 20; i++) {
    object = {
        id:i,
        model: get_random_element(models),
        owner: get_random_element(owners),
        year: get_random_element(years),
        colors: get_random_element(colors),
        weight: (Math.round((Math.random() * 3 + 1.5)*10)/10),
        engine: {
            power:Math.round(Math.random() * (power_boards[1] - power_boards[0]) + power_boards[0]),
            number:crypto.randomUUID().toString(),
            guarantee: randomDate(new Date(), new Date(2026, 0, 1))
        }
    }
    data_base.push(object);
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function get_random_element(elements) {
    return elements[Math.round(Math.random() * (elements.length-1))]
}

//---------------------------------------------
/*
1. Вернуь всех владельцев автомобилей
2. Вернуть список цветов автомобилей, представленных в салоне. (Без повторов)
3. Вернуть список всех моделей машин, которые есть в наличии младше 3ти лет
4. Вернуть список моделей машин, двигатели которых мощнее 150 л.с.
5. Вернуть спискок машин, которые никому не принадлежат с пробегом меньше 100000
6. Вернуть суммарный вес всех автомобилей, произведенных между 2020 и 2022
7. Вернуть средний возраст всех всех автомобилей Яндекса
8. Вернуть номер двигателя машины, гарантийный срок которой кончается самым последним
9. Вернуть средний пробег всех автомобилей 2019 года 
10. Вернуть границы между которыми закончатся все гарантийные периоды автомобилей делимобиля
11. Вернуть модели всех автомобилей красного цвета, пробег которых меньше среднего.
12. Вернуть номер двигателя автомобиля с самым длинным пробегом и мощностью меньше 150 ЛС
13. Вернуть самый большой срок гарантии среди всех красных автомобилей Яндекса
*/

