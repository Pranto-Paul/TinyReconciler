import "./style.css";

type Todo = {
  id: string;
  title: string;
  des: string;
  done: boolean;
};

//states
let todos:Todo[] = [];

const todoContainer = document.getElementById("todos")!;
const submitBtn = document.querySelector(".submit-btn")!;
submitBtn.addEventListener("click", addTodo);



function addTodo() {
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const desInput = document.getElementById("description") as HTMLInputElement;

  const title = titleInput.value;
  const des = desInput.value;

  if(!title.trim() || !des.trim()) return

  const newTodo:Todo = {
    id: crypto.randomUUID(),
    title,
    des,
    done: false,
  };

  const oldTodos = todos;
  const newTodos = [...todos, newTodo];
  todos = newTodos;

  findDiff(oldTodos, newTodos);

  titleInput.value = "";
  desInput.value = "";
}

function toggleTodo(todoId: string) {
  const oldTodos = todos;
  const newTodos = todos.map((todoItem) =>
    todoItem.id === todoId ? { ...todoItem, done: !todoItem.done } : todoItem,
  );
  todos = newTodos;
  findDiff(oldTodos, newTodos);
}

function deleteTodo(todoId:string) {
  const oldTodos = todos;
  const newTodos = todos.filter((todoItem) => todoItem.id !== todoId);
  todos = newTodos;
  findDiff(oldTodos, newTodos);
}

function findDiff(oldTodos:Todo[], newTodos:Todo[]) {
  // compare the oldTodos with the newTodos
  //for ADD & UPDATE
  newTodos.forEach((newTodo) => {
    const exists = oldTodos.find((oldTodo) => oldTodo.id === newTodo.id);
    // if newTodos are added then addThem in todos
    if (!exists) {
      const todoElement = createTodoElement(newTodo);
      todoContainer.appendChild(todoElement);
      return;
    }
    // if any property update in existing todos then only update the property of the object inside todos dom
    const element = document.querySelector(
      `[data-id="${newTodo.id}"]`
    );
    if (!element) return;

    if (newTodo.title !== exists.title) {
      const titleElement = element.querySelector("h2")!;
      titleElement.innerText = newTodo.title;
    }
    if (newTodo.des !== exists.des) {
      const desElemtn = element.querySelector("p")!;
      desElemtn.innerText = newTodo.des;
    }
    if (newTodo.done !== exists.done) {
      const checkbox = element.querySelector<HTMLInputElement>(".todo-check")!;
      checkbox.checked = newTodo.done;
      element.classList.toggle("done", newTodo.done);
    }
  });
  oldTodos.forEach((oldTodo) => {
    const exists = newTodos.find((newTodo) => newTodo.id === oldTodo.id);
    if (!exists) {
      const element = document.querySelector(`[data-id="${oldTodo.id}"]`);
      if (element) {
        element?.remove();
      }
    }
  });
}

function createTodoElement(todo:Todo) {
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
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
  });
  button.addEventListener("click", () => {
    deleteTodo(todo.id);
  });
  body.classList.add("todo-body");

  //adding childs to those elements
  h2.textContent = todo.title;
  p.textContent = todo.des;
  button.innerText = "Delete";

  body.appendChild(h2);
  body.appendChild(p);

  //appneding childs of li
  li.appendChild(checkbox);
  li.appendChild(body);
  li.appendChild(button);

  return li;
}

