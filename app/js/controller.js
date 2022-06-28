import { todoTasks } from './todoData.js';

const toggle = document.querySelector('#toggle');
const body = document.querySelector('body');
const colorMode = localStorage.getItem('colorMode');

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
