/*

Задание 1:
порядок применения стилей
1) Стиль вписанный в элемент html
2) Стиль считанный в id
3) Стиль считанный в class
4) !
5) *

Задание 2:
Сверстать внешний прямоугольник, чтобы можно было задавать любой размер для лестницы.
Чтобы толщины и разница высот ступенек была постоянной, а внешняя граница двигалась от изменения n. 
Левый верхний угол внешнего бокса должен быть фиксирован.DONE


Задание 3:
Написать фунцию shuffle, которая будет по кнопке перемешивать cтупеньки.
Это кнопка должна быть ниже поля. DONE

Задание 4:
Добавить кнопку Grey внутрь внешнего бокса - перекрасить все столбцы в серый цвет.
Чтобы она при нажании красила все столбцы в серый цвет и меняла имя на Rainbow и повторное нажатие 
снова красило в радужный цвет все столбцы и кнопка снова становилась Grey. 

Задание 5:
Добавить панель справа от внешнего прямоугольника ladder - c полями ввода ширины столбцов и разности высот.
И кнопкой применить.

*/
//
const width_input = document.getElementById("input_width");
const button_grey = document.getElementById("button_grey");
const ladder = document.getElementById("rodia_ti_zloy");
const fiftin_spartains = document.getElementsByClassName("grey");

const colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
  "#4DB3FF",
];
let width = 4;
coef_height = 2.8;
// создание 50 дивов

// console.log(width);
function fifty_spartans(ladder, n, width_, heights_coeficient) {
  const heights = [];
  for (i = 0; i < n; i++) {
    heights[i] = 10 + i * heights_coeficient;
  }

  for (i = 1; i < n + 1; i++) {
    let box = document.createElement("div");
    column = ladder.insertAdjacentElement("beforeend", box);

    column.setAttribute("id", "col_" + i);
    column.setAttribute("class", "grey");
    column.style.backgroundColor = colorArray[(i - 1) % colorArray.length];
    column.style.height = heights[i - 1];
    console.log(width_);
    column.style.width = width_;
  }
}

// кнопка изменение цвета
function grey() {
  if (button_grey.value === "grey") {
    button_grey.value = "Rainbow";
    for (i in fiftin_spartains) {
      fiftin_spartains[i].style.backgroundColor =
        colorArray[i % colorArray.length];
    }
  } else if (button_grey.value === "Rainbow") {
    button_grey.value = "grey";

    for (i in fiftin_spartains) {
      fiftin_spartains[i].style.backgroundColor = "grey";
      fiftin_spartains[i].style.border = "black";
      fiftin_spartains[i].style.borderWidth = "0.1";
    }
  }
}

// кнопка перемешивания столбиков
const shuffle = () => {
  // console.log(fiftin_spartains);
  let arr_fiftin_spartains = [].slice.call(fiftin_spartains);
  while (ladder.hasChildNodes()) {
    ladder.removeChild(ladder.firstChild);
  }
  let shiffeled_arr_fiftin_spartains = [];
  let shiffeled2_arr_fiftin_spartains = [];
  arr_fiftin_spartains.forEach((div_element) => {
    if (Math.round(Math.random()) === 1) {
      shiffeled_arr_fiftin_spartains.push(div_element);
    } else {
      shiffeled2_arr_fiftin_spartains.push(div_element);
    }
    arr_result = [
      ...shiffeled_arr_fiftin_spartains,
      ...shiffeled2_arr_fiftin_spartains,
    ];
    arr_result.forEach((el) => ladder.appendChild(el));
  });
  // console.log(arr_fiftin_spartains);
};

// установка размеров рамки
function chanjeSize(object, width_) {
  document.getElementById(object).style.width = width_ * 50;
  console.log();
}

chanjeSize("f1", width);
fifty_spartans(ladder, 50, width, coef_height, coef_height);

// test INPUT

const widthchanger = () => {
  let a = width_input.value;
  let b = document.getElementById("input_height").value;
  while (ladder.hasChildNodes()) {
    ladder.removeChild(ladder.firstChild);
  }
  width = a;
  coef_height = b;
  fifty_spartans(ladder, 50, width, coef_height);
  chanjeSize("f1", width);
};

// const height_chenge = () => {
//   let a = document.getElementById("input_height");
//   while (ladder.hasChildNodes()) {
//     ladder.removeChild(ladder.firstChild);
//   }
//   coef_height = a;
//   fifty_spartans(ladder, 50, width, coef_height);
//   chanjeSize("f1", width);
// };
