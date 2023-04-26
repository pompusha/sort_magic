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
let pause = true;
const pause_text = document.getElementById("pause_div");
var pauseInterval;

let snake_whole_parts = [];
coordinate_of_id = [];
for (i in letters) {
  for (key in numbers) {
    coordinate_of_id.push(`${letters[i]}:${numbers[key]}`);
  }
}
create_game_field(20, "#679267");
create_snake_head();

const snake = document.getElementById("i_am_boss");
const score_id = document.getElementById("score_div");

function create_snake_head() {
  head = document.createElement("div");
  head.setAttribute("id", "i_am_boss");
  head.setAttribute("class", "head");
  head.style.backgroundColor = "white";
  game_field.appendChild(head);
}

let direction = 2;
let x_save = [];
let y_save = [];

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
  change_radius_whole_angle();
}

let direction_queue = [];

function left_click() {
  direction_queue.push(1);
  clean_queue();
}

function right_click() {
  direction_queue.push(-1);
  clean_queue();
}

function clean_queue() {
  if (direction_queue.length > 2) {
    direction_queue.splice(0, direction_queue.length - 1);
  }
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
    direction = d;
  }
  change_speed(d);
  death_condition(20);
  death_from_body();
}

function start_game() {
  snake.style.setProperty("--x", -1);
  snake.style.setProperty("--y", 0);
  clean_field();
  clearTimeout(timer);
  show_aim_cube_and_start();

  move(direction);
}

function change_color(coord) {
  old_cord = coord;
  document.getElementById(coord).style.backgroundColor = "red";
}

function change_color_to_grey(past_cord) {
  document.getElementById(past_cord).style.backgroundColor = "#679267";
}

function show_aim_cube_and_start() {
  let x = Math.floor(Math.random() * 19);
  let y = Math.floor(Math.random() * 19);
  if (x_save.find((el) => el == x) && y_save.find((el) => el == y)) {
    console.log(`coordinate = ${y}:${x}`);
    show_aim_cube_and_start();
  }
  let coordinate = `${y}:${x}`;
  x_coord = x;
  y_coprd = y;
  if (score === 0) {
    return change_color(coordinate);
  } else change_color_to_grey(old_cord);
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
    snake.style.setProperty("--x", n - 1);
    alert_death();
    create_game_field();
  } else if (snake.style.getPropertyValue("--x") >= n) {
    clearTimeout(timer);
    snake.style.setProperty("--x", n - 1);
    alert_death();
    create_game_field();
  } else if (snake.style.getPropertyValue("--y") < 0) {
    clearTimeout(timer);
    snake.style.setProperty("--y", 0);
    alert_death();
    create_game_field();
  } else if (snake.style.getPropertyValue("--y") >= n) {
    clearTimeout(timer);
    snake.style.setProperty("--y", n - 1);
    alert_death();
    create_game_field();
  }
}

function death_from_body() {
  for (i = 1; i < x_save.length - 1; i++) {
    if (
      snake.style.getPropertyValue("--x") === x_save[i] &&
      snake.style.getPropertyValue("--y") === y_save[i]
    ) {
      clearTimeout(timer);
      alert_death();
    }
  }
}

function alert_death() {
  alert("You lose");
  sound();
  snake.style.setProperty("--x", 0);
  snake.style.setProperty("--y", 0);
  direction = 2;
  clean_field();
}

function clean_field() {
  score = 0;
  x_save = [];
  y_save = [];
  snake_whole_parts = [];
  direction_queue = [];

  field = document.getElementsByClassName("class1");
  for (i = 0; i < field.length; i++) {
    if (field[i].style.backgroundColor === "red") {
      field[i].style.backgroundColor = "#679267";
    }
  }
  body = document.getElementsByClassName("body");
  while (body[0]) {
    game_field.removeChild(body[0]);
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
  let a = `Your score: ${snake_whole_parts.length}`;
  score_id.innerHTML = `Your score: ${snake_whole_parts.length}`;
}

function change_speed(d) {
  timer = setTimeout(move, 400 - snake_whole_parts.length * 3, d);
  let speed_div = document.getElementById("speed_div");
  speed_div.innerHTML = `Speed: ${400 - snake_whole_parts.length * 3}`;
}
document.addEventListener("keyup", function (key) {
  if (key.key == "ArrowLeft" || key.key == "a" || key.key == "ф") {
    left_click();
  } else if (key.key == "ArrowRight" || key.key == "d" || key.key == "в") {
    right_click();
  } else if (key.key == " ") {
    start_game();
  } else if (key.key == "e") {
    press_pause(pause);
    console.log("e");
  }
});

function change_radius_whole_angle() {
  f_elem = document.querySelector(".class1");
  f_elem.style.borderTopLeftRadius = "3px";

  field_divs = document.getElementsByClassName("class1");
  for (i = 0; i < field_divs.length; i++) {
    if (field_divs[i].id == `${numbers[0]}:${letters[letters.length - 1]}`) {
      field_divs[i].style.borderTopRightRadius = "3px";
    } else if (
      field_divs[i].id == `${numbers[numbers.length - 1]}:${letters[0]}`
    ) {
      field_divs[i].style.borderBottomLeftRadius = "3px";
    } else if (
      field_divs[i].id ==
      `${numbers[numbers.length - 1]}:${letters[letters.length - 1]}`
    ) {
      field_divs[i].style.borderBottomRightRadius = "3px";
    }
  }
}

function sound() {
  myAudio = document.getElementById("audio_play");
  myAudio.volume = 0.5;
  myAudio.play();
}

function press_pause(p) {
  console.log(`direction ${direction}`);

  if (p === true) {
    pause = false;

    console.log(pause);
    clearTimeout(timer);

    if (pause === false) {
      pauseInterval = setInterval(function () {
        pause_text.style.visibility =
          pause_text.style.visibility == "visible" ? "" : "visible";
      }, 1000);
    }
  } else if (p === false) {
    clearInterval(pauseInterval);
    pause = true;
    pause_text.style.visibility = "hidden";
    move(direction);
    console.log("play");
  }
}
