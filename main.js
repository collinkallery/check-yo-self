var asideChecklist = document.querySelector('.aside-checklist-container');
var toDoTitleInput = document.querySelector('.todo-title');
var taskItemInput = document.querySelector('.task-title');
var plusButton = document.querySelector('.plus-button');
var makeTasklistButton = document.querySelector('#make-tasklist-button');
var noTasksPage = document.querySelector('.no-tasks-page');
var tasksContainer = document.querySelector('.tasks-container');
var deleteTaskButton = document.querySelector('.delete-button');
var clearAllButton = document.querySelector('#clear-all-button');
var newTask;
var newToDo = new TodoList;
var toDoArray = [];

plusButton.addEventListener('click', displayTaskItems);
asideChecklist.addEventListener('click', removeAsideItem);
makeTasklistButton.addEventListener('click', instantiateToDo);
clearAllButton.addEventListener('click', clearAllInputs);
tasksContainer.addEventListener('click', checkTask);

window.onload = retrieveFromStorage();

function displayTaskItems() {
  if (taskItemInput.value === '') {
    plusButton.disabled = true;
    return;
  } else {
    var newTask = new Task;
    newTask.title = taskItemInput.value;
    newTask.id = Date.now();
    newToDo.tasks.push(newTask);
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
    newToDo.removeTask(event.target.id);
  }
}

function clearAllInputs() {
  if (toDoTitleInput.value === '' && taskItemInput.value === '' && asideChecklist.innerHTML === '') {
    clearAllButton.disabled = true;
    return;
  } else {
    toDoTitleInput.value = '';
    taskItemInput.value = '';
    asideChecklist.innerHTML = '';
  }
}

function instantiateToDo() {
  if (toDoTitleInput.value === '' || asideChecklist.innerHTML === '') {
    makeTasklistButton.disabled = true;
  } else {
    displayToDoPage();
    newToDo.id = Date.now();
    newToDo.taskArrayId = generateTaskArrayId();
    newToDo.title = toDoTitleInput.value;
    toDoArray.push(newToDo);
    renderToDo(newToDo);
    newToDo.saveToStorage(toDoArray);
    resetInput();
    return newToDo;
  }
}

function renderToDo(newToDo) {
  tasksContainer.innerHTML += `<section class="task-card" id="${newToDo.id}">
    <h3>${newToDo.title}</h3>
    <div class="task-container" id="${newToDo.taskArrayId}">
    </div>
    <div class="task-image-container">
      <div class="card-img-1">
        <img class="card-img urgent" src="assets/urgent.svg" alt="lightning bolt">
        <p class="caption urgent-caption">Urgent</p>
      </div>
      <div class="card-img-2">
        <img class="card-img delete" src="assets/delete.svg" alt="delete X">
        <p class="caption delete-caption">Delete</p>
      </div>
    </div>
  </section>
  `
  for (var i = 0; i < newToDo.tasks.length; i++) {
    renderTask(newToDo.tasks[i], newToDo);
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

function displayToDoPage() {
  noTasksPage.classList.add('hidden');
  tasksContainer.classList.remove('hidden');
};

function resetInput() {
  clearTaskItem();
  toDoTitleInput.value = '';
  asideChecklist.innerHTML = '';
  newToDo = new TodoList;
}

function retrieveFromStorage() {
  if (window.localStorage.length === 0) {
    return;
  } else {
    displayToDoPage();
    var temporaryArray = [];
    var retrievedToDos = window.localStorage.getItem('to-do array');
    var parsedToDo = JSON.parse(retrievedToDos);
    for (var i = 0; i < parsedToDo.length; i++) {
      var taskArray = [];
      for (var j = 0; j < parsedToDo[i].tasks.length; j++) {
        var newTask = new Task(parsedToDo[i].tasks[j].title, parsedToDo[i].tasks[j].complete, parsedToDo[i].tasks[j].id)
        taskArray.push(newTask)
      }
      var newToDo = new TodoList(parsedToDo[i].id, parsedToDo[i].taskArrayId, parsedToDo[i].title, parsedToDo[i].urgent, taskArray);
      temporaryArray.push(newToDo);
    }
    toDoArray = temporaryArray;
    displayStorage();
  }
}

function displayStorage() {
  for (var i = 0; i < toDoArray.length; i++) {
    renderToDo(toDoArray[i]);
  }
}

function generateTaskArrayId() {
  return Math.floor(Math.random() * 10000);
}

function checkTask() {
  var checkbox = event.target;
  console.log(event.target);
  var currentTodo = findCurrentTodo(event.target.getAttribute('data-todo-id'));
  if (checkbox.getAttribute('data-checked') === 'false') {
    checkbox.setAttribute('data-checked', true);
    checkbox.src = 'assets/checkbox-active.svg';
    currentTodo.toggleTask(checkbox.id, true);
  } else if (checkbox.getAttribute('data-checked') === 'true') {
    checkbox.setAttribute('data-checked', false);
    checkbox.src = 'assets/checkbox.svg';
    currentTodo.toggleTask(checkbox.id, false);
  }
  currentTodo.saveToStorage(toDoArray);
}

function findCurrentTodo(todoId) {
  for (var i = 0; i < toDoArray.length; i++) {
    if (todoId == toDoArray[i].id) {
      return toDoArray[i];
    }
  }
}
