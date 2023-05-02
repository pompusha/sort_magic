const game_field = document.getElementById("snake_game_field");

// *** main script

//Сделать словарь констант:
const apple_color = "red";
const field_color = "#679267";

let field_size = 20;

let score = 0;
let old_cord = 0;
let x_axis = [];
let y_axis = [];
let x_coord = null;
let y_coy_coordrd = null;
var timer;
let pause = true;
let start_check = false;
let vol = 0;
const pause_text = document.getElementById("pause_div");
var pauseInterval;

let direction_queue = [];
let direction = 2;
let x_save = [];
let y_save = [];

let snake_whole_parts = [];
coordinate_of_id = [];

for (i in y_axis) {
  for (key in x_axis) {
    coordinate_of_id.push(`${y_axis[i]}:${x_axis[key]}`);
  }
}

create_game_field(field_size, field_color);
create_snake_head();

const snake = document.getElementById("i_am_boss");
const score_id = document.getElementById("score_div");

// *** end main script

function create_snake_head() {
  head = document.createElement("div");
  head.setAttribute("id", "i_am_boss");
  head.setAttribute("class", "head");
  head.style.backgroundColor = "white";
  game_field.appendChild(head);
}

function create_game_field(field_size, color) {
  for (i = 0; i < field_size; i++) {
    x_axis.push(i);
    y_axis.push(i);
  }

  w = field_size * 21 + 100;
  h = field_size * 21 + 250;
  document.getElementById("source_div").style.width = `${w}px`;
  document.getElementById("source_div").style.height = `${h}px`;
  game_field.style.gridTemplateColumns = `repeat(${field_size}, 1fr)`;
  for (y = 0; y < field_size; y++) {
    for (x = 0; x < field_size; x++) {
      let field_cube = document.createElement("div");
      field_cube.setAttribute("class", "class" + 1);
      field_cube.style.backgroundColor = color;
      field_cube.style.display = "grid";

      field_cube.setAttribute("id", `${x}_${y}`);
      game_field.appendChild(field_cube);
    }
  }
  change_radius_all_board_angles(field_size);
}

function change_radius_all_board_angles(field_size) {
  //left_top
  lt_el = document.getElementById("0_0");
  lt_el.style.borderTopLeftRadius = "3px";

  //left_top
  rt_el = document.getElementById(`${field_size - 1}_0`);
  rt_el.style.borderTopRightRadius = "3px";

  //left_bot
  rt_el = document.getElementById(`0_${field_size - 1}`);
  rt_el.style.borderBottomLeftRadius = "3px";

  //right_bot
  rt_el = document.getElementById(`${field_size - 1}_${field_size - 1}`);
  rt_el.style.borderBottomRightRadius = "3px";
}

function left_click() {
  direction_queue.push(1);
  trunk_queue();
}

function right_click() {
  direction_queue.push(-1);
  trunk_queue();
}

function trunk_queue() {
  if (direction_queue.length > 2) {
    direction_queue.splice(0, direction_queue.length - 1);
  }
}

function move(current_direction) {
  y = snake.style.getPropertyValue("--y");
  x = snake.style.getPropertyValue("--x");

  switch (current_direction) {
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
    current_direction = (current_direction + change_direction + 4) % 4;
    direction = current_direction;
  }
  change_speed(current_direction);
  death_condition(field_size);
  death_from_body();
}

function start_game() {
  document.getElementById("dialog_wind").style.zIndex = "-1";
  clean_field();
  snake.style.setProperty("--x", -1);
  snake.style.setProperty("--y", 0);
  clearTimeout(timer);
  show_aim_cube_and_start(field_size);
  start_check = true;
  move(direction);
}

function change_color(coord) {
  old_cord = coord;
  document.getElementById(coord).style.backgroundColor = apple_color;
}

function change_color_to_grey(past_cord) {
  document.getElementById(past_cord).style.backgroundColor = field_color;
}

function show_aim_cube_and_start(field_size) {
  let x = Math.floor(Math.random() * field_size);

  let y = Math.floor(Math.random() * field_size);

  if (x_save.find((el) => el == x) && y_save.find((el) => el == y)) {
    show_aim_cube_and_start(field_size);
  }
  let coordinate = `${x}_${y}`;
  x_coord = x;
  y_coord = y;
  if (score === 0) {
    return change_color(coordinate);
  } else {
    change_color_to_grey(old_cord);
    change_color(coordinate);
  }
}

function take_a_cube() {
  if (
    snake.style.getPropertyValue("--x") * 21 === x_coord * 21 &&
    snake.style.getPropertyValue("--y") * 21 === y_coord * 21
  ) {
    console.log(`${snake.style.getPropertyValue("--x")}===${x_coord}`);
    console.log(`${snake.style.getPropertyValue("--y")}===${y_coord}`);
    score++;
    create_snake_body(
      // создаю тело и помещаю в него х и у
      score,
      snake.style.getPropertyValue("--x"),
      snake.style.getPropertyValue("--y")
    );
    show_aim_cube_and_start(field_size);
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
  } else if (snake.style.getPropertyValue("--x") >= n) {
    clearTimeout(timer);
    snake.style.setProperty("--x", n - 1);
    alert_death();
  } else if (snake.style.getPropertyValue("--y") < 0) {
    clearTimeout(timer);
    snake.style.setProperty("--y", 0);
    alert_death();
  } else if (snake.style.getPropertyValue("--y") >= n) {
    clearTimeout(timer);
    snake.style.setProperty("--y", n - 1);
    alert_death();
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

//Сделать заставку как в dark souls со звуком
function alert_death() {
  // document.getElementById("dialog_wind").className = "dead_souls_visible";
  document.getElementById("dialog_wind").style.zIndex = "1";
  sound();
  setTimeout(() => {
    snake.style.setProperty("--x", 0);
    snake.style.setProperty("--y", 0);
  }, 1500);

  direction = 2;
  clean_field();
}

function clean_field() {
  score = 0;
  x_save = [];
  y_save = [];
  snake_whole_parts = [];
  direction_queue = [];
  direction = 2;
  start_check = false;
  field = document.getElementsByClassName("class1");
  for (i = 0; i < field.length; i++) {
    if (field[i].style.backgroundColor === apple_color) {
      field[i].style.backgroundColor = field_color;
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
  score_id.innerHTML = `Your score: ${snake_whole_parts.length}`;
}

function change_speed(d) {
  timer = setTimeout(move, 400 - snake_whole_parts.length * 3, d);
  let speed_div = document.getElementById("speed_div");
  speed_div.innerHTML = `Speed: ${400 - snake_whole_parts.length * 3}`;
}
document.addEventListener("keyup", function (key) {
  if (key.key == "ArrowLeft" || key.key === "a" || key.key == "ф") {
    left_click();
  } else if (key.key == "ArrowRight" || key.key == "d" || key.key == "в") {
    right_click();
  } else if (key.key === "w") {
    start_game();
  } else if (key.key == "e") {
    press_pause(pause);
  }
});

function sound() {
  myAudio = document.getElementById("audio_play");
  myAudio.volume = vol;
  myAudio.play();
}

function press_pause(p) {
  if (start_check === false) {
    return;
  } else {
    if (p === true) {
      pause = false;
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
}

function switch_off_volume() {
  if (vol === 1) {
    vol = 0;
    console.log(vol);
  } else {
    vol = 1;
    console.log(vol);
  }
}
