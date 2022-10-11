// To-Do list
const toDoList = document.getElementById('todo-list');
const toDoListItems = document.querySelectorAll('.todo-list__item');

// Pagination
const paginationNav = document.getElementById('pagination');
const paginationNumbersContainer = document.getElementById('pagination__numbers');
const previousButton = document.getElementById('pagination-button-previous');
const nextButton = document.getElementById('pagination-button-next');
const paginationLimit = 10;
const pageCount = Math.ceil(toDoListItems.length / paginationLimit);
let currentPage;

(() => {
  getPaginationNumbers();
  setCurrentPage(1);

  previousButton.addEventListener("click", () => {
    setCurrentPage(currentPage--);
  });
 
  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage++);
  });

  const paginationNumbers = document.querySelectorAll('.pagination-number');

  for (const numberButton of paginationNumbers) {
    const pageIndex = Number(numberButton.getAttribute('page-index'));

    if (pageIndex) {
      numberButton.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  }
})();

function appendPageNumber (index) {
  const pageNumber = document.createElement('button');
  pageNumber.classList.add = 'pagination-number';
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbersContainer.appendChild(pageNumber);
};

function getPaginationNumbers () {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

function setCurrentPage (pageNumber) {
  currentPage = pageNumber;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const previousRange = (pageNumber - 1) * paginationLimit;
  const currentRange = pageNumber * paginationLimit;

  for (let i = 0; i < toDoListItems.length; i++) {
    toDoListItems[i].classList.add('hidden');
    if (i >= previousRange && i < currentRange) toDoListItems[i].classList.remove('hidden');
  }
};

function handleActivePageNumber () {
  const paginationNumbers = document.querySelectorAll('.pagination-number')

  for (const numberButton of paginationNumbers) {
    numberButton.classList.remove('active');

    const pageIndex = Number(numberButton.getAttribute('page-index'));

    if (pageIndex === currentPage) {
      numberButton.classList.add('active');
    }  
  }
};

function disableButton (button) {
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
};
 
function enableButton (button) {
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
};
 
function handlePageButtonsStatus () {
  if (currentPage === 1) {
    disableButton(previousButton);
  } else {
    enableButton(previousButton);
  }
 
  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};
