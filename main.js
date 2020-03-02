var asideChecklist = document.querySelector('.aside-checklist-container');
var toDoTitleInput = document.querySelector('.todo-title');
var taskItemInput = document.querySelector('.task-title');
var plusButton = document.querySelector('.plus-button');
var makeTasklistButton = document.querySelector('#make-tasklist-button');
var noTasksPage = document.querySelector('.no-tasks-page');
var tasksContainer = document.querySelector('.tasks-container');
var deleteTaskButton = document.querySelector('.delete-button');
var newTask;
var newToDo = new TodoList;
var toDoArray = [];

plusButton.addEventListener('click', displayTaskItems);
asideChecklist.addEventListener('click', removeAsideItem);
makeTasklistButton.addEventListener('click', instantiateToDo);

function displayTaskItems() {
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

function clearTaskItem() {
  taskItemInput.value = '';
}

function removeAsideItem() {
  if (event.target.classList.contains('delete-button')) {
    var checklistItem = event.target.parentNode.remove();
    newToDo.removeTask(event.target.id);
  }
}


function instantiateToDo() {
  displayToDoPage();
  newToDo.id = Date.now();
  newToDo.title = toDoTitleInput.value;
  toDoArray.push(newToDo);
  renderToDo(newToDo);
  resetInput();
  return newToDo;
}

function renderToDo(newToDo) {
  tasksContainer.innerHTML += `<section class="task-card">
    <h3>${newToDo.title}</h3>
    <div class="task-container" id="${newToDo.id}">
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
  var taskBox = document.getElementById(`${newToDo.id}`)
  for (var i = 0; i < newToDo.tasks.length; i++) {
    taskBox.innerHTML += `
    <p><img class="checkbox" src="assets/checkbox.svg">${newToDo.tasks[i].title}</p>
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
