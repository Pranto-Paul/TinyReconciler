//states
let todos = [];

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

function findDiff(oldTodos, newTodos) {
  // compare the oldTodos with the newTodos
  // if newTodos are added then addThem in todos state and update the dom
  // if any property update in existing todos then only update the proper of those object inside todos state and update those only things inside dom
}

function createTodoElm(title, des, todoId) {
  //creating todo's elements
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const body = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const button = document.createElement("button");

  // adding attributes to those elements
  li.classList.add("todo");
  li.id = todoId;
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-check");
  checkbox.addEventListener("change", (e) => {
    e.target.closest(".todo").classList.toggle("done", e.target.checked);
  });
  body.classList.add("todo-body");
  button.setAttribute("onClick", `deleteTodo(${todoId})`);

  //adding childs to those elements
  h2.innerText = title;
  p.innerText = des;
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
