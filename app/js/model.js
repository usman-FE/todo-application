export const state = {
  tasks: [],
  id: 1,
  itemsLeft: '',
};

export const loadTask = (todo) => {
  state.tasks.push({
    title: todo,
    isCompleted: false,
    id: state.id,
  });
  state.id++;
};

export const updateCompleted = (id) => {
  const [completedTask] = state.tasks.filter((task) => task.id === id);
  completedTask.isCompleted = true;
};

export const setItemsLeft = () => {
  state.itemsLeft = state.tasks.length;
};

export const deleteTask = (id) => {
  const filtered = state.tasks.filter((task) => task.id !== id);
  state.tasks = filtered;
};

export const clearCompleted = () => {
  const filtered = state.tasks.filter((task) => !task.isCompleted);
  state.tasks = filtered;
};

export const getActive = () => {
  const active = state.tasks.filter((task) => !task.isCompleted);
  return active;
};

export const getCompleted = () => {
  const completed = state.tasks.filter(task => task.isCompleted);
  return completed;
}
