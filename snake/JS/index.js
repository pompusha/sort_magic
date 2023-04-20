const game_field = document.getElementById("snake_game_field");

// *** main script
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
var timer;

const snake_whole_parts = [];
coordinate_of_id = [];
for (i in letters) {
  for (key in numbers) {
    coordinate_of_id.push(`${letters[i]}:${numbers[key]}`);
  }
}

create_game_field(20, "#DFFED9");

head = document.createElement("div");
head.setAttribute("id", "i_am_boss");
head.setAttribute("class", "head");
game_field.appendChild(head);
const snake = document.getElementById("i_am_boss");
// snake_whole_parts.push(snake);

let x_current_loca = 0;
let y_current_loca = 0;
let x_past = 0;
let y_past = 0;
let right_butt_click = 0;
let left_butt_click = 0;
let direction = 2;
// let x_mem = [];
// let y_mem = [];
let x_save = [];
let y_save = [];
// *** end main script

function create_game_field(n, color) {
  //Разобраться с тем как захерачить размер
  // document
  //  .getElementById("snake_game_field")
  //  .setAttribute("grid-template-columns", `repeat(${n}, 1fr)`);
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      let field_cube = document.createElement("div");
      field_cube.setAttribute("class", "class" + 1);
      field_cube.style.backgroundColor = color;
      field_cube.style.display = "grid";
      field_cube.setAttribute("id", coordinate_of_id[i * n + j]);
      game_field.appendChild(field_cube);
    }
  }
}

let direction_queue = [];

function left_click() {
  direction_queue.push(1);
}

function right_click() {
  direction_queue.push(-1);
}

function move(d) {
  y = snake.style.getPropertyValue("--y");
  x = snake.style.getPropertyValue("--x");

  switch (d) {
    case 0:
      x--;
      break;
    case 1:
      y++;
      break;
    case 2:
      x++;
      break;
    case 3:
      y--;
      break;
  }

  y = snake.style.setProperty("--y", y);
  x = snake.style.setProperty("--x", x);

  movement_body();
  take_a_cube();

  if (direction_queue.length > 0) {
    change_direction = direction_queue.shift();
    d = (d + change_direction + 4) % 4;
  }
  timer = setTimeout(move, 200, d);
  death_condition(20);
  death_from_body();
}

function start_game() {
  clearTimeout(timer);
  show_aim_cube_and_start();

  move(direction);
}

//
function change_color(coord) {
  old_cord = coord;
  document.getElementById(coord).style.backgroundColor = "red";
}

function change_color_to_grey(past_cord) {
  document.getElementById(past_cord).style.backgroundColor = "grey";
}

function show_aim_cube_and_start() {
  let x = Math.floor(Math.random() * 19);
  let y = Math.floor(Math.random() * 19);
  let coordinate = `${y}:${x}`;
  x_coord = x;
  y_coprd = y;
  if (score === 0) {
    // score++;
    return change_color(coordinate);
  } else change_color_to_grey(old_cord);
  score++;
  change_color(coordinate);
}

function take_a_cube() {
  if (
    snake.style.getPropertyValue("--x") * 21 === x_coord * 21 &&
    snake.style.getPropertyValue("--y") * 21 === y_coprd * 21
  ) {
    score++;
    create_snake_body(
      // создаю тело и помущаю в него х и у
      score,
      snake.style.getPropertyValue("--x"),
      snake.style.getPropertyValue("--y")
    );
    show_aim_cube_and_start();
  }
  if (score > 0) {
    x_save.push(snake.style.getPropertyValue("--x"));
    y_save.push(snake.style.getPropertyValue("--y"));
  }
}

function death_condition(n) {
  if (snake.style.getPropertyValue("--x") < 0) {
    clearTimeout(timer);
    snake.style.setProperty("--x", 0);
    return console.log("You lose");
  } else if (snake.style.getPropertyValue("--x") >= n) {
    clearTimeout(timer);
    snake.style.setProperty("--x", n - 1);
    return console.log("You lose");
  } else if (snake.style.getPropertyValue("--y") < 0) {
    clearTimeout(timer);
    snake.style.setProperty("--y", 0);
    return console.log("You lose");
  } else if (snake.style.getPropertyValue("--y") >= n) {
    clearTimeout(timer);
    snake.style.setProperty("--y", n - 1);
    return console.log("You lose");
  }
}
function death_from_body() {
  for (i = 1; i < x_save.length - 1; i++) {
    console.log(x_save[i]);
    if (
      snake.style.getPropertyValue("--x") === x_save[i] &&
      snake.style.getPropertyValue("--y") === y_save[i]
    ) {
      console.log(snake.style.getPropertyValue("--x") + " === " + x_save[i]);
      console.log(snake.style.getPropertyValue("--y") + " === " + y_save[i]);
      clearTimeout(timer);
      return console.log("You lose!!!!!!!!!!!!!");
    }
  }
}

function create_snake_body(i, x_, y_) {
  // console.log(x_);

  body = document.createElement("div");
  body.setAttribute("id", i);
  body.setAttribute("class", "body");
  game_field.appendChild(body);
  body.style.setProperty("--x", x_);
  body.style.setProperty("--y", y_);
  snake_whole_parts.push(document.getElementById(i));
}

function movement_body() {
  for (j in snake_whole_parts) {
    for (i = 0; i < x_save.length; i++) {
      u = i - j;
      snake_whole_parts[j].style.setProperty("--x", x_save[u]);
      snake_whole_parts[j].style.setProperty("--y", y_save[u]);
      if (x_save.length > snake_whole_parts.length + 1) {
        snake_whole_parts[j].style.setProperty("--x", x_save.shift());
        snake_whole_parts[j].style.setProperty("--y", y_save.shift());
      }
    }
  }
}

//   document.getElementsByClassName("body");
//   for (i in snake_whole_parts) {
//     snake_whole_parts[i].style.setProperty(
//       "--x",
//       snake.style.getPropertyValue("--x")
//     );
//     snake_whole_parts[i].style.setProperty(
//       "--y",
//       snake.style.getPropertyValue("--y")
//     );
//     game_field.appendChild(snake_whole_parts[i]);
//     console.log(
//       "movement_body x" +
//         " " +
//         snake_whole_parts[i].style.getPropertyValue("--x")
//     );
//     console.log(
//       "movement_body y" +
//         " " +
//         snake_whole_parts[i].style.getPropertyValue("--y")
//     );
//   }
// }
//
//
//
//
//
// function sravn() {
//   if (right_butt_click === 0) {
//     right_butt_click++;
//   }
//   if (x_current_loca > x_past) {
//     left_butt_click = 4;
//     right_butt_click = 2;
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//     console.log(`+x ${x_past} ${x_current_loca}`);
//     console.log("_________________________________");
//     console.log(`+y ${y_past} ${y_current_loca}`);
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//   } else if (y_current_loca > y_past) {
//     left_butt_click = 1;
//     right_butt_click = 3;
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//     console.log(`+x ${x_past} ${x_current_loca}`);
//     console.log("_________________________________");
//     console.log(`+y ${y_past} ${y_current_loca}`);
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//   } else if (x_past > x_current_loca) {
//     left_butt_click = 2;
//     right_butt_click = 4;
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//     console.log(`+x ${x_past} ${x_current_loca}`);
//     console.log("_________________________________");
//     console.log(`+y ${y_past} ${y_current_loca}`);
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//     // console.log(`x ${x_past}`);
//     // console.log(`x current ${snake.style.getPropertyValue("--x")}`);
//   } else if (y_past > y_current_loca) {
//     left_butt_click = 3;
//     right_butt_click = 1;
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//     console.log(`+x ${x_past} ${x_current_loca}`);
//     console.log("_________________________________");
//     console.log(`+y ${y_past} ${y_current_loca}`);
//     console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
//   }
// }

// function what_to_do(numb_from_botton) {
//   clearTimeout(timer);
//   sravn();

//   // console.log("left" + " " + left_butt_click);
//   // console.log("rigth" + " " + right_butt_click);
//   if (numb_from_botton === 0) {
//     show_aim_cube_and_start();
//     movement_x();
//   } else if (numb_from_botton === 1) {
//     // right_butt_click++;
//     if (x_current_loca === 0) {
//     }
//     if (right_butt_click === 1) {
//       movement_x(1);
//     } else if (right_butt_click === 2) {
//       movement_y(1);
//     } else if (right_butt_click === 3) {
//       back_movement_x(1);
//     } else if (right_butt_click === 4) {
//       back_movement_y(1);
//     } else if (right_butt_click > 4) {
//       right_butt_click = 0;
//       return what_to_do(1);
//     }
//     //
//   } else if (numb_from_botton === 2) {
//     // left_butt_click++;

//     if (left_butt_click === 1) {
//       movement_x(2);
//     } else if (left_butt_click === 2) {
//       movement_y(2);
//     } else if (left_butt_click === 3) {
//       back_movement_x(2);
//     } else if (left_butt_click === 4) {
//       back_movement_y(2);
//     } else if (left_butt_click > 4) {
//       left_butt_click = 0;
//       return what_to_do(2);
//     }
//   }
//   x_past = snake.style.getPropertyValue("--x");
//   y_past = snake.style.getPropertyValue("--y");
//   snake.style.setProperty("--x", x_past);
//   snake.style.setProperty("--y", y_past);
// }

// function movement_x(button) {
//   if (button === 1) {
//     x_past = snake.style.getPropertyValue("--x");
//     if (right_butt_click === 1 && x_current_loca <= 19) {
//       for (i = 0; i < 1; i++) {
//         move = x_current_loca + 1;
//         take_a_cube();
//         snake.style.setProperty("--x", move);
//         x_current_loca = move;
//       }
//       timer = setTimeout(movement_x, 400, 1);
//       // setTimeout(() => {
//       //   movement_x(1);
//       // }, 400);
//     } else {
//     }
//   } else if (button === 2) {
//     if (left_butt_click === 1 && x_current_loca <= 19) {
//       for (i = 0; i < 1; i++) {
//         move = x_current_loca + 1;
//         take_a_cube();
//         snake.style.setProperty("--x", move);
//         x_current_loca = move;
//       }
//       timer = setTimeout(movement_x, 400, 2);
//       // setTimeout(() => {
//       //   movement_x(2);
//       // }, 400);
//     }
//   }
// }

// function back_movement_x(button) {
//   if (button === 1) {
//     if (right_butt_click === 3 && x_current_loca >= 0) {
//       x_past = snake.style.getPropertyValue("--x");
//       for (i = 0; i < 1; i++) {
//         move = x_current_loca - 1;
//         take_a_cube();
//         snake.style.setProperty("--x", move);
//         x_current_loca = move;
//       }
//     }
//     timer = setTimeout(back_movement_x, 400, 1);
//     // setTimeout(() => {
//     //   back_movement_x(1);
//     // }, 400);
//   } else if (button === 2) {
//     if (left_butt_click === 3 && x_current_loca >= 0) {
//       x_past = snake.style.getPropertyValue("--x");
//       for (i = 0; i < 1; i++) {
//         move = x_current_loca - 1;
//         take_a_cube();
//         snake.style.setProperty("--x", move);
//         x_current_loca = move;
//       }
//       timer = setTimeout(back_movement_x, 400, 2);
//       // setTimeout(() => {
//       //   back_movement_x(2);
//       // }, 400);
//     }
//   }
// }

// function movement_y(button) {
//   if (button === 1) {
//     if (right_butt_click === 2 && y_current_loca <= 19) {
//       y_past = snake.style.getPropertyValue("--y");
//       for (i = 0; i < 1; i++) {
//         move = y_current_loca + 1;
//         take_a_cube();
//         snake.style.setProperty("--y", move);
//         y_current_loca = move;
//       }
//       timer = setTimeout(movement_y, 400, 1);
//       // setTimeout(() => {
//       //   movement_y(1);
//       // }, 400);
//     }
//   } else if (button === 2) {
//     if (left_butt_click === 2 && y_current_loca <= 19) {
//       y_past = snake.style.getPropertyValue("--y");
//       for (i = 0; i < 1; i++) {
//         move = y_current_loca + 1;
//         take_a_cube();
//         snake.style.setProperty("--y", move);
//         y_current_loca = move;
//       }
//       timer = setTimeout(movement_y, 400, 2);
//       // setTimeout(() => {
//       //   movement_y(2);
//       // }, 400);
//     }
//   }
// }

// function back_movement_y(button) {
//   if (button === 1) {
//     if (right_butt_click === 4 && y_current_loca >= 0) {
//       y_past = snake.style.getPropertyValue("--y");
//       for (i = 0; i < 1; i++) {
//         move = y_current_loca - 1;
//         take_a_cube();
//         snake.style.setProperty("--y", move);
//         y_current_loca = move;
//       }
//     }
//     timer = setTimeout(back_movement_y, 400, 1);
//     // setTimeout(() => {
//     //   back_movement_y(1);
//     // }, 400);
//   } else if (button === 2) {
//     if (left_butt_click === 4 && y_current_loca >= 0) {
//       y_past = snake.style.getPropertyValue("--y");
//       for (i = 0; i < 1; i++) {
//         move = y_current_loca - 1;
//         take_a_cube();
//         snake.style.setProperty("--y", move);
//         y_current_loca = move;
//       }
//     }
//     timer = setTimeout(back_movement_y, 400, 2);
//     // setTimeout(() => {
//     //   back_movement_y(2);
//     // }, 400);
//   }
// }

// // total width: 22px;
// // total height: 22px;
// // gap: 1px;

// // search the cell
