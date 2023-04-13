const game_field = document.getElementById("snake_game_field");

//
let score = 0;
let old_cord = 0;
let numbers = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];
let letters = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];
let x_coord = null;
let y_coprd = null;

coordinate_of_id = [];
for (i in letters) {
  for (key in numbers) {
    coordinate_of_id.push(`${letters[i]}:${numbers[key]}`);
  }
}
var timer;
//
function create_game_fild(n) {
  for (i = 0; i < n; i++) {
    let field_cube = document.createElement("div");
    field_cube.setAttribute("class", "class" + 1);
    field_cube.style.backgroundColor = "#DFFED9";
    field_cube.style.display = "grid";
    field_cube.setAttribute("id", coordinate_of_id[i]);
    game_field.appendChild(field_cube);
  }
}
create_game_fild(400);
// show_aim_cube();
function change_color(coord) {
  old_cord = coord;
  document.getElementById(coord).style.backgroundColor = "red";
}
function change_color_to_grey(past_cord) {
  document.getElementById(past_cord).style.backgroundColor = "grey";
}

head = document.createElement("div");
head.setAttribute("id", "i_am_boss");
head.setAttribute("class", "head");
game_field.appendChild(head);
const snake = document.getElementById("i_am_boss");

let x_current_loca = 0;
let y_current_loca = 0;
//
function show_aim_cube_and_start() {
  // console.log("fddgdfg");
  let x = Math.floor(Math.random() * 19);
  let y = Math.floor(Math.random() * 19);
  let coordinate = `${y}:${x}`;
  x_coord = x;
  y_coprd = y;
  // console.log(coordinate);
  if (score === 0) {
    score++;
    // movement_of_snake();
    return change_color(coordinate);
  } else change_color_to_grey(old_cord);
  score++;
  change_color(coordinate);
  // movement_of_snake();
}

let x_past = 0;
let y_past = 0;

function sravn() {
  if (right_butt_click === 0) {
    right_butt_click++;
  }
  if (x_current_loca > x_past) {
    left_butt_click = 4;
    right_butt_click = 2;
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(`+x ${x_past} ${x_current_loca}`);
    console.log("_________________________________");
    console.log(`+y ${y_past} ${y_current_loca}`);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  } else if (y_current_loca > y_past) {
    left_butt_click = 1;
    right_butt_click = 3;
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(`+x ${x_past} ${x_current_loca}`);
    console.log("_________________________________");
    console.log(`+y ${y_past} ${y_current_loca}`);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  } else if (x_past > x_current_loca) {
    left_butt_click = 2;
    right_butt_click = 4;
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(`+x ${x_past} ${x_current_loca}`);
    console.log("_________________________________");
    console.log(`+y ${y_past} ${y_current_loca}`);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    // console.log(`x ${x_past}`);
    // console.log(`x current ${snake.style.getPropertyValue("--x")}`);
  } else if (y_past > y_current_loca) {
    left_butt_click = 3;
    right_butt_click = 1;
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(`+x ${x_past} ${x_current_loca}`);
    console.log("_________________________________");
    console.log(`+y ${y_past} ${y_current_loca}`);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  }
}

let right_butt_click = 0;
let left_butt_click = 0;

function wat_to_do(numb_from_botton) {
  sravn();
  clearTimeout(timer);
  // console.log("left" + " " + left_butt_click);
  // console.log("rigth" + " " + right_butt_click);
  if (numb_from_botton === 0) {
    show_aim_cube_and_start();
    movement_x();
  } else if (numb_from_botton === 1) {
    // right_butt_click++;
    if (x_current_loca === 0) {
    }
    if (right_butt_click === 1) {
      movement_x(1);
    } else if (right_butt_click === 2) {
      movement_y(1);
    } else if (right_butt_click === 3) {
      back_movement_x(1);
    } else if (right_butt_click === 4) {
      back_movement_y(1);
    } else if (right_butt_click > 4) {
      right_butt_click = 0;
      return wat_to_do(1);
    }
    //
  } else if (numb_from_botton === 2) {
    // left_butt_click++;

    if (left_butt_click === 1) {
      movement_x(2);
    } else if (left_butt_click === 2) {
      movement_y(2);
    } else if (left_butt_click === 3) {
      back_movement_x(2);
    } else if (left_butt_click === 4) {
      back_movement_y(2);
    } else if (left_butt_click > 4) {
      left_butt_click = 0;
      return wat_to_do(2);
    }
  }
  x_past = snake.style.getPropertyValue("--x");
  y_past = snake.style.getPropertyValue("--y");
  snake.style.setProperty("--x", x_past);
  snake.style.setProperty("--y", y_past);
}

function movement_x(button) {
  if (button === 1) {
    x_past = snake.style.getPropertyValue("--x");
    if (right_butt_click === 1 && x_current_loca <= 19) {
      for (i = 0; i < 1; i++) {
        move = x_current_loca + 1;
        take_a_cube();
        snake.style.setProperty("--x", move);
        x_current_loca = move;
      }
      timer = setTimeout(movement_x, 400, 1);
      // setTimeout(() => {
      //   movement_x(1);
      // }, 400);
    } else {
    }
  } else if (button === 2) {
    if (left_butt_click === 1 && x_current_loca <= 19) {
      for (i = 0; i < 1; i++) {
        move = x_current_loca + 1;
        take_a_cube();
        snake.style.setProperty("--x", move);
        x_current_loca = move;
      }
      timer = setTimeout(movement_x, 400, 2);
      // setTimeout(() => {
      //   movement_x(2);
      // }, 400);
    }
  }
}

function back_movement_x(button) {
  if (button === 1) {
    if (right_butt_click === 3 && x_current_loca >= 0) {
      x_past = snake.style.getPropertyValue("--x");
      for (i = 0; i < 1; i++) {
        move = x_current_loca - 1;
        take_a_cube();
        snake.style.setProperty("--x", move);
        x_current_loca = move;
      }
    }
    timer = setTimeout(back_movement_x, 400, 1);
    // setTimeout(() => {
    //   back_movement_x(1);
    // }, 400);
  } else if (button === 2) {
    if (left_butt_click === 3 && x_current_loca >= 0) {
      x_past = snake.style.getPropertyValue("--x");
      for (i = 0; i < 1; i++) {
        move = x_current_loca - 1;
        take_a_cube();
        snake.style.setProperty("--x", move);
        x_current_loca = move;
      }
      timer = setTimeout(back_movement_x, 400, 2);
      // setTimeout(() => {
      //   back_movement_x(2);
      // }, 400);
    }
  }
}

function movement_y(button) {
  if (button === 1) {
    if (right_butt_click === 2 && y_current_loca <= 19) {
      y_past = snake.style.getPropertyValue("--y");
      for (i = 0; i < 1; i++) {
        move = y_current_loca + 1;
        take_a_cube();
        snake.style.setProperty("--y", move);
        y_current_loca = move;
      }
      timer = setTimeout(movement_y, 400, 1);
      // setTimeout(() => {
      //   movement_y(1);
      // }, 400);
    }
  } else if (button === 2) {
    if (left_butt_click === 2 && y_current_loca <= 19) {
      y_past = snake.style.getPropertyValue("--y");
      for (i = 0; i < 1; i++) {
        move = y_current_loca + 1;
        take_a_cube();
        snake.style.setProperty("--y", move);
        y_current_loca = move;
      }
      timer = setTimeout(movement_y, 400, 2);
      // setTimeout(() => {
      //   movement_y(2);
      // }, 400);
    }
  }
}

function back_movement_y(button) {
  if (button === 1) {
    if (right_butt_click === 4 && y_current_loca >= 0) {
      y_past = snake.style.getPropertyValue("--y");
      for (i = 0; i < 1; i++) {
        move = y_current_loca - 1;
        take_a_cube();
        snake.style.setProperty("--y", move);
        y_current_loca = move;
      }
    }
    timer = setTimeout(back_movement_y, 400, 1);
    // setTimeout(() => {
    //   back_movement_y(1);
    // }, 400);
  } else if (button === 2) {
    if (left_butt_click === 4 && y_current_loca >= 0) {
      y_past = snake.style.getPropertyValue("--y");
      for (i = 0; i < 1; i++) {
        move = y_current_loca - 1;
        take_a_cube();
        snake.style.setProperty("--y", move);
        y_current_loca = move;
      }
    }
    timer = setTimeout(back_movement_y, 400, 2);
    // setTimeout(() => {
    //   back_movement_y(2);
    // }, 400);
  }
}

// total width: 22px;
// total height: 22px;
//  gap: 1px;

// sezrch the cell
function take_a_cube() {
  if (
    x_current_loca * 21 === x_coord * 21 &&
    y_current_loca * 21 === y_coprd * 21
  ) {
    console.log("good job");
    show_aim_cube_and_start();
  }
}
