/*

Skapa en Todo-lista:
    Använd input-fält för att lagra todo-värden och presentera dessa 
    med hjälp utav p-element.

    Spara värdena i en lista av objekt.

    Generera all HTML i javascriptet.

*/
let container = document.createElement("div");
container.setAttribute("class", "container");
document.body.appendChild(container);

let input = document.createElement("input");
input.setAttribute("autofocus", null);
document.body.appendChild(input);

let inp = document.querySelector("input");
let inpStyle = window.getComputedStyle(inp);
