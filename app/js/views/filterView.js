class FilterView {
  #parentElement = document.querySelector('.container');
  #listContainer = document.querySelector('.task__list').children;
  #data;

  sendData(data) {
    this.#data = data;
    const elems = Array.from(this.#listContainer);
    const ids = this.#data.map((task) => task.id);
    const actives = elems.filter((elem) => !ids.includes(+elem.dataset.id));
    actives.forEach((item) => {
      item.classList.add('hidden');
    });
  }

  addHanderActiveFilter(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      if (e.target.classList.contains('active')) {
        handler();
      }
    });
  }
}

export default new FilterView();
