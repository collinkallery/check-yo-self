class TodoList {
  constructor(id, randomId, toDoTitle, urgent, tasks) {
    this.id = id;
    this.taskArrayId = randomId;
    this.title = toDoTitle;
    this.urgent = urgent || false;
    this.tasks = tasks || [];
  }
  saveToStorage(toDoArray) {
    var stringifiedTodo = JSON.stringify(toDoArray);
    window.localStorage.setItem('to-do array', stringifiedTodo);
  }
  deleteFromStorage() {

  }
  updateToDo() {

  }
  updateTask() {

  }
  removeTask(taskId) {
    for (var i = 0; i < this.tasks.length; i++) {
      if (taskId == this.tasks[i].id) {
        this.tasks.splice(i, 1);
        return;
      }
    }
  }
}
