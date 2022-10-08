const toDoInput = document.getElementById('todo-list__input');
const addButton = document.getElementById('todo-list__add-button');
const toDoList = document.getElementById('todo-list');
let todos = [];

toDoInput.addEventListener('keyup', () => console.log(toDoInput.value.trim()))

window.onload = () => {
  const todosFromLocalStorage = JSON.parse(localStorage.getItem('todos'));
  if (todosFromLocalStorage !== []) todos = todosFromLocalStorage;
}

const addToTodos = (toDoValue) => {
  if (toDoValue.trim() === '') return;
    console.log('adding to todos')
    todos.push(toDoValue);
    localStorage.setItem('todos', JSON.stringify(todos));

    const todo = document.createElement('li');
    todo.innerHTML = toDoValue;
    toDoList.appendChild(todo);

    toDoInput.value = '';
}

addButton.addEventListener('click', () => addToTodos(toDoInput.value));

