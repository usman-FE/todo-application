class ClearCompletedView {
  #parentElement = document.querySelector('#clearBtn');

  addHandlerClearCompleted(handler) {
    this.#parentElement.addEventListener('click', function () {
      handler();
    });
  }
}

export default new ClearCompletedView();
