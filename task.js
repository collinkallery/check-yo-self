class Task {
  constructor(taskItem, complete, id) {
    this.title = taskItem;
    this.complete = complete || false;
    this.id = id;
  }
}
