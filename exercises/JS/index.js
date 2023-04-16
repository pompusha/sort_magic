var array = [];
var obj = {};

var data_base = {
  "Clown" : {
      "dept" : 0,
      "discaunt" : 10,
      "disc_card_id" : 443113123
    },
    "DamaPick" : {
      "dept" : 10000,
      "discaunt" : 0,
      "disc_card_id" : 43424123
    },
    "Neznayka" : {
      "dept" : 2000,
      "discaunt" : 50,
      "disc_card_id" : 443113123
    }
}

var example = [
  {"name": "Clown",
   "age" : 45,
   "money" : 8000,
   "comment" : "Очень странный чувак с красным носом",
   "cart" : [
              {
                "id" : 437684671,
                "name" : "Красный нос",
                "price" : 1000
              },
              {
                "id" : 4371231241,
                "name" : "Парик",
                "price" : 21000
              }
            ]
  },
  {"name": "DamaPick",
   "age" : 19,
   "money" : 300,
   "comment" : "Симпотная, но тупая",
   "cart" : []
  },
  {"name": "Neznayka",
   "age" : 25,
   "money" : 50,
   "comment" : "Тупой, но симпотный",
   "cart" : [
    {
      "id" : 12431451234,
      "name" : "Букварь",
      "price" : 100
    }
  ]
  },
  {"name": "Znayka",
   "age" : 30,
   "money" : 10000,
   "comment" : "Не тупой, не симпотный",
   "cart" : [
    {
      "id" : 314553123,
      "name" : "Бертолева соль",
      "price" : 8000
    },
    {
      "id" : 4371231241,
      "name" : "Марганцовка",
      "price" : 2000
    }
  ]
  }
]

//filter - return []. Только отбирает объекты по каким-то признакам - без изменений самих объектов.
res_filter_1 = example.filter((obj) => {return obj.money < 1000});

res_filter_2 = example.filter((obj) => {return obj.comment.match(".*[Тт]{1}уп.*")});

//forEach - void Только для отладки логами или изменения нескольких полей в существующих объектах
res_forEach_1 = example.forEach((obj) => {console.log(obj.name)});

//map - return [] - для преобразования массива в более удобный массив
res_map_1 = example.map((obj) => {return obj});
example[0].age = 1000;

res_map_2 = example.map((obj) => {return obj.age});
example[0].age = 2000;

res_map_3 = example.map((obj) => {return [{"age" : obj.age}]})
example[0].age = 3000;

res_map_4 = example.map((obj) => {return obj.name})

let res_fake_map_5 = [];
for(obj of example) {
  res_fake_map_5.push(obj.name);
}

//reduce - return accum. - для проведения каких-то итогов массива. Суммы, единого объекта статистики
res_reduce_1 = example.reduce((acc, obj) => {
  if (obj.money > 9000) {
    acc.rich.push(obj.name);
  } else {
    acc.bomg.push(obj.name);
  }
  return acc;
},
{"bomg": [], "rich": []});


//Примеры
//Задание 1: вывести имена всех покупателей в качестве ключа с той суммой, которой им не хватает на кассе в качестве значения
task1_brekpoint_1 = example.map((full_buyer) => {
                    return {
                              "name": full_buyer.name,
                              "money" : full_buyer.money,
                              "cart_summ" : full_buyer.cart.reduce((acc, good) => {return acc + good.price}, 0)
                            }
                    });

task1_brekpoint_2 = example.map((full_buyer) => {
                    return {
                              "name": full_buyer.name,
                              "money" : full_buyer.money,
                              "cart_summ" : full_buyer.cart.reduce((acc, good) => {return acc + good.price}, 0)
                            }
                    })
                    .filter((buyer_need_m) => {return buyer_need_m.money < buyer_need_m.cart_summ}); 

task1_result = example.map((full_buyer) => {
          return {
                    "name": full_buyer.name,
                    "money" : full_buyer.money,
                    "cart_summ" : full_buyer.cart.reduce((acc, good) => {return acc + good.price}, 0)
                  }
          })
           .filter((buyer_need_m) => {return buyer_need_m.money < buyer_need_m.cart_summ})
           .reduce((acc, buyer) => {
              acc[buyer.name] = buyer.cart_summ - buyer.money; 
              return acc}, 
            {});

//Задание 2: Вывести всех людей, которые могут купить свою карзину с учетом скидок - массив имен
task2_result = example.filter((buyer) => {
            console.log(`client_name = ${buyer.name}`)
            
            all_cost = buyer.cart.reduce((acc, good) => {return acc + good.price}, 0);
            console.log(`all cost = ${all_cost}`)
            
            client = data_base[buyer.name];
            console.log(`client in base = ${client}`)
            disc = 0;
            if (client) {
              disc = client.discaunt
            }

            discount_cost = all_cost * (100 - disc) / 100;
            console.log(`cost with discount = ${discount_cost}`)
            console.log(`buyer.money = ${buyer.money}`)
           
            return buyer.money >= discount_cost;
          }
        ).map((obj) => {return obj.name})


//Задание на дом: Люди ломанулись к выходу по пожарной тревоге.
//Вывести массив объектов для полицейского отчета
//1) name - имя склеенное с номером клиентской карты
//2) sum - сумму, которую человек должен магазину с учетом его корзины
//3) description - описание примет с добавлением слов "Возраст obj.age"
//4) status - если человек может оплатить свой долг перед магазином с учетом корзины - то он "свидетель". Если нет - то он "преступник".