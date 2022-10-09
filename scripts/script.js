const input = document.getElementById('input');
const addButton = document.getElementById('add');
const toDoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

/*
 * return data from localStorage if it's stored
 * otherwise return an empty array
 */
const toDoItems = JSON.parse(localStorage.getItem('todos')) || [];
const doneItems = JSON.parse(localStorage.getItem('done')) || [];

const createToDo = toDoValue => {
  const toDo = document.createElement('li');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  toDo.classList.add('todo');
  editButton.classList.add('edit');
  deleteButton.classList.add('delete');

  toDo.innerHTML = toDoValue;
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
  
  toDo.append(editButton, deleteButton);
  toDoList.appendChild(toDo);
}

const updatelocalStorage = (value) => localStorage.setItem('todos', JSON.stringify(value));

// checks localStorage for existing todo and done items when page loads
window.onload = () => {
  if (toDoItems !== []) {
    for (const toDo of toDoItems) {
      createToDo(toDo)
    }
  }

  if (doneItems !== []) {
    for (const doneItem of doneItems) {
      createItem(doneItem)
    }
  }
}

const addToToDos = (toDoValue) => {
  // check if input has a value
  if (toDoValue.trim() === '') {
    alert('Please enter a valid ToDo.')
    
    // clear input value
    input.value = '';

    return;
  } else {
    for (const toDo of toDoItems) {
      if (toDo === toDoValue.trim()) {
        alert('To-Do already exists.');

        // clear input value
        input.value = '';

        return;
      }
    }
  }

  // add todo to array and update localStorage
  toDoItems.push(toDoValue);
  updatelocalStorage(toDoItems);

  // create todo and add to list
  createToDo(toDoValue);  

  // clear input value
  input.value = '';
}

const removeFromToDos = (toDoValue) => {
  const index = toDoItems.indexOf(toDoValue);
  if (index > -1) toDoItems.splice(index, 1);
  console.log('trying to remove')
  updatelocalStorage(toDoItems);
  return toDoItems;
}

input.addEventListener('keyup', () => console.log(input.value.trim()))
addButton.addEventListener('click', () => addToToDos(input.value));