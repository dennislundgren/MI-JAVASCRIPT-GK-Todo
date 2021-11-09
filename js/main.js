class Todo {
  constructor(value, status) {
    this.id = uniqueId;
    this.value = value;
    this.status = status;
  }
}

let volumeOnOff = document.createElement("div");
let volume = localStorage.getItem("volume");
volume = JSON.parse(volume);
volumeOnOff.classList.add("volume");

if (volume || volume == null) {
  volume = true;
  volumeOnOff.setAttribute("onclick", "mute()");
  volumeOnOff.innerHTML = "<i class='fas fa-volume-up'></i>";
} else if (!volume) {
  volume = false;
  volumeOnOff.innerHTML = "<i class='fas fa-volume-mute'></i>";
  volumeOnOff.setAttribute("onclick", "unMute()");
}

document.body.appendChild(volumeOnOff);

function mute() {
  volume = false;
  volumeOnOff.innerHTML = "<i class='fas fa-volume-mute'></i>";
  volumeOnOff.setAttribute("onclick", "unMute()");
  localStorage.setItem("volume", false);
}

function unMute() {
  volume = true;
  volumeOnOff.innerHTML = "<i class='fas fa-volume-up'></i>";
  volumeOnOff.setAttribute("onclick", "mute()");
  localStorage.setItem("volume", true);
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

let uniqueId;
setInterval(() => {
  uniqueId = Date.now();
}, 1);

let myList = document.createElement("div");
let todoContainer = document.createElement("div");
let todoInput = document.createElement("input");
let removeTodoButton = document.createElement("button");
let doneTodoButton = document.createElement("button");
// let pDate = document.createElement("div");
let chevronUp = document.createElement("div");
let chevronDown = document.createElement("div");
// pDate.classList.add("date");

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
todoContainer.appendChild(chevronUp);
todoContainer.appendChild(chevronDown);
// todoContainer.appendChild(pDate);
todoContainer.appendChild(todoInput);
todoContainer.appendChild(doneTodoButton);
todoContainer.appendChild(removeTodoButton);

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
    myList.appendChild(todoClone);
  }
}

function eraseList() {
  for (let i = 3; i < document.body.childElementCount; i++) {
    document.body.removeChild(document.getElementsByTagName("div")[i]);
  }
}

addInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    add();
  }
});

function update() {
  localStorage.setItem("Todo_List", JSON.stringify(todoList));
}

function add() {
  let audio = new Audio("./audio/cool.mp3");
  if (volume) {
    audio.play();
  } else {
  }
  addValue = new Todo(addInput.value, "todo");
  todoList.push(addValue);
  addInput.value = "";
  update();
  displayList();
}

function change(e) {
  let audio = new Audio("./audio/blow.mp3");
  if (volume) {
    audio.play();
  } else {
  }
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
  let audio = new Audio("./audio/nice.mp3");
  if (volume) {
    audio.play();
  } else {
  }
  let id = e.parentNode.id;
  for (let i = 0; i < todoList.length; i++) {
    if (id == todoList[i].id) {
      todoList[i].status = "done";
      e.parentNode.classList.add("done");
      e.parentNode.classList.remove("todo");
      e.innerHTML = "<i class='fas fa-plus'></i>";
      e.setAttribute("onclick", "returnTodo(this)");
    }
  }
  update();
  displayList();
}

function returnTodo(e) {
  let audio = new Audio("./audio/shh.mp3");
  if (volume) {
    audio.play();
  } else {
  }
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
  let audio = new Audio("./audio/snap.mp3");
  if (volume) {
    audio.play();
  } else {
  }
  let id = parseInt(e.parentNode.id);
  for (let i = 0; i < todoList.length; i++) {
    if (id === todoList[i].id) {
      todoList.splice(i, 1);
    }
  }
  update();
  // e.parentNode.remove();
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
