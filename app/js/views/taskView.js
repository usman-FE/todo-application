class TaskView {
  #parentElement = document.querySelector('.task__list');
  #idField = document.querySelector('.id');
  #inputField = document.querySelector('.input__field');
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

  addHandlerLocalStorageRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerCompletedTask(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.task__checkbox');
      const description = e.target.closest('.task__description');
      if (!btn && !description) return;
      const id = e.target.closest('.task__item').dataset.id;
      handler(id);
    });
  }

  addHandlerDeleteTask(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const deleteBtn = e.target.closest('.task__delete');
      if (!deleteBtn) return;
      const id = e.target.closest('.task__item').dataset.id;
      handler(id);
    });
  }

  addHandlerEditTask(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const editBtn = e.target.closest('.task__edit');
      if (!editBtn) return;
      const id = e.target.closest('.task__item').dataset.id;
      const task = e.target.closest('.task__item').querySelector('.task__description').innerText;
      handler(id, task);
    });
  }

  modifyHiddenInput(id) {
    this.#idField.value = id;
  }

  updateTaskField(task) {
    this.#inputField.value = task;
    this.#inputField.focus();
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
          <button class="task__icon circle-icon">&nbsp;</button>
        </div>
        <p class="task__description ${task.isCompleted ? 'task-done' : ''}">${task.title
      }</p>
        <div class="task__edit">
          <button class="task__icon edit-icon controls">&nbsp;</button>
        </div>
        <div class="task__delete">
          <button class="task__icon delete-icon controls">&nbsp;</button>
        </div>
      </li>
    `;
  }
}

export default new TaskView();
