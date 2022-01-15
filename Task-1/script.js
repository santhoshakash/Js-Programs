 //selecting element from Dom
const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemsList = document.querySelector("#itemsList");
const filters = document.querySelectorAll(".nav-item");

//create a emptyitem list
let todoItems = [];

// const getlist;
const getList = function (todoItems) {
  itemsList.innerHTML = "";
  console.log("hi");
  if (todoItems.length > 0) {
    console.log("helow");
    todoItems.forEach((item) => {
      console.log(item.name);
      const liTag = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
              <span>${item.name}</span>
              <span>
                <a><i class="bi bi-check-circle green"></i></a>
                <a><i class="bi bi-pencil-square blue"></i></a>
                <a><i class="bi bi-x-circle red"></i></a>
              </span>
            </li>`;
      itemsList.insertAdjacentHTML("beforeend", liTag);
    });
  } else {
  }
};

//get item from local storage
const getLocalStorage = function () {
  const todoStorage = localStorage.getItem("todoitems");
  if (todoStorage === "undefined" || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
    console.log("hi");
  }
  console.log("items", todoItems);
  getList(todoItems);
};

//set in local storage
const setLocalStorage = function (todoItems) {
  localStorage.setItem("todoitems", JSON.stringify(todoItems));
  console.log(todoItems);
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemName = itemInput.value.trim();
    if (itemName.length === 0) {
      alert("Please Enter a Task...");
    } else {
      const itemObj = {
        name: itemName,
        isDone: false,
        addedAt: new Date().getTime(),
      };
      console.log(itemObj);
      todoItems.push(itemObj);
      console.log(todoItems);
      setLocalStorage(todoItems);
    }
  });
  getLocalStorage();

  console.log("hellow");
});
