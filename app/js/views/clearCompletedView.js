class ClearCompletedView {
  #parentElement = document.querySelector('#clearBtn');

  addHandlerClearCompleted(handler) {
    console.log(this.#parentElement);
    this.#parentElement.addEventListener('click', function () {
      handler();
    });
  }
}

export default new ClearCompletedView();
