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
  deleteFromStorage(currentTodo, toDoArray) {
    var retrievedToDos = window.localStorage.getItem('to-do array');
    var parsedToDo = JSON.parse(retrievedToDos);
    for (var i = 0; i < parsedToDo.length; i++) {
      if (currentTodo.id == parsedToDo[i].id) {
        toDoArray.splice(i, 1);
        this.saveToStorage(toDoArray);
      }
    }
  }
  updateToDo(todoNumber, enabled) {
    if (todoNumber == this.id) {
      this.urgent = enabled;
    }
  }
  updateTask(taskNumber, enabled) {
    for (var i = 0; i < this.tasks.length; i++) {
      if (taskNumber == this.tasks[i].id) {
        this.tasks[i].complete = enabled;
      }
    }
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
