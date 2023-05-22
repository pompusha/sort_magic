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

let models = ["toyota camry", "lada granta", "wolkswagen polo", "bmw x7"];
let colors = ["red", "green", "black", "yellow", "blue"];
let years = [2019, 2020, 2021, 2022];
let owners = ["yandex", "deli"];
let power_boards = [60, 250];
let dist = [20000, 200000];

let data_base = [];

for (i = 0; i < 20; i++) {
  object = {
    id: i,
    model: get_random_element(models),
    owner: get_random_element(owners),
    year: get_random_element(years),
    distance: Math.round(Math.random() * 180000 + 20000),
    colors: get_random_element(colors),
    weight: Math.round((Math.random() * 3 + 1.5) * 10) / 10,
    engine: {
      power: Math.round(
        Math.random() * (power_boards[1] - power_boards[0]) + power_boards[0]
      ),
      number: crypto.randomUUID().toString(),
      guarantee: randomDate(new Date(), new Date(2026, 0, 1)),
    },
  };
  data_base.push(object);
}
for (i = 0; i < 10; i++) {
  object = {
    id: i,
    model: get_random_element(models),
    year: get_random_element(years),
    distance: Math.round(Math.random() * 180000 + 20000),
    colors: get_random_element(colors),
    weight: Math.round((Math.random() * 3 + 1.5) * 10) / 10,
    engine: {
      power: Math.round(
        Math.random() * (power_boards[1] - power_boards[0]) + power_boards[0]
      ),
      number: crypto.randomUUID().toString(),
      guarantee: randomDate(new Date(), new Date(2026, 0, 1)),
    },
  };
  data_base.push(object);
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function get_random_element(elements) {
  return elements[Math.round(Math.random() * (elements.length - 1))];
}
console.log(data_base);
//---------------------------------------------
/*
1. Вернуь всех владельцев автомобилей-DONE
2. Вернуть список цветов автомобилей, представленных в салоне. (Без повторов)-DONE
3. Вернуть список всех моделей машин, которые есть в наличии младше 3ти лет -DONE
4. Вернуть список моделей машин, двигатели которых мощнее 150 л.с.-DONE
5. Вернуть спискок машин, которые никому не принадлежат с пробегом меньше 100000--DONE
6. Вернуть суммарный вес всех автомобилей, произведенных между 2020 и 2022-DONE
7. Вернуть средний возраст всех всех автомобилей Яндекса-DONE
8. Вернуть номер двигателя машины, гарантийный срок которой кончается самым последним--DONE
9. Вернуть средний пробег всех автомобилей 2019 года -DONE

10. Вернуть границы между которыми закончатся все гарантийные периоды автомобилей делимобиля - ??????

11. Вернуть модели всех автомобилей красного цвета, пробег которых меньше среднего.--DONE вопрос есть

12. Вернуть номер двигателя автомобиля с самым длинным пробегом и мощностью меньше 150 ЛС- DONE
13. Вернуть самый большой срок гарантии среди всех красных автомобилей Яндекса
*/

const unique_owners = [...new Set(data_base.map((el) => `owner: ${el.owner}`))];
console.log("result 1++");
console.log(unique_owners);


const unique_color = [...new Set(data_base.map((el) => `color: ${el.colors}`))];
console.log("result 2++");
console.log(unique_color);

const unique_cars_by_years_old = data_base.filter((el) => el.year > 2020);
console.log("result 3+");
console.log(unique_cars_by_years_old);

const unique_models_performance = [...new Set(data_base.filter(
  (el) => el.engine.power > 150
).map(e => e.model))];
console.log("result 4-");
console.log(unique_models_performance);

const unique_noOwner_year = data_base.filter((el) => !el.owner && el.distance < 100000);
console.log("result 5+");
console.log(unique_noOwner_year);

const summ_weight_cars = data_base.reduce((summ, el) => {
  if (2022 >= el.year >= 2020) 
    summ += el.weight;
  return summ;

  //  return 2022 >= el.year >= 2020 ? summ : summ + el.weight;
}, 0);
console.log("result 6++");
console.log(summ_weight_cars);

const unique_average_age = data_base.reduce((sum, el) => {
  //   count = 0;

  if (el.owner === "yandex") {
    // count++; не понимаю почему так не сработало
    return sum + el.year;
  }

  return sum / data_base.filter((el) => el.owner === "yandex").length;
}, 0);
console.log("result 7+");
console.log(unique_average_age);

const sorted = data_base.sort((a, b) => b.engine.guarantee.getTime() - a.engine.guarantee.getTime())
                      .map(e => e.engine.number)[0];

const last_insurance_police = data_base
  .filter((elem) => {
    if (
      elem.engine.guarantee.getTime() ===
      Math.max(
        ...data_base.map((el) => el.engine.guarantee.getTime())
      )
    )
      return `the car is number ${elem.engine.number}`;
  })
  .map((el) => {
    return `the car is number ${el.engine.number}`;
  });

console.log("result 8");
console.log(sorted);
console.log(last_insurance_police);

const unique_average_distance = data_base.reduce((sum, el) => {
  //   count = 0;

  if (el.year === 2019) {
    // count++; не понимаю почему так не сработало
    return sum + el.distance;
  }

  return sum / data_base.filter((el) => el.year === 2019).length;
}, 0);
console.log(unique_average_age);

const all_model_red_color = data_base
  .filter((el) => el.colors === "red")
  .filter((el) => {
    if (
      el.distance <
      data_base.reduce((sum, elem) => {
        return sum + elem.distance;
        // акумулируем общее колво дистанции и делим на data_base.lenght но после деления воообще не остается ничего
      }, 0)
    ) {
      return `${el.model}`;
    }
  })
  .map((el) => {
    return `Модель ${el.model}`;
  });

console.log(all_model_red_color);

// 12. Вернуть номер двигателя автомобиля с самым длинным пробегом и мощностью меньше 150 ЛС

console.log("______________________");
const a = data_base
  .filter((el) => el.engine.power < 150)
  .reduce((prev, current) => {
    return prev.distance > current.distance ? prev : current;
  });
number_engine = [];
number_engine.push(a);

console.log(
  number_engine.map((el) => {
    return `${el.engine.number}`;
  })
);

// 13. Вернуть самый большой срок гарантии среди всех красных автомобилей Яндекса
result = data_base
  .filter((el) => {
    if (el.colors === "red") {
      return [el];
    }
  })
  .filter((el) => {
    if (el.owner === "yandex") {
      return [el];
    }
  });
// почему возвращает обьект

// .map((el) => {
//   return `garant ${el.engine.guarantee}`;
// })
// .reduce((prev, current) => {
//   return prev.engine.guarantee > current.engine.guarantee ? prev : current;
// });
console.log("______________________");
console.log(result);
console.log("______________________");
test = data_base
  .filter((el) => el.owner === "yandex")
  .filter((el) => el.colors === "red");
console.log(test);
console.log("______________________");
const main_container = document.getElementById("cart_container");
for (i = 0; i < data_base.length; i++) {
  test_cart = document.createElement("div");
  test_cart.style.weight = "70px";
  test_cart.style.height = "70px";
  test_cart.style.background = "grey";
  test_cart.innerHTML = data_base[i]["id"];
  test_cart.append(data_base[i]["model"]);
  test_cart.setAttribute("id", i);
  test_cart.classList.add("cart");
  main_container.appendChild(test_cart);

  function someFunc(index) {
    test_cart.addEventListener("click", function () {
      create_open_cart(index);
    });
  }
  someFunc(i);
}

const opened_carts = document.getElementById("cart_full_description");

// for (i = 0; i < data_base.length; i++) {
//   test_cart = document.createElement("div");
//   test_cart.style.weight = "70px";
//   test_cart.style.height = "70px";
//   test_cart.style.background = "grey";
//   test_cart.innerHTML = data_base[i]["id"];
//   test_cart.append(data_base[i]["model"]);

//   test_cart.classList.add("opened_cart");
//   opened_carts.appendChild(test_cart);
// }
const open_card = document.getElementById("opened_cart");
function create_open_cart(cart_id) {
  opening_card();

  // console.log(cart_id);
  wraper_opened_card = document.createElement("div");
  header = document.createElement("h1");
  header.innerHTML = data_base[cart_id]["id"];
  open_card.appendChild(header);
  console.log(data_base[cart_id]);
  for (i in data_base[cart_id]) {
    if (status_open === true) {
      if (i === "engine") {
        for (j in data_base[cart_id][i]) {
          console.log(data_base[cart_id][i][j]);
          card = createCard(data_base[cart_id][i][j])  
          open_card.appendChild(card);
        }
      } else {
        card = createCard(data_base[cart_id][i])
        open_card.appendChild(card);
      }

      // console.log(i);
    } else {
      console.log(`Tak cho za hren proishodit ${status_open}`);
      while (open_card.firstChild) {
        open_card.removeChild(open_card.lastChild);
      }
    }
  }
  // header.innerHTML = data_base[cart_id]["id"];
}


//рекурсивный обход объекта - разобраться!!!
function iterate(obj, stack) {
  for (var property in obj) {
      if (obj.hasOwnProperty(property)) { //возможно этот if на хуй не нужен
          if (typeof obj[property] == "object") {
              iterate(obj[property], stack + '.' + property);
          } else {
              console.log(property + "   " + obj[property]);
              $('#output').append($("<div/>").text(stack + '.' + property))
          }
      }
  }
}

iterate(object, '');


function createCard(el) {
  info_div = document.createElement("div");
  info_div.innerHTML = el;
  return info_div;
}
// for (i in data_base[0]) {
//   console.log(data_base[0][i]);
// }

status_open = true;

const wraper_carts = document.getElementById("cart_full_description");
function opening_card() {
  if (status_open === false) {
    status_open = true;
    wraper_carts.style.display = "";
  } else {
    status_open = false;
    wraper_carts.style.display = "none";
  }
}

// Object.keys(data_base[1])
// for (i in data_base[0]) {
//   console.log(i);
//   //   if (Object.keys(data_base[0][i]).length > 1) {
//   //     for (j in data_base[0][i]) {
//   //       console.log(data_base[0][i][j]);
//   //     }
//   //   }
// }

// console.log(Object.keys(data_base[0]["engine"]));
