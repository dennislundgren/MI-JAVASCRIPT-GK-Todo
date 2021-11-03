let container = document.createElement("div");
let input = document.createElement("input");
let button = document.createElement("button");
container.classList.add("container", "add");
input.setAttribute("placeholder", "To do...");
button.setAttribute("onclick", "add()");
button.innerHTML = "Press me";
container.appendChild(input);
container.appendChild(button);

document.body.appendChild(container);

let containers = [container];
let len = containers.length;

function add() {
  let value = input.value;
  containers.push(container.cloneNode(true));
  document.body.appendChild(containers[len]);
  let b = containers[len].querySelector("button");
  let n = containers[len].querySelector("input");
  b.setAttribute("onclick", "remove(this)");
  b.innerHTML = "Remove";
  n.removeAttribute("placeholder");
  n.setAttribute("value", value);
  n.style.border = "none";
  containers[len].classList.remove("add");
  containers[len].classList.add("todo");
  len++;
  input.value = null;
}

function remove(e) {
  e.parentNode.remove();
  len--;
}

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
