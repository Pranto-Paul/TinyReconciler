//states
let todos = [];

const todoContainer = document.getElementById("todos");

function addTodo(newTodo) {
  const oldTodos = todos;
  const newTodos = [...todos, newTodo];
  todos = newTodos;
  findDiff(oldTodos, newTodos);
}

function toggleTodo(todoId) {
  const oldTodos = todos;
  const newTodos = todos.map((todoItem) =>
    todoItem.id === todoId ? { ...todoItem, done: !todoItem.done } : todoItem,
  );
  todos = newTodos;
  findDiff(oldTodos, newTodos);
}

function deleteTodo(todoId) {
  const oldTodos = todos;
  const newTodos = todos.filter((todoItem) => todoItem.id !== todoId);
  todos = newTodos;
  findDiff(oldTodos, newTodos);
}

function findDiff(oldTodos, newTodos) {
  // compare the oldTodos with the newTodos
  //for ADD & UPDATE
  newTodos.forEach((newTodo) => {
    const exists = oldTodos.find((oldTodo) => oldTodo.id === newTodo.id);
    // if newTodos are added then addThem in todos
    if (!exists) {
      const todoElement = createTodoElment(newTodo);
      todoContainer.appendChild(todoElement);
      return;
    }
    // if any property update in existing todos then only update the property of the object inside todos dom
    if (newTodo.title !== exists.title) {
      const element = document.querySelector(`[data-id="${newTodo.id}"]`);
      const titleElement = element.querySelector("h2");
      titleElement.innerText = newTodo.title;
    }
    if (newTodo.des !== exists.des) {
      const element = document.querySelector(`[data-id="${newTodo.id}"]`);
      const desElemtn = element.querySelector("p");
      desElemtn.innerText = newTodo.des;
    }
    if (newTodo.done !== exists.done) {
      const element = document.querySelector(`[data-id="${newTodo.id}"]`);
      const checkbox = element.querySelector(".todo-check");
      checkbox.checked = newTodo.done;
      element.classList.toggle("done", newTodo.done);
    }
  });
}

function createTodoElment(todo) {
  //creating todo's elements
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const body = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const button = document.createElement("button");

  // adding attributes to those elements
  li.classList.add("todo");
  li.dataset.id = todo.id;
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;
  checkbox.classList.add("todo-check");
  checkbox.addEventListener("change", (e) => {
    toggleTodo(todo.id);
  });
  button.addEventListener("click", (e) => {
    deleteTodo(todo.id);
  });
  body.classList.add("todo-body");

  //adding childs to those elements
  h2.innerText = todo.title;
  p.innerText = todo.des;
  button.innerText = "Delete";

  body.appendChild(h2);
  body.appendChild(p);

  //appneding childs of li
  li.appendChild(checkbox);
  li.appendChild(body);
  li.appendChild(button);

  return li;
}

function deleteTodoFromDom(todoId) {
  document.getElementById(itmeId).remove();
}
