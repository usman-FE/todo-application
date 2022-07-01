class ItemsLeftView {
  #parentElement = document.querySelector('.items-left');
  #data;

  addHandlerItemsLeftView(handler) {
    handler();
  }

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clearContainer();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  #generateMarkup() {
    return `
      <p class="filter__text">${this.#data} ${
      this.#data > 1 ? 'items' : 'item'
    } left</p>
    `;
  }

  #clearContainer() {
    this.#parentElement.innerHTML = '';
  }
}

export default new ItemsLeftView();
