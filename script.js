// const bgImage = document.querySelector("#bg-image");
const themeBtn = document.querySelector("#theme-btn");
const todoInput = document.querySelector("#todo-input input");
const todoForm = document.querySelector("#todo-input");

const todosCont = document.querySelector("#todos");

const counterEl = document.querySelector("#counter");

const body = document.querySelector("body");

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const dbTodos = JSON.parse(localStorage.getItem("todos")) || [];

  if (todoInput.value === "" || todoInput.value.length < 3) {
    alert("Please enter a valid input");

    return;
  }

  dbTodos.push(todoInput.value);
  todoInput.value = "";

  localStorage.setItem("todos", JSON.stringify(dbTodos));

  showTodos();
});

function showTodos() {
  todosCont.innerHTML = "";

  const dbTodos = JSON.parse(localStorage.getItem("todos"));
  counterEl.textContent = dbTodos.length;

  dbTodos?.map((item, i) => {
    let todoEl = document.createElement("li");

    let todoELClassStr =
      "flex justify-between w-full gap-4 items-center p-4 shadow-2xl text-base text-slate-600 dark:text-slate-400 custom-shadow bg-slate-200 dark:bg-slate-800 border-b-[.5px] dark:border-slate-400 border-slate-400";

    for (let className of todoELClassStr.split(" ")) {
      if (className !== "") {
        todoEl.classList.add(className);
      }
    }

    todoEl.innerHTML = ` 
          <div class="">
            <div class=""></div>
            <p class="">${item}</p>
          </div>
          <button id=${i}>X</button>
         `;

    todosCont.appendChild(todoEl);

    todoEl.querySelector("button").addEventListener("click", (e) => {
      const newTodos = dbTodos.filter((item, i) => {
        return i != e.target.id;
      });

      console.log("Sime", e.target.id);

      localStorage.setItem("todos", JSON.stringify(newTodos));

      showTodos();
    });
  });
}

showTodos();

tailwind.config = {
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
      },
    },
  },
};
