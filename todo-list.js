class TodoList {
  constructor(id, toDoTitle) {
    this.id = id;
    this.title = toDoTitle;
    this.urgent = false;
    this.tasks = [];
  }
  saveToStorage() {

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
