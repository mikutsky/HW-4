//ЗАДАНИЕ №1
//-----------------------------------------------------------------------------
//Создать функцию, которая принимает два элемента. Функция проверяет, является
//ли первый элемент родителем для второго:
// isParent(parent, child);
// isParent(document.body.children[0], document.querySelector('mark'));
// → true так как первый див является родительским элементом для mark
// isParent(document.querySelector('ul'), document.querySelector('mark'));
// → false так ul НЕ является родительским элементом для mark
//Функция принимает только DOM объекты.

function isParent(parent, child) {
  if (!(parent instanceof HTMLElement) || !(child instanceof HTMLElement))
    return console.error("isParent(): Some arguments is not DOM object.");

  if (child.parentElement === parent) return true;
  if (child.parentElement) return isParent(parent, child.parentElement);
  return false;
}

console.log(
  isParent(document.body.children[0], document.querySelector("mark"))
);
console.log(
  isParent(document.querySelector("ul"), document.querySelector("mark"))
);

//ЗАДАНИЕ №2
//-----------------------------------------------------------------------------
//Получить список всех ссылок, которые не находятся внутри списка ul
const arrAOutUL = Array.from(document.links).filter(a => !a.closest("ul"));
console.log(arrAOutUL);

//ЗАДАНИЕ №3
//-----------------------------------------------------------------------------
//Найти элемент, который находится перед и после списка ul
const elBeforeUl = document.querySelector("ul").previousElementSibling;
const elAfterUl = document.querySelector("ul").nextElementSibling;

console.dir(elBeforeUl);
console.dir(elAfterUl);

//ЗАДАНИЕ №4
//-----------------------------------------------------------------------------
//Дан массив пользователей, его можно скопировать отсюда из первой задачи,
//создать таблицу вида:
// (КАРТИНКА из презентации)
//Условия:
//- В конце таблицы обязательно последняя tr должна содержать total balance всех
//пользователей из таблицы при этом он должен быть всегда выровнен по правому
//краю.
//- Количество пользователей может быть любым.
//- Таблица и все ее содержимое должно создаваться через js, в разметке у вас
//может быть только контейнер какой то.
//- В коде у вас должна быть переменная которая будет содержать в виде объекта
//список полей и заголовков th которые будут выводиться в таблице. Что то типа
//{ name: ‘Name’, email: ‘Email’... } соответственно ключ объекта это ваше поле
//которое вы хотите вывести из объекта пользователя а значение это заголовок th.

const users = [
  {
    _id: "5d220b10e8265cc978e2586b",
    isActive: true,
    balance: 2853.33,
    age: 20,
    name: "Buckner Osborne",
    gender: "male",
    company: "EMPIRICA",
    email: "bucknerosborne@empirica.com",
    phone: "+1 (850) 411-2997",
    registered: "2018-08-13T04:28:45 -03:00",
    nestedField: { total: 300 }
  },
  {
    _id: "5d220b10144ef972f6c2b332",
    isActive: true,
    balance: 1464.63,
    age: 38,
    name: "Rosalie Smith",
    gender: "female",
    company: "KATAKANA",
    email: "rosaliesmith@katakana.com",
    phone: "+1 (943) 463-2496",
    registered: "2016-12-09T05:15:34 -02:00",
    nestedField: { total: 400 }
  },
  {
    _id: "5d220b1083a0494655cdecf6",
    isActive: false,
    balance: 2823.39,
    age: 40,
    name: "Estrada Davenport",
    gender: "male",
    company: "EBIDCO",
    email: "estradadavenport@ebidco.com",
    phone: "+1 (890) 461-2088",
    registered: "2016-03-04T03:36:38 -02:00",
    nestedField: { total: 200 }
  }
];

const tableFields = {
  _id: "#",
  name: "Name",
  email: "Email",
  balance: "Balance"
};
const tblContainer = document.querySelector("#table-users-total-balance");

function createTabelUsers(tableFields, users) {
  let rowIndex = 0;
  let totalBalance = 0;

  const table = document.createElement("table");
  table.className = "table m-2";
  table.style.width = "960px";
  const thead = table.appendChild(document.createElement("thead"));
  thead.className = "thead-dark";

  //Верхняя строка. Заполняем заголовки столбцов
  const trHeader = thead.appendChild(document.createElement("tr"));
  for (const field in tableFields) {
    const th = trHeader.appendChild(document.createElement("th"));
    th.textContent = tableFields[field];
  }

  //Перебираем массив пользователей и полей. Создаем ячейки и заполняем
  //соответствующими данными. id заполняем порядковым номером,
  //считаем общий баланс
  for (const user of users) {
    rowIndex++;
    const tr = thead.appendChild(document.createElement("tr"));
    for (const field in tableFields) {
      const td = tr.appendChild(document.createElement("td"));
      if (user.hasOwnProperty(field)) td.textContent = user[field];
      switch (field) {
        case "_id":
          td.textContent = rowIndex;
          break;
        case "balance":
          totalBalance += user[field];
          break;
      }
    }
  }

  //Нижняя строка. Создаем строку и ячейку с общим балансом
  const tdTotal = thead
    .appendChild(document.createElement("tr"))
    .appendChild(document.createElement("td"));
  tdTotal.setAttribute("colspan", Object.keys(tableFields).length);
  tdTotal.parentElement.style.textAlign = "right";
  tdTotal.textContent = "Total balance: " + String(totalBalance.toFixed(2));

  //Возвращаем фрагмент с созданной таблицей
  return document.createDocumentFragment().appendChild(table);
}

tblContainer.appendChild(createTabelUsers(tableFields, users));

//ЗАДАНИЕ №5
//-----------------------------------------------------------------------------
//По нажатию на кнопку "btn-msg" должен появиться алерт с тем текстом который
//находится в атрибуте data-text у кнопки.

const btnMsg = document.querySelector("#btn-msg");
btnMsg.addEventListener("click", el => {
  return alert(el.srcElement.dataset.text);
});

//ЗАДАНИЕ №6
//-----------------------------------------------------------------------------
//При нажатии на любой узел документа показать в элементе с id=tag имя тега
//нажатого элемента.

const idTag = document.querySelector("#tag");
document.addEventListener(
  "click",
  el => (idTag.textContent = el.srcElement.tagName)
);

//ЗАДАНИЕ №7
//-----------------------------------------------------------------------------
//Из презентации “Занятие 7 - Манипуляция DOM. Работа с атрибутами.” дополнить
//функционал для таблицы из задачи 6. Создать кнопку которая будет при клике
//сортировать пользователей по возрастанию или убыванию поля balance при этом
//в кнопке должна показываться стрелка в какую сторону сейчас отсортированы
//пользователи. Иконки можете взять с font awesome, в качестве фреймворка
//использовался bootstrap.

const toSortTable = (function() {
  let SortType = false;

  return function(el) {
    let sortUsers = [];

    //получаем первые дочерний тэг <I>
    const icnEl = Array.from(el.srcElement.children).filter(
      e => e.tagName === "I"
    )[0];
    //делаем <I> видемым
    if (icnEl.style.display) {
      icnEl.style.display = "";
    }
    //сортируем пользователей по балансу
    switch (SortType) {
      case true:
        SortType = false;
        icnEl.className = "fas fa-sort-amount-up ml-2";
        sortUsers = users.sort((elA, elB) => elB.balance - elA.balance);
        break;
      case false:
        SortType = true;
        icnEl.className = "fas fa-sort-amount-down ml-2";
        sortUsers = users.sort((elA, elB) => elA.balance - elB.balance);
        break;
    }
    //удаляем старую таблицу, генерируем и добавляем новую
    tblContainer.lastChild.remove();
    tblContainer.appendChild(createTabelUsers(tableFields, sortUsers));
  };
})();

const icnSort = document.createElement("i");
icnSort.style.display = "none";
icnSort.className = "fas fa-sort-amount-down ml-2";

const btnSort = document.createElement("button");
btnSort.type = "button";
btnSort.className = "btn btn-primary btn-sm m-2 pr-2";
btnSort.textContent = "Sort by Balance";

btnSort.appendChild(icnSort);
tblContainer.insertAdjacentElement("afterbegin", btnSort);

btnSort.addEventListener("click", toSortTable);
