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
coef_height = 3;
// создание 50 дивов
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
    column.style.width = width_;
  }
}

// кнопка изменение цвета
// Хорошая идея - проверять, что вообще сейчас отображено. Но лучше назвать функцию понятнее, типа check_color
function remove_color() {
  if (button_grey.value === "grey") {
    button_grey.value = "Rainbow";
    button_grey.className = "butRandomNEXT";
    return make_grey_again();
  } else if (button_grey.value === "Rainbow") {
    button_grey.value = "grey";
    button_grey.className = "butRandom";
    return make_colored();
  }
}
// make_grey_button - коментарий не понятный, зачем тут название второй функции?
function make_colored() {
  for (i in fiftin_spartains) {
    fiftin_spartains[i].style.backgroundColor =
      colorArray[i % colorArray.length];
    fiftin_spartains[i].style.border = "none";
  }
}

//make kolored - да кровь же из глаз! Colored!
function make_grey_again() {
  for (i in fiftin_spartains) {
    fiftin_spartains[i].style.backgroundColor = "grey";
    fiftin_spartains[i].style.border = "solid black";
    fiftin_spartains[i].style.borderWidth = "0.01";
  }
}

//

// function grey() {
//   //Лучше завести внутреннюю переменную - индикатор "серый/радуга". Так вызывая переменную в if блоках будет -DONE function remove_color()
//   //проше следить за тем в каком состоянии ты находишься. Например захочешь ты сменить название кнопки и придется по всему коду ифы переписывать. DONE
//
// кнопка перемешивания столбиков (объявляй просто функцией)-DONE
function shuffle() {
  //хорошо разбил на массив
  let arr_fiftin_spartains = [].slice.call(fiftin_spartains);
  while (ladder.hasChildNodes()) {
    ladder.removeChild(ladder.firstChild);
  }
  let shiffeled_arr_fiftin_spartains = [];
  let shiffeled2_arr_fiftin_spartains = [];
  //Из-за того, что Math.random работает достаточно равномерно - получается, что оба массива *fiftin_spartains содержат
  //похожие кластеры - получается две горки. Предлагаю улучшить алгоритм - подумай.

  arr_fiftin_spartains.forEach((div_element) => {
    if (Math.floor(Math.random() * 4) === 0) {
      shiffeled_arr_fiftin_spartains.push(div_element);
    } else if (Math.floor(Math.random() * 4) === 1) {
      shiffeled_arr_fiftin_spartains.unshift(div_element);
    } else if (Math.floor(Math.random() * 4) === 2) {
      shiffeled2_arr_fiftin_spartains.unshift(div_element);
    } else {
      shiffeled2_arr_fiftin_spartains.push(div_element);
    }
    arr_result = [
      ...shiffeled_arr_fiftin_spartains,
      ...shiffeled2_arr_fiftin_spartains,
    ];
    arr_result.forEach((el) => ladder.appendChild(el));
  });
}

// Старайся не оставлять закоментированный код - это признак плохого тона. 
// Если ты не напишешь коментарий - почему он у тебя закоменчен - то это уже просто гавно
/*
arr_fiftin_spartains.forEach((div_element) => {
  if (Math.round(Math.random()) === 1) {
    if (Math.round(Math.random()) === 1){
      shiffeled_arr_fiftin_spartains.push(div_element)
    } else {shiffeled_arr_fiftin_spartains.unshift(div_element)}
    }
    else {
      if (Math.round(Math.random()) === 1)
      {shiffeled2_arr_fiftin_spartains.push(div_element)
      } else {shiffeled2_arr_fiftin_spartains.unshift(div_element)}

    })
  }
*/
// установка размеров рамки chanGe!!!!!!
function chanjeSize(object, width_) {
  document.getElementById(object).style.width = width_ * 50;
  console.log();
}

//chanGe
chanjeSize("f1", width);
fifty_spartans(ladder, 50, width, coef_height, coef_height);

// height and weight
const width_changer = () => {
  if (
    width_input.value === "" &&
    document.getElementById("input_height").value === ""
  ) {
    console.log("no any size ");
  } else {
    let w = width_input.value;
    let h = document.getElementById("input_height").value;
    while (ladder.hasChildNodes()) {
      ladder.removeChild(ladder.firstChild);
    }
    width = w;
    coef_height = h;
    if (button_grey.value === "grey") {
      fifty_spartans(ladder, 50, width, coef_height);
      chanjeSize("f1", width);
    } else {
      fifty_spartans(ladder, 50, width, coef_height);
      return make_grey_again();
    }
  }
};

//следи за названиями переменных. Тут как минимум лучше было назвать "w" и "h" - DONE
//   let w = width_input.value;
//   let h = document.getElementById("input_height").value;
//   while (ladder.hasChildNodes()) {
//     ladder.removeChild(ladder.firstChild);
//   }
//   width = w;
//   coef_height = h;
//   fifty_spartans(ladder, 50, width, coef_height);
//   chanjeSize("f1", width);
// };
