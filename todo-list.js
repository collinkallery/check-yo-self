class TodoList {
  constructor(id, randomId, todoTitle, urgent, tasks) {
    this.id = id;
    this.taskArrayId = randomId;
    this.title = todoTitle;
    this.urgent = urgent || false;
    this.tasks = tasks || [];
  }
  saveToStorage(todoArray) {
    var stringifiedTodo = JSON.stringify(todoArray);
    window.localStorage.setItem('to-do array', stringifiedTodo);
  }
  deleteFromStorage(currentTodo, todoArray) {
    var retrievedTodos = window.localStorage.getItem('to-do array');
    var parsedTodo = JSON.parse(retrievedTodos);
    for (var i = 0; i < parsedToDo.length; i++) {
      if (currentTodo.id == parsedTodo[i].id) {
        todoArray.splice(i, 1);
        this.saveToStorage(todoArray);
      }
    }
  }
  updateTodo(todoNumber, enabled) {
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
