export const state = {
  tasks: [],
}

export const loadTask = function (todos) {
  state.tasks.push({
    title: todos.task,
    isCompleted: todos.isCompleted,
    id: todos.id
  })
}