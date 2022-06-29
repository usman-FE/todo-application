import { todoTasks } from './todoData.js';

const toggle = document.querySelector('#toggle');
const body = document.querySelector('body');
const colorMode = localStorage.getItem('colorMode');
const taskContainer = document.querySelector('.task__list');

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

const tasks = todoTasks.todos;
console.log(tasks);


const generateMarkup = function (task) {
  return `
  <li class="task__item">
  <div class="task__checkbox">
  <span class="${task.isCompleted ? 'task__checked' : ''}"></span>
  <a href="#" class="task__icon circle-icon">&nbsp;</a>
  </div>
  <p class="task__description ${task.isCompleted ? 'task-done' : ''}">${task.task}</p>
  <div class="task__edit">
  <a href="#" class="task__icon edit-icon controls">&nbsp;</a>
  </div>
  <div class="task__delete">
  <a href="#" class="task__icon delete-icon controls">&nbsp;</a>
  </div>
  </li>
  `
}

const markup = tasks.map(task => {
  return generateMarkup(task);
});


markup.forEach(item => {
  taskContainer.insertAdjacentHTML('beforeend', item)
})