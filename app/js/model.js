import { v4 as uuidv4 } from 'uuid';

export const state = {
  tasks: [],
  itemsLeft: '',
};

export const loadTask = (todo) => {
  state.tasks.push({
    title: todo,
    isCompleted: false,
    id: uuidv4(),
  });
  state.id++;
  taskLocalStorage();
};

const taskLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
}

export const updateCompleted = (id) => {
  const [completedTask] = state.tasks.filter((task) => task.id === id);
  if (completedTask.isCompleted) {
    completedTask.isCompleted = false;
  } else {
    completedTask.isCompleted = true;
  }
  taskLocalStorage();
};

export const setItemsLeft = () => {
  state.itemsLeft = state.tasks.length;
};

export const deleteTask = (id) => {
  const filtered = state.tasks.filter((task) => task.id !== id);
  state.tasks = filtered;
  taskLocalStorage();
};

export const clearCompleted = () => {
  const filtered = state.tasks.filter((task) => !task.isCompleted);
  state.tasks = filtered;
  taskLocalStorage();
};

export const getActive = () => {
  const active = state.tasks.filter((task) => !task.isCompleted);
  return active;
};

export const getCompleted = () => {
  const completed = state.tasks.filter(task => task.isCompleted);
  return completed;
}

const init = () => {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    state.tasks = JSON.parse(tasks);
  }
}

init();
console.log(state.tasks);