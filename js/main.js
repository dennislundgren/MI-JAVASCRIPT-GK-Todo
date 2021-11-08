class Elements {
  constructor() {
    this.container = document.createElement("div");
    this.input = document.createElement("input");
    this.button = document.createElement("button");
    this.status = ["todo", "done"];
  }
}

let addContainer = new Elements().container;
let addInput = new Elements().input;
let addButton = new Elements().button;

addContainer.classList.add("container", "add");
addInput.setAttribute("placeholder", "To do...");
addInput.setAttribute("autofocus", "");
addButton.setAttribute("onclick", "add()");
addButton.innerHTML = "<i class='fas fa-plus'></i>";
addContainer.appendChild(addInput);
addContainer.appendChild(addButton);

document.body.appendChild(addContainer);

let uniqueId;
setInterval(() => {
  uniqueId = Date.now();
}, 1);

let todoContainer = new Elements().container;
let todoInput = new Elements().input;
let removeTodoButton = new Elements().button;
let doneTodoButton = new Elements().button;

todoContainer.classList.add("container");
todoInput.removeAttribute("placeholder");
removeTodoButton.setAttribute("onclick", "remove(this)");
removeTodoButton.innerHTML = "<i class='fas fa-minus'></i>";
doneTodoButton.setAttribute("onclick", "done(this)");
doneTodoButton.innerHTML = "<i class='fas fa-check'></i>";
todoContainer.appendChild(todoInput);
todoContainer.appendChild(doneTodoButton);
todoContainer.appendChild(removeTodoButton);

let returnAddButton = document.createElement("button");

returnAddButton.innerHTML = "<i class='fas fa-plus'></i>";

let idArray = [];

for (let i = 0; i < localStorage.length; i++) {
  idArray.push(localStorage.key(i));
}

idArray.sort();

for (let i = 0; i < idArray.length; i++) {
  let todoId = idArray[i];
  let todoValue = localStorage.getItem(todoId);
  todoValue = JSON.parse(todoValue);
  todoInput.setAttribute("value", todoValue.value);
  let todoClone = todoContainer.cloneNode(true);
  let todoCloneButton = todoClone.querySelector("button");
  console.log(todoCloneButton);
  if (todoValue.status == "done") {
    todoCloneButton.innerHTML = "<i class='fas fa-plus'></i>";
    todoCloneButton.setAttribute("onclick", "returnTodo(this)");
  } else if (todoValue.status == "todo") {
    todoCloneButton.innerHTML = "<i class='fas fa-check'></i>";
  }
  todoClone.setAttribute("id", todoId);
  todoClone.classList.add(todoValue.status);
  document.body.appendChild(todoClone);
}

window.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    add();
  }
});

function add() {
  let addValue = {
    value: addInput.value,
    status: "todo",
  };
  localStorage.setItem(uniqueId, JSON.stringify(addValue));
  addInput.value = "";
  let todoId = uniqueId;
  let todoValue = localStorage.getItem(todoId);
  todoValue = JSON.parse(todoValue);
  todoInput.setAttribute("value", todoValue.value);
  let todoClone = todoContainer.cloneNode(true);
  todoClone.setAttribute("id", todoId);
  document.body.appendChild(todoClone);
}

function remove(e) {
  localStorage.removeItem(e.parentNode.id);
  e.parentNode.remove();
}

function done(e) {
  let changeStatus = localStorage.getItem(e.parentNode.id);
  e.parentNode.classList.add("done");
  e.parentNode.classList.remove("todo");
  changeStatus = JSON.parse(changeStatus);
  changeStatus.status = "done";
  changeStatus = JSON.stringify(changeStatus);
  localStorage.setItem(e.parentNode.id, changeStatus);
  e.parentNode.querySelector("input").value;
  e.innerHTML = "<i class='fas fa-plus'></i>";
  e.setAttribute("onclick", "returnTodo(this)");
}

function returnTodo(e) {
  let changeStatus = localStorage.getItem(e.parentNode.id);
  e.parentNode.classList.add("todo");
  e.parentNode.classList.remove("done");
  changeStatus = JSON.parse(changeStatus);
  changeStatus.status = "todo";
  changeStatus = JSON.stringify(changeStatus);
  localStorage.setItem(e.parentNode.id, changeStatus);
  e.innerHTML = "<i class='fas fa-check'></i>";
  e.setAttribute("onclick", "done(this)");
}
