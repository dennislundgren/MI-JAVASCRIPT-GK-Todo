let container = document.createElement("div");
let input = document.createElement("input");
container.setAttribute("class", "container");
input.setAttribute("placeholder", "What to do...");
container.appendChild(input);

let containers = [container];
document.body.appendChild(container);

for (let i = 1; i < 5; i++) {
  containers.push(container.cloneNode(true));
  let n = containers[i].querySelector("input");
  n.setAttribute("value", "Hej");
  n.removeAttribute("placeholder");
  document.body.appendChild(containers[i]);
}
