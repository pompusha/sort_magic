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
const score_id = document.getElementById("score_div");

let x_current_loca = 0;
let y_current_loca = 0;
let x_past = 0;
let y_past = 0;
let right_butt_click = 0;
let left_butt_click = 0;
let direction = 2;
let x_save = [];
let y_save = [];
// *** end main script

function create_game_field(n, color) {
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
  console.log(score);
  change_speed(d);
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
      // создаю тело и помещаю в него х и у
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
  show_score();
}

function death_condition(n) {
  if (snake.style.getPropertyValue("--x") < 0) {
    clearTimeout(timer);
    snake.style.setProperty("--x", 0);
    return alert("You lose");
  } else if (snake.style.getPropertyValue("--x") >= n) {
    clearTimeout(timer);
    snake.style.setProperty("--x", n - 1);
    return alert("You lose");
  } else if (snake.style.getPropertyValue("--y") < 0) {
    clearTimeout(timer);
    snake.style.setProperty("--y", 0);
    return alert("You lose");
  } else if (snake.style.getPropertyValue("--y") >= n) {
    clearTimeout(timer);
    snake.style.setProperty("--y", n - 1);
    return alert("You lose");
  }
}
function death_from_body() {
  for (i = 1; i < x_save.length - 1; i++) {
    if (
      snake.style.getPropertyValue("--x") === x_save[i] &&
      snake.style.getPropertyValue("--y") === y_save[i]
    ) {
      clearTimeout(timer);
      return alert("You lose!");
    }
  }
}

function create_snake_body(i, x_, y_) {
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
function show_score() {
  score_id.innerHTML = `Your score: ${snake_whole_parts.length}`;
}
function change_speed(d) {
  timer = setTimeout(move, 400 - snake_whole_parts.length * 3, d);
}
