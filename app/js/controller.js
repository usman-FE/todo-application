import * as model from './model.js';
import itemsLeftView from './views/itemsLeftView.js';
import inputView from './views/inputView.js';
import taskView from './views/taskView.js';
import clearCompletedView from './views/clearCompletedView.js';
import filterView from './views/filterView.js';

const toggle = document.querySelector('#toggle');
const body = document.querySelector('body');
const colorMode = localStorage.getItem('colorMode');

// THEME TOGGLE

toggle.addEventListener('click', function () {
  body.classList.toggle('light');
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    localStorage.setItem('colorMode', 'dark');
  } else {
    localStorage.setItem('colorMode', 'light');
  }
});

window.addEventListener('load', function () {
  if (!colorMode) return;
  if (colorMode === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
  }
  if (colorMode === 'light') {
    body.classList.add('light');
    body.classList.remove('dark');
  }
});

///////////////////////////////////////////////////////
// CONTROLLER LOGIC///////////////////////////////////
/////////////////////////////////////////////////////

const controlTasks = () => {
  // 1) LOAD THE TASKS
  const input = inputView.getInput();
  if (!input) return;
  model.loadTask(input);

  // 2) RENDER THE TASKS
  taskView.render(model.state.tasks);

  // 3) RE-RENDER ITEMS LEFT
  controlItemsLeft();
};

const controlCompleted = (id) => {
  // 1) UPDATE THE TASK COMPLETED STATUS (IN STATE)
  model.updateCompleted(id);

  // 2) UPDATE THE TASK VIEW
  taskView.render(model.state.tasks);
};

const controlItemsLeft = () => {
  // 1) GET ITEMS FROM STATE
  model.setItemsLeft();
  const itemsLeft = model.state.itemsLeft;

  // 2) RENDER ITEMS LEFT
  itemsLeftView.render(itemsLeft);
};

const controlDeleteTask = (id) => {
  // 1) DELETE THE TASK FROM STATE
  model.deleteTask(id);

  // 2) RE-RENDER THE TASKS
  taskView.render(model.state.tasks);

  // 3) RE-RENDER THE ITEMS LEFT
  controlItemsLeft();
};

const controlClearCompleted = () => {
  // 1) REMOVE THE COMPLETED TASKS FROM STATE
  model.clearCompleted();

  // 2) RE-RENDER THE TASKS
  taskView.render(model.state.tasks);

  // 3) RE-RENDER THE ITEMS LEFT
  controlItemsLeft();
};

const controlActive = () => {
  const active = model.getActive();
  filterView.setActive(active);
};

const controlAll = () => {
  const all = model.state.tasks;
  filterView.setAll(all);
}

const controlCompletedFilter = () => {
  const completed = model.getCompleted();
  filterView.setCompleted(completed);
}

const init = () => {
  taskView.addHandlerRender(controlTasks);
  inputView.addHandlerInput(controlTasks);
  taskView.addHandlerCompletedTask(controlCompleted);
  itemsLeftView.addHandlerItemsLeftView(controlItemsLeft);
  taskView.addHandlerDeleteTask(controlDeleteTask);
  clearCompletedView.addHandlerClearCompleted(controlClearCompleted);
  filterView.addHanderActiveFilter(controlActive);
  filterView.addHanderAllFilter(controlAll);
  filterView.addHanderCompletedFilter(controlCompletedFilter);
};

init();
