const insForm = document.querySelector(".form-ins");
const ingForm = document.querySelector(".form-ing");
const insInput = document.querySelector(".ins-input");
const ingInput = document.querySelector(".ing-input");
let insI = 1;
let ingI = 1;

const addItem = id => {
  const li = document.createElement("li");
  if (id === "ins") {
    insI++;
    let newInput = insInput.cloneNode();
    newInput.placeholder = `Step ${insI}`;
    newInput.value = null;
    insInput.parentNode.appendChild(newInput);
  } else {
    ingI++;
    let newInput = ingInput.cloneNode();
    newInput.placeholder = `Ingredient ${ingI}`;
    newInput.value = null;
    ingInput.parentNode.appendChild(newInput);
  }
};
