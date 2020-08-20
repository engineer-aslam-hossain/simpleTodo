/////////// selectors ///////

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

///////////event listeners //////////////
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOptions.addEventListener("click", filterTodo);
///////////functions //////////////

function addTodo(e) {
    e.preventDefault();

    //// todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.innerHTML = `

    <li class="todo-item">${todoInput.value}</li>
    <button class="complete-button"><i class="fas fa-check"></i></i></button>
    <button class="trash-button"><i class="fas fa-trash"></i></i></button>
    
    `;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
}

function deleteTodo(e) {
    const item = e.target;
    //////////// delete todo
    if (item.classList[0] == "trash-button") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    /////////// check todo
    if (item.classList[0] == "complete-button") {
        const todo = item.parentElement;
        todo.classList.add("completed");
    }
}

/////////////// filter todo ////////////////

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.innerHTML = `

    <li class="todo-item">${todo}</li>
    <button class="complete-button"><i class="fas fa-check"></i></i></button>
    <button class="trash-button"><i class="fas fa-trash"></i></i></button>
    
    `;
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}