// GLOBAL VARIABLES
var asideChecklist = document.querySelector('.aside-checklist-container');
var clearAllButton = document.querySelector('#clear-all-button');
var dataUrgent;
var deleteTaskButton = document.querySelector('.delete-button');
var filterUrgencyButton = document.querySelector('#filter-urgent-button');
var makeTasklistButton = document.querySelector('#make-tasklist-button');
var newTask;
var newTodo = new TodoList;
var noTasksPage = document.querySelector('.no-tasks-page');
var plusButton = document.querySelector('.plus-button');
var searchInput = document.querySelector('.search-page-input');
var taskItemInput = document.querySelector('.task-title');
var taskCards = Array.from(document.querySelectorAll('.task-card'));
var tasksContainer = document.querySelector('.tasks-container');
var todoArray = [];
var todoTitleInput = document.querySelector('.todo-title');
var urgentButton;
var urgentClass;

//EVENT LISTENERS
plusButton.addEventListener('click', displayTaskItems);
asideChecklist.addEventListener('click', removeAsideItem);
makeTasklistButton.addEventListener('click', instantiateTodo);
clearAllButton.addEventListener('click', clearAllInputs);
tasksContainer.addEventListener('click', buttonHandler);
filterUrgencyButton.addEventListener('click', filterByUrgency);
searchInput.addEventListener('keyup', filterBySearch);

window.onload = retrieveFromStorage();

// ASIDE FUNCTIONS
function displayTaskItems() {
  if (taskItemInput.value === '') {
    plusButton.disabled = true;
    return;
  } else {
    var newTask = new Task;
    newTask.title = taskItemInput.value;
    newTask.id = Date.now();
    newTodo.tasks.push(newTask);
    asideChecklist.innerHTML += `
  <div class="aside-checklist-item">
    <img src="assets/delete.svg" id="${newTask.id}" class="delete-button"><p class="aside-font">${newTask.title}</p>
  </div>`
    clearTaskItem();
  }
}

function clearTaskItem() {
  taskItemInput.value = '';
}

function removeAsideItem() {
  if (event.target.classList.contains('delete-button')) {
    var checklistItem = event.target.parentNode.remove();
    newTodo.removeTask(event.target.id);
  }
}

function clearAllInputs() {
  if (todoTitleInput.value === '' && taskItemInput.value === '' && asideChecklist.innerHTML === '') {
    clearAllButton.disabled = true;
    return;
  } else {
    todoTitleInput.value = '';
    taskItemInput.value = '';
    asideChecklist.innerHTML = '';
  }
}

function resetInput() {
  clearTaskItem();
  todoTitleInput.value = '';
  asideChecklist.innerHTML = '';
  newTodo = new TodoList;
}

// TASK / TODO INSTANTIATION & RENDERING
function instantiateTodo() {
  if (todoTitleInput.value === '' || asideChecklist.innerHTML === '') {
    makeTasklistButton.disabled = true;
  } else {
    displayTodoPage();
    newTodo.id = Date.now();
    newTodo.taskArrayId = generateTaskArrayId();
    newTodo.title = todoTitleInput.value;
    todoArray.push(newTodo);
    renderTodo(newTodo);
    newTodo.saveToStorage(todoArray);
    resetInput();
    return newTodo;
  }
}

function renderTodo(newTodo) {
  renderUrgency(newTodo);
  tasksContainer.innerHTML += `<section class="task-card ${urgentClass}" id="${newTodo.id}">
    <h3 class="card-title">${newTodo.title}</h3>
    <div class="task-container" id="${newTodo.taskArrayId}">
    </div>
    <div class="task-image-container">
      <div class="card-img-1">
        <img class="card-img urgent" id="${newTodo.id}" data-urgent="${dataUrgent}" src="${urgentButton}" alt="lightning bolt">
        <p class="caption urgent-caption">Urgent</p>
      </div>
      <div class="card-img-2">
        <img class="card-img delete" id="${newTodo.id}" src="assets/delete.svg" alt="delete X">
        <p class="caption delete-caption">Delete</p>
      </div>
    </div>
  </section>
  `
  for (var i = 0; i < newTodo.tasks.length; i++) {
    renderTask(newTodo.tasks[i], newTodo);
  }
}

function renderTask(task, todo) {
  var taskBox = document.getElementById(`${todo.taskArrayId}`)
  if (task.complete === true) {
    taskBox.innerHTML += `
    <p><img class="checkbox" id="${task.id}" data-checked="true" data-todo-id="${todo.id}" src="assets/checkbox-active.svg">${task.title}</p>
    `
  } else {
    taskBox.innerHTML += `
    <p><img class="checkbox" id="${task.id}" data-checked="false" data-todo-id="${todo.id}" src="assets/checkbox.svg">${task.title}</p>
    `
  }
}

function renderUrgency(todo) {
  if (todo.urgent === true) {
    urgentButton = 'assets/urgent-active.svg';
    urgentClass = 'card-background-yellow';
    dataUrgent = true;
  } else {
    urgentButton = 'assets/urgent.svg';
    urgentClass = '';
    dataUrgent = false;
  }
}

function displayTodoPage() {
  noTasksPage.classList.add('hidden');
  tasksContainer.classList.remove('hidden');
};

// LOCAL STORAGE
function retrieveFromStorage() {
  if (!window.localStorage.getItem('to-do array')) {
    return;
  } else {
    displayTodoPage();
    var temporaryArray = [];
    var retrievedTodos = window.localStorage.getItem('to-do array');
    var parsedTodo = JSON.parse(retrievedTodos);
    for (var i = 0; i < parsedTodo.length; i++) {
      var taskArray = [];
      for (var j = 0; j < parsedTodo[i].tasks.length; j++) {
        var newTask = new Task(parsedTodo[i].tasks[j].title, parsedTodo[i].tasks[j].complete, parsedTodo[i].tasks[j].id)
        taskArray.push(newTask)
      }
      var newTodo = new TodoList(parsedTodo[i].id, parsedTodo[i].taskArrayId, parsedTodo[i].title, parsedTodo[i].urgent, taskArray);
      temporaryArray.push(newTodo);
    }
    todoArray = temporaryArray;
    displayStorage();
  }
}

function displayStorage() {
  for (var i = 0; i < todoArray.length; i++) {
    renderTodo(todoArray[i]);
  }
}

function generateTaskArrayId() {
  return Math.floor(Math.random() * 100000);
}

// TODO FUNCTIONS
function buttonHandler() {
  if (event.target.classList.contains('checkbox')) {
    checkTask(event.target.getAttribute('data-todo-id'));
  }
  if (event.target.classList.contains('urgent')) {
    checkUrgency(event.target.id);
  }
  if (event.target.classList.contains('delete')) {
    validateDelete(event.target.id);
  }
}

function checkTask(matchingId) {
  var checkbox = event.target;
  var currentTodo = findCurrentTodo(matchingId);
  if (checkbox.getAttribute('data-checked') === 'false') {
    checkbox.setAttribute('data-checked', true);
    checkbox.src = 'assets/checkbox-active.svg';
    currentTodo.updateTask(checkbox.id, true);
  } else if (checkbox.getAttribute('data-checked') === 'true') {
    checkbox.setAttribute('data-checked', false);
    checkbox.src = 'assets/checkbox.svg';
    currentTodo.updateTask(checkbox.id, false);
  }
  currentTodo.saveToStorage(todoArray);
}

function checkUrgency(matchingId) {
  var urgent = event.target;
  var currentTodo = findCurrentTodo(matchingId);
  if (urgent.getAttribute('data-urgent') === 'false') {
    urgent.setAttribute('data-urgent', true);
    urgent.closest('.task-card').classList.add('card-background-yellow');
    urgent.src = 'assets/urgent-active.svg';
    currentTodo.updateTodo(urgent.id, true);
  } else if (urgent.getAttribute('data-urgent') === 'true') {
    urgent.setAttribute('data-urgent', false);
    urgent.closest('.task-card').classList.remove('card-background-yellow');
    urgent.src = 'assets/urgent.svg';
    currentTodo.updateTodo(urgent.id, false);
  }
  currentTodo.saveToStorage(todoArray);
}

function validateDelete(matchingId) {
  var currentTodo = findCurrentTodo(matchingId);
  for (var i = 0; i < todoArray.length; i++) {
    if (matchingId == todoArray[i].id) {
      var tasks = currentTodo.tasks;
      var numberChecked = tasks.filter(function(task) {
        return task.complete === false;
      });
      if (numberChecked.length > 0) {
        return;
      } else {
        deleteCard(currentTodo, todoArray);
      }
    }
  }
}

function deleteCard(currentTodo, todoArray) {
  event.target.closest('.task-card').remove();
  currentTodo.deleteFromStorage(currentTodo, todoArray);
}

function findCurrentTodo(todoId) {
  for (var i = 0; i < todoArray.length; i++) {
    if (todoId == todoArray[i].id) {
      return todoArray[i];
    }
  }
}

// FILTERING FUNCTIONS
function filterByUrgency() {
  var taskCards = Array.from(document.querySelectorAll('.task-card'));
  filterUrgencyButton.classList.toggle('urgent-background');
  for (var i = 0; i < taskCards.length; i++) {
    if (!taskCards[i].classList.contains('card-background-yellow')) {
      taskCards[i].classList.toggle('hidden');
    }
  }
}

function filterBySearch() {
  var taskCards = Array.from(document.querySelectorAll('.task-card'));
  for (var i = 0; i < taskCards.length; i++) {
    var todoTitle = taskCards[i].querySelector('.card-title');
    if (!todoTitle.innerText.includes(searchInput.value)) {
      taskCards[i].classList.add('hide');
    } else {
      taskCards[i].classList.remove('hide');
    }
  }
}
