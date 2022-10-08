const toDoInput = document.getElementById('todo-list__input');
const addButton = document.getElementById('todo-list__add-button');
const toDoList = document.getElementById('todo-list');
const toDos = JSON.parse(localStorage.getItem('todos')) || [];

const createToDo = toDoValue => {
  const toDo = document.createElement('li');
  const toDoDeleteButton = document.createElement('button');
  const toDoEditButton = document.createElement('button');

  toDo.classList.add('todo');
  toDoDeleteButton.classList.add('todo__delete-button');
  toDoEditButton.classList.add('todo__edit-button');

  toDo.innerHTML = toDoValue;
  toDoDeleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  toDoEditButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
  
  toDo.append(toDoDeleteButton, toDoEditButton);
  toDoList.appendChild(toDo);
}

const updatelocalStorage = () => localStorage.setItem('todos', JSON.stringify(toDos));

// checks localStorage for existing todos when page loads
window.onload = () => {
  if (toDos !== []) {
    toDos.forEach(todo => {
      createToDo(todo)
    })
  }
}

const addToToDos = (toDoValue) => {
  // check if input has a value
  if (toDoValue.trim() !== '') {

    // check if todo already exists
    if (toDos.find(value => value === toDoValue.trim())) {
      alert('To-Do already exists.');
    } else {
      // add todo to array and update localStorage
      toDos.push(toDoValue);
      updatelocalStorage();
  
      // create todo and add to list
      createToDo(toDoValue);
    }
  }

  // clear input value
  toDoInput.value = '';
}

const removeFromToDos = () => {
  const index = toDos.indexOf(toDoValue);
  if (index > -1) toDos.splice(index, 1);
  updatelocalStorage();
}

toDoInput.addEventListener('keyup', () => console.log(toDoInput.value.trim()))
addButton.addEventListener('click', () => addToToDos(toDoInput.value));

console.log(toDoList.querySelectorAll('.todo'));