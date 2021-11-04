let addContainer = document.createElement("div");
let addInput = document.createElement("input");
let addButton = document.createElement("button");

addContainer.classList.add("container", "add");
addInput.setAttribute("placeholder", "To do...");
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
doneTodoButton.setAttribute("onclick", "done()");
doneTodoButton.innerHTML = "<i class='fas fa-check'></i>";
todoContainer.appendChild(todoInput);
todoContainer.appendChild(doneTodoButton);
todoContainer.appendChild(removeTodoButton);

let idArray = [];

for (let j = 0; j < localStorage.length; j++) {
  idArray.push(localStorage.key(j));
  // let todoId = localStorage.key(j);
  // console.log(todoId);
  // let todoValue = localStorage.getItem(todoId);
  // todoInput.setAttribute("value", todoValue);
  // let todoClone = todoContainer.cloneNode(true);
  // document.body.appendChild(todoClone);
}

idArray.sort();

for (let i = 0; i < idArray.length; i++) {
  let todoId = idArray[i];
  console.log(todoId);
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

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .

// function add() {
//   containers.push(container.cloneNode(true));
//   let value = input.value;
//   values.push(value);
//   let b = containers[len].querySelector("button");
//   let n = containers[len].querySelector("input");
//   b.setAttribute("onclick", "remove(this)");
//   b.innerHTML = "<i class='fas fa-minus'></i>";
//   n.removeAttribute("placeholder");
//   n.setAttribute("value", value);
//   n.style.border = "none";
//   containers[len].classList.remove("add");
//   containers[len].classList.add("todo");
//   document.body.appendChild(containers[len]);
//   input.value = null;

//   for (let i = 0; i < containers.length; i++) {
//     console.log(containers[i]);
//   }
// }

// for (let i = 1; i < 5; i++) {
//   containers.push(container.cloneNode(true));
//   containers[i].classList.add("todo");
//   let n = containers[i].querySelector("input");
//   let b = containers[i].querySelector("button");
//   n.setAttribute("value", "Hej");
//   n.removeAttribute("placeholder");
//   b.setAttribute("class", "done");
//   document.body.appendChild(containers[i]);
// }
