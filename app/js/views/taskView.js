class TaskView {
  #parentElement = document.querySelector('.task__list');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  #generateMarkup() {
    return `
  <li class="task__item">
  <div class="task__checkbox">
  <span class="${this.#data.isCompleted ? 'task__checked' : ''}"></span>
  <a href="#" class="task__icon circle-icon">&nbsp;</a>
  </div>
  <p class="task__description ${this.#data.isCompleted ? 'task-done' : ''}">${this.#data.title}</p>
  <div class="task__edit">
  <a href="#" class="task__icon edit-icon controls">&nbsp;</a>
  </div>
  <div class="task__delete">
  <a href="#" class="task__icon delete-icon controls">&nbsp;</a>
  </div>
  </li>
  `
  }
}

export default new TaskView();