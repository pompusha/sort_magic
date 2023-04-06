const game_field = document.getElementById("snake_game_field");

let score = 0;
let old_cord = 0;
let numbers = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];
let letters = [];

for (i = 65; i <= 90; i++) {
  letters.push(String.fromCharCode(i));
}

coordinate_of_id = [];
for (i in letters) {
  for (key in numbers) {
    coordinate_of_id.push(letters[i] + numbers[key]);
  }
}

// console.log(coordinate_of_id);

//
function create_game_fild(n) {
  for (i = 0; i < n; i++) {
    let field_cube = document.createElement("div");
    field_cube.setAttribute("id", "f" + i);
    field_cube.setAttribute("class", "class" + 1);
    field_cube.style.backgroundColor = "#DFFED9";
    field_cube.style.display = "grid";
    field_cube.setAttribute("id", coordinate_of_id[i]);

    // field_cube.style.width = "10";
    // field_cube.style.height = "10";
    // field_cube.style.border("solid black 2px");
    game_field.appendChild(field_cube);
  }
}
create_game_fild(400);

function show_aim_cube() {
  let x = Math.floor(Math.random() * 19);
  let y = String.fromCharCode(Math.floor(Math.random() * 19 + 65));
  let coordinate = y + x;
  console.log(coordinate);
  if (score === 0) {
    score++;
    return change_color(coordinate);
  } else change_color_to_grey(old_cord);
  score++;
  change_color(coordinate);
}
// show_aim_cube();

function change_color(coord) {
  old_cord = coord;
  document.getElementById(coord).style.backgroundColor = "red";
}
function change_color_to_grey(past_cord) {
  document.getElementById(past_cord).style.backgroundColor = "grey";
}
