class FilterView {
  #parentElement = document.querySelector('.container');
  #listContainer = document.querySelector('.task__list').children;
  #data;

  #resetHiddenClass(elemContainer) {
    const elems = Array.from(elemContainer);
    elems.forEach(item => {
      item.classList.remove('hidden');
    })
    return elems;
  }

  setAll(data) {
    this.#data = data;
    this.#resetHiddenClass(this.#listContainer);
  }

  setActive(data) {
    this.#data = data;
    const elems = this.#resetHiddenClass(this.#listContainer);
    const ids = this.#data.map((task) => task.id);
    const actives = elems.filter((elem) => !ids.includes(+elem.dataset.id));
    actives.forEach((item) => {
      item.classList.add('hidden');
    });
  }

  setCompleted(data) {
    this.#data = data;
    const elems = this.#resetHiddenClass(this.#listContainer);
    const ids = this.#data.map((task) => task.id);
    const completed = elems.filter((elem) => !ids.includes(+elem.dataset.id));
    completed.forEach((item) => {
      item.classList.add('hidden');
    });
  }

  addHanderAllFilter(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      if (e.target.classList.contains('all')) {
        const container = Array.from(e.target.closest('.filter__list').children);
        container.forEach(btn => {
          btn.firstElementChild.classList.remove('selected');
        })
        e.target.classList.add('selected');
        handler();
      }
    });
  }

  addHanderActiveFilter(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      if (e.target.classList.contains('active')) {
        const container = Array.from(e.target.closest('.filter__list').children);
        container.forEach(btn => {
          btn.firstElementChild.classList.remove('selected');
        })
        e.target.classList.add('selected');
        handler();
      }
    });
  }

  addHanderCompletedFilter(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      if (e.target.classList.contains('completed')) {
        const container = Array.from(e.target.closest('.filter__list').children);
        container.forEach(btn => {
          btn.firstElementChild.classList.remove('selected');
        })
        e.target.classList.add('selected');
        handler();
      }
    });
  }
}

export default new FilterView();
