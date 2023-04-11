const width_input = document.getElementById("input_width");
const button_grey = document.getElementById("button_grey");
const ladder = document.getElementById("rodia_ti_zloy");
const fiftin_spartains = document.getElementsByClassName("ladder");
const div_add_memmory = document.getElementById("id_add_memmory");
const add_column_size = document.getElementById("col_size_new");
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
  for (i = 0; i <= n; i++) {
    heights[i] = 10 + i * heights_coeficient;
  }

  for (i = 0; i <= n; i++) {
    let box = document.createElement("div");
    column = ladder.insertAdjacentElement("beforeend", box);

    column.setAttribute("id", "col_" + i);
    column.setAttribute("class", "ladder");
    column.style.backgroundColor = colorArray[i % colorArray.length];
    column.style.height = heights[i];
    column.style.width = width_;
    column.style.display = "flex";
  }
}
fifty_spartans(ladder, 50, width, coef_height, coef_height);

// кнопка изменение цвета
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
// make_grey_button
function make_colored() {
  for (i in fiftin_spartains) {
    fiftin_spartains[i].style.backgroundColor =
      colorArray[i % colorArray.length];
    fiftin_spartains[i].style.border = "none";
  }
}
//make kolored
function make_grey_again() {
  for (i in fiftin_spartains) {
    fiftin_spartains[i].style.backgroundColor = "grey";
    fiftin_spartains[i].style.border = "solid black";
    fiftin_spartains[i].style.borderWidth = "0.01";
  }
}

function shuffle() {

  let arr_fiftin_spartains = [].slice.call(fiftin_spartains);
  while (ladder.hasChildNodes()) {
    ladder.removeChild(ladder.firstChild);
  }
  let shiffeled_arr_fiftin_spartains = [];
  let shiffeled2_arr_fiftin_spartains = [];

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

// установка размеров рамки
function chanjeSize(object, width_) {
  document.getElementById(object).style.width = width_ * 50;
  console.log();
}

chanjeSize("f1", width);

// height and weight
const width_changer = () => {
  if (
    width_input.value === "" &&
    document.getElementById("input_height").value === ""
  ) {
    console.log("no any size ");
  } else {
    a = ladder.children.length;
    let w = width_input.value;
    let h = document.getElementById("input_height").value;
    while (ladder.hasChildNodes()) {
      ladder.removeChild(ladder.firstChild);
    }
    width = w;
    console.log(width);
    coef_height = h;
    if (button_grey.value === "grey") {
      fifty_spartans(ladder, a, width, coef_height);
      chanjeSize("f1", width);
    } else {
      fifty_spartans(ladder, a, width, coef_height);
      return make_grey_again();
    }
  }
};

//следи за названиями переменных. Тут как минимум лучше было назвать "w" и "h" - DONE

// create new column
function add_new_column() {
  const width_inFUNction = 4;
  let add_new_columnsize = document.getElementById("col_size_new").value;
  let add_new_columncolor = document.getElementById("col_color_new").value;

  let add_new_column = document.createElement("div");
  add_new_column.style.width = width_inFUNction;
  add_new_column.style.height = add_new_columnsize;
  add_new_column.style.backgroundColor = add_new_columncolor;
  add_new_column.style.display = "flex";
  if (document.getElementById("choose_field").value === "one") {
    if (!ladder.firstChild) {
      add_new_column.setAttribute("id", "col_" + ladder.children.length);
      ladder.appendChild(add_new_column);
    } else {
      add_new_column.setAttribute("class", "ladder");
      add_new_column.setAttribute("id", "col_" + ladder.children.length);
      ladder.appendChild(add_new_column);
    }
  } else if (document.getElementById("choose_field").value === "two") {
    add_new_column.setAttribute("class", "addit_memm");
    add_new_column.setAttribute("id", "mem_" + div_add_memmory.children.length);
    div_add_memmory.appendChild(add_new_column);
  }
}

const deleted_elements = [];

function delete_column() {
  let del_field = document.getElementById("select_field").value;
  let number_of_object = document.getElementById("input_del1_number").value;
  if (del_field === "1") {
    let a = Array.from(document.getElementsByClassName("ladder"));
    let array_for_delete = [].slice.call(a);
    while (ladder.firstChild) {
      ladder.removeChild(ladder.lastChild);
    }
    info_about_deleted_elem = array_for_delete[number_of_object]["outerHTML"];
    deleted_elements.push(info_about_deleted_elem);
    array_for_delete.splice(number_of_object, 1);
    for (i in array_for_delete) {
      ladder.appendChild(array_for_delete[i]);
    }
  } else if (del_field === "2") {
    let a = document.getElementsByClassName("addit_memm");
    let array_for_delete = [].slice.call(a);

    while (div_add_memmory.firstChild) {
      div_add_memmory.removeChild(div_add_memmory.lastChild);
    }
    //
    info_about_deleted_elem = array_for_delete[number_of_object]["outerHTML"];
    deleted_elements.push(info_about_deleted_elem);
    //
    for (i of array_for_delete) {
    }
    array_for_delete.splice(number_of_object, 1);
    //
    for (i in array_for_delete) {
      div_add_memmory.appendChild(array_for_delete[i]);
    }
  }
}
// change color
function change_the_col() {
  if (document.getElementById("fields").value === "first") {
    a = document.getElementById(
      "col_" + document.getElementById("id_changing_color_column").value
    );
    a.style.backgroundColor = document.getElementById("color_id").value;
  } else if (document.getElementById("fields").value === "second") {
    a = document.getElementById(
      "mem_" + document.getElementById("id_changing_color_column").value
    );
    a.style.backgroundColor = document.getElementById("color_id").value;
  } else {
    alert("go away");
  }
}
