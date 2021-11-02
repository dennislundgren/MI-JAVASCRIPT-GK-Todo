/*

Skapa en Todo-lista:
    Använd input-fält för att lagra todo-värden och presentera dessa 
    med hjälp utav p-element.

    Spara värdena i en lista av objekt.

    Generera all HTML i javascriptet.

*/

let createInput = document.createElement("input");
createInput.setAttribute("autofocus", null);
document.body.appendChild(createInput);

let inp = document.querySelector("input");
let inpStyle = window.getComputedStyle(inp);

console.log(inpStyle);
