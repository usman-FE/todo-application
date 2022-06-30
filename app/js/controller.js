import * as model from './model.js';
import inputView from './views/inputView.js';
import taskView from './views/taskView.js';


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
  if (!input)
    return;
  model.loadTask(input);

  // 2) RENDER THE TASKS
  taskView.render(model.state.tasks);
}

const controlCompleted = () => {
  // 0) GET ELEMENT ID
  const id = taskView.getID();
  console.log(id);
  model.getCompletedElement(id);

  // 1) UPDATE THE TASK COMPLETED STATUS (IN STATE)
  model.updateCompleted(model.state.tasks[0]);

  // 2) UPDATE THE TASK VIEW
  taskView.render(model.state.tasks);

}

const init = function () {
  taskView.addHandlerRender(controlTasks);
  inputView.addHandlerInput(controlTasks);
  taskView.addHandlerCompletedTask(controlCompleted);
}

init();



