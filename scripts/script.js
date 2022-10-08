const toDoInput = document.getElementById('todo-list__input');
const addButton = document.getElementById('todo-list__add-button');
const toDoList = document.getElementById('todo-list');
const toDos = JSON.parse(localStorage.getItem('todos')) || [];
let toDoListItems = [...document.querySelectorAll('.todo')];

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
    for (const toDo of toDos) {
      createToDo(toDo)
    }
  }
}

const addToToDos = (toDoValue) => {
  // check if input has a value
  if (toDoValue.trim() === '') {
    alert('Please enter a valid ToDo.')
    
    // clear input value
    toDoInput.value = '';

    return;
  } else {
    for (const toDo of toDos) {
      if (toDo === toDoValue.trim()) {
        alert('To-Do already exists.');

        // clear input value
        toDoInput.value = '';

        return;
      }
    }
  }

  // add todo to array and update localStorage
  toDos.push(toDoValue);
  updatelocalStorage();

  // create todo and add to list
  createToDo(toDoValue);  

  // clear input value
  toDoInput.value = '';
}

const removeFromToDos = (toDoValue) => {
  const index = toDos.indexOf(toDoValue);
  if (index > -1) toDos.splice(index, 1);
  console.log('trying to remove')
  updatelocalStorage();
  return toDos;
}

toDoInput.addEventListener('keyup', () => console.log(toDoInput.value.trim()))
addButton.addEventListener('click', () => addToToDos(toDoInput.value));

for(const item of toDoListItems) {
  console.log(item)
}