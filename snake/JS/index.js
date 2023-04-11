const game_field = document.getElementById("snake_game_field");

let score = 0;
let old_cord = 0;
//Если не обращать внимание на то, что этот массив вообще не нужен - он должен быть констатнтой
let numbers = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];
let letters = [];

for (i = 65; i <= 90; i++) {
  letters.push(String.fromCharCode(i));
}

coordinate_of_id = [];
// Пусть лучше координаты поля будут двумя числами
for (i in letters) {
  for (key in numbers) {
    coordinate_of_id.push(letters[i] + numbers[key]);
  }
}

// console.log(coordinate_of_id);

//Надо подумать, чтобы этой функцией было удобно пользоваться - 
//т.е. она на вход должна принимать размер поля, а не квадрат этого размера
function create_game_fild(n) {
  for (i = 0; i < n; i++) {
    let field_cube = document.createElement("div");
    //строчка лишняя
    field_cube.setAttribute("id", "f" + i);
    
    //Надо осмысленное название класса для поля
    field_cube.setAttribute("class", "class" + 1);
    
    //Отправляем в CSS, это тут не нужно
    field_cube.style.backgroundColor = "#DFFED9";
    field_cube.style.display = "grid";
    //Лучше сделать id таким, чтобы его легко было потом набирать. Типа "x_y"
    field_cube.setAttribute("id", coordinate_of_id[i]);

    //Комментированный код без пояснений - Ъуъ
    // field_cube.style.width = "10";
    // field_cube.style.height = "10";
    // field_cube.style.border("solid black 2px");
    game_field.appendChild(field_cube);
  }
}
//fiEld - aaaaaa!!!
create_game_fild(400);

//Пусть эта функция принимает x, y - размеры поля
//А выдает просто строку - id квадратика, который нужно покрасить
function show_aim_cube() {
  //х может принимать значения от 0 до 19. А надо, от 0 до высоты поля 
  //Если я захочу создать поле 25 на 25 - подкраска будет только в нижнем углу
  let x = Math.floor(Math.random() * 19);
  //y принимает значения от 65 до 1
  let y = String.fromCharCode(Math.floor(Math.random() * 19 + 65));
  let coordinate = y + x;
  //консольных логов после того как закончил работу не должно быть - 
  // это только для того, чтобы тебе отладить что-то
  console.log(coordinate);
  if (score === 0) {
    score++;
    return change_color(coordinate);
  } else change_color_to_grey(old_cord);
  score++;
  change_color(coordinate);
}

// Не оставляй комментированный зря код
// show_aim_cube();

function change_color(coord) {
  old_cord = coord;
  document.getElementById(coord).style.backgroundColor = "red";
}
function change_color_to_grey(past_cord) {
  document.getElementById(past_cord).style.backgroundColor = "grey";
}
