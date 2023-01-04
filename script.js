//states
const todos = [];

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
