import * as model from './model.js';
import { todoTasks } from './todoData.js';
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


const controlTasks = function () {

  // 1) LOAD THE TASKS
  todoTasks.todos.forEach(todo => {
    model.loadTask(todo);
  })
  // 2) RENDER THE TASKS
  model.state.tasks.forEach(task => {
    taskView.render(task);
  })

}

controlTasks();



