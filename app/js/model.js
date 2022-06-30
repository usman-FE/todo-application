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

export const getCompletedElement = (id) => {
  const [compEl] = state.tasks.filter(task => task.id === id);
  state.completed = compEl;
}

export const updateCompleted = (task) => {
  const [change] = state.tasks.filter(item => item.id === task.id);
  change.isCompleted = true;
}