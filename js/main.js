class Todo {
  constructor(value, status) {
    this.id = Date.now();
    this.value = value;
    this.status = status;
    this.important = "";
  }
}

let addContainer = document.createElement("div");
let addInput = document.createElement("input");
let addButton = document.createElement("button");

addContainer.classList.add("container", "add");
addInput.setAttribute("placeholder", "To do... (max 30 characters)");
addInput.setAttribute("autofocus", "");
addInput.setAttribute("maxlength", "30");
addButton.setAttribute("onclick", "add()");
addButton.innerHTML = "<i class='fas fa-plus'></i>";
addContainer.appendChild(addInput);
addContainer.appendChild(addButton);
document.body.appendChild(addContainer);

let myList = document.createElement("section");
let todoContainer = document.createElement("div");
let todoInput = document.createElement("input");
let removeTodoButton = document.createElement("button");
let doneTodoButton = document.createElement("button");
let chevronUp = document.createElement("div");
let chevronDown = document.createElement("div");
let importantButton = document.createElement("button");

myList.classList.add("myList");
todoContainer.classList.add("container");
todoInput.removeAttribute("placeholder");
addInput.setAttribute("maxlength", "30");
removeTodoButton.setAttribute("onclick", "remove(this)");
removeTodoButton.innerHTML = "<i class='fas fa-minus'></i>";
doneTodoButton.setAttribute("onclick", "done(this)");
doneTodoButton.innerHTML = "<i class='fas fa-check'></i>";
chevronUp.innerHTML = "<i class='fas fa-chevron-up'></i>";
chevronDown.innerHTML = "<i class='fas fa-chevron-down'></i>";
chevronUp.classList.add("chevron");
chevronDown.classList.add("chevron");
chevronUp.setAttribute("onclick", "moveUp(this)");
chevronDown.setAttribute("onclick", "moveDown(this)");
importantButton.setAttribute("onclick", "important(this)");
importantButton.innerHTML = "<i class='fas fa-exclamation'></i>";
todoContainer.appendChild(chevronUp);
todoContainer.appendChild(chevronDown);
todoContainer.appendChild(todoInput);
todoContainer.appendChild(doneTodoButton);
todoContainer.appendChild(removeTodoButton);
todoContainer.appendChild(importantButton);

let returnAddButton = document.createElement("button");
returnAddButton.innerHTML = "<i class='fas fa-plus'></i>";

let todoList = [];
let localStorageArray = localStorage.getItem("Todo_List");
localStorageArray = JSON.parse(localStorageArray);

if (localStorageArray != null) {
  for (let i = 0; i < localStorageArray.length; i++) {
    todoList.push(localStorageArray[i]);
  }
  displayList();
}

addInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    add();
  }
});

function displayList() {
  myList.innerHTML = "";
  document.body.appendChild(myList);
  for (let i = 0; i < todoList.length; i++) {
    let pDate = document.createElement("div");
    let todoId = todoList[i].id;
    pDate.classList.add("date");
    let formatDate = new Date(todoId).toLocaleString();
    pDate.innerHTML = formatDate;
    let todoValue = todoList[i].value;
    todoInput.setAttribute("value", todoValue);
    todoInput.setAttribute("onchange", "change(this)");
    let todoClone = todoContainer.cloneNode(true);
    todoClone.appendChild(pDate);
    let todoCloneButton = todoClone.querySelector("button");
    if (todoList[i].status == "done") {
      todoCloneButton.innerHTML = "<i class='fas fa-plus'></i>";
      todoCloneButton.setAttribute("onclick", "returnTodo(this)");
    } else if (todoList[i].status == "todo") {
      todoCloneButton.innerHTML = "<i class='fas fa-check'></i>";
    }
    todoClone.setAttribute("id", todoId);
    todoClone.classList.add(todoList[i].status);
    if (todoList[i].important == "" || todoList[i].status == "done") {
    } else {
      todoClone.classList.add(todoList[i].important);
    }
    myList.appendChild(todoClone);
  }
}

function eraseList() {
  for (let i = 3; i < document.body.childElementCount; i++) {
    document.body.removeChild(document.getElementsByTagName("div")[i]);
  }
}

function update() {
  localStorage.setItem("Todo_List", JSON.stringify(todoList));
}

function add() {
  addValue = new Todo(addInput.value, "todo");
  todoList.push(addValue);
  addInput.value = "";
  update();
  displayList();
}

function change(e) {
  let id = e.parentNode.id;
  for (let i = 0; i < todoList.length; i++) {
    if (id == todoList[i].id) {
      todoList[i].value = e.value;
    }
  }
  update();
  displayList();
}

function done(e) {
  let id = e.parentNode.id;
  for (let i = 0; i < todoList.length; i++) {
    if (id == todoList[i].id) {
      todoList[i].status = "done";
      todoList[i].important = "";
      e.parentNode.classList.add("done");
      e.parentNode.classList.remove("todo");
      e.parentNode.classList.remove("important");
      e.innerHTML = "<i class='fas fa-plus'></i>";
      e.setAttribute("onclick", "returnTodo(this)");
    }
  }
  update();
  displayList();
}

function returnTodo(e) {
  let id = e.parentNode.id;
  for (let i = 0; i < todoList.length; i++) {
    if (id == todoList[i].id) {
      todoList[i].status = "todo";
      e.parentNode.classList.add("todo");
      e.parentNode.classList.remove("done");
      e.innerHTML = "<i class='fas fa-check'></i>";
      e.setAttribute("onclick", "done(this)");
    }
  }
  update();
  displayList();
}

function remove(e) {
  let id = parseInt(e.parentNode.id);
  for (let i = 0; i < todoList.length; i++) {
    if (id === todoList[i].id) {
      todoList.splice(i, 1);
    }
  }
  update();
  displayList();
}

function moveUp(e) {
  let id = e.parentNode.id;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i] == null) {
      break;
    } else if (id == todoList[i].id && todoList[i - 1] != null) {
      let temp = todoList[i - 1];
      todoList[i - 1] = todoList[i];
      todoList[i] = temp;

      console.log(temp);
      break;
    }
  }
  update();
  displayList();
}

function moveDown(e) {
  let id = e.parentNode.id;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i] == null) {
      break;
    } else if (id == todoList[i].id && todoList[i + 1] != null) {
      let temp = todoList[i + 1];
      todoList[i + 1] = todoList[i];
      todoList[i] = temp;

      break;
    }
  }
  update();
  displayList();
}

function important(e) {
  let id = e.parentNode.id;
  for (let i = 0; i < todoList.length; i++) {
    if (id == todoList[i].id && todoList[i].status != "done") {
      if (todoList[i].important == "") {
        todoList[i].important = "important";
        e.parentNode.classList.add("important");
      } else if (todoList[i].important == "important") {
        todoList[i].important = "";
        e.parentNode.classList.remove("important");
      }
    }
  }
  console.log(e.parentNode.classList);
  update();
  displayList();
}
