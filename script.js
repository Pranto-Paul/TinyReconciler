//states
const todos = [];

function createTodoElm(title, des, todoId) {
  //creating todo's elements
  const li = document.createElement("li");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const button = document.createElement("button");

  // adding attributes to those elements
  li.classList.add("todo");
  li.id = todoId;
  button.setAttribute("onClick", `deleteTodo(${todoId})`);

  //adding childs to those elements
  h2.innerText = title;
  p.innerText = des;
  button.innerText = "Delete";

  //appneding childs of li
  li.appendChild(h2);
  li.appendChild(p);
  li.appendChild(button);

  return li;
}

function deleteTodoFromDom(todoId) {
  document.getElementById(itmeId).remove();
}
