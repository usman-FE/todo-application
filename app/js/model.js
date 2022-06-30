export const state = {
  tasks: [],
  id: 1,
}

export const loadTask = (todo) => {
  state.tasks.push({
    title: todo,
    isCompleted: false,
    id: state.id,
  });
  state.id++;
}

export const updateCompleted = (id) => {
  const [completedTask] = state.tasks.filter(item => item.id === id);
  completedTask.isCompleted = true;
}