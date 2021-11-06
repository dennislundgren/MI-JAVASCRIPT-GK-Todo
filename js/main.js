let addContainer = document.createElement("div");
let addInput = document.createElement("input");
let addButton = document.createElement("button");

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

let todoContainer = document.createElement("div");
let todoInput = document.createElement("input");
let removeTodoButton = document.createElement("button");
let doneTodoButton = document.createElement("button");

todoContainer.classList.add("container", "todo");
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
  todoInput.setAttribute("value", todoValue);
  removeTodoButton.setAttribute("id", todoId);
  let todoClone = todoContainer.cloneNode(true);
  document.body.appendChild(todoClone);
}

window.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    add();
  }
});

function add() {
  localStorage.setItem(uniqueId, addInput.value);
  addInput.value = "";
  let todoId = uniqueId;
  let todoValue = localStorage.getItem(todoId);
  todoInput.setAttribute("value", todoValue);
  removeTodoButton.setAttribute("id", todoId);
  let todoClone = todoContainer.cloneNode(true);
  document.body.appendChild(todoClone);
}

function remove(e) {
  localStorage.removeItem(e.id);
  e.parentNode.remove();
}

function done(e) {
  e.parentNode.classList.add("done");
  e.parentNode.classList.remove("todo");
  e.parentNode.querySelector("input").value;
  e.innerHTML = "<i class='fas fa-plus'></i>";
  e.setAttribute("onclick", "returnTodo(this)");
}

function returnTodo(e) {
  e.parentNode.classList.remove("done");
  e.parentNode.classList.add("todo");
  e.innerHTML = "<i class='fas fa-check'></i>";
  e.setAttribute("onclick", "done(this)");
}
