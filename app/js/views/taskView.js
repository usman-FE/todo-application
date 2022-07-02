class TaskView {
  #parentElement = document.querySelector('.task__list');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clearContainer();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerRender(handler) {
    handler();
  }

  addHandlerCompletedTask(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.task__checkbox');
      const description = e.target.closest('.task__description');
      if (!btn && !description) return;
      const id = +e.target.closest('.task__item').dataset.id;
      handler(id);
    });
  }

  addHandlerDeleteTask(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const deleteBtn = e.target.closest('.task__delete');
      if (!deleteBtn) return;
      const id = +e.target.closest('.task__item').dataset.id;
      handler(id);
    });
  }

  #clearContainer() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup() {
    return this.#data
      .map((task) => {
        return this.#generateMarkupPreview(task);
      })
      .join('');
  }

  #generateMarkupPreview(task) {
    return `
      <li class="task__item" data-id="${task.id}">
        <div class="task__checkbox">
          <span class="${task.isCompleted ? 'task__checked' : ''}"></span>
          <a href="#" class="task__icon circle-icon">&nbsp;</a>
        </div>
        <p class="task__description ${task.isCompleted ? 'task-done' : ''}">${
      task.title
    }</p>
        <div class="task__edit">
          <a href="#" class="task__icon edit-icon controls">&nbsp;</a>
        </div>
        <div class="task__delete">
          <a href="#" class="task__icon delete-icon controls">&nbsp;</a>
        </div>
      </li>
    `;
  }
}

export default new TaskView();
