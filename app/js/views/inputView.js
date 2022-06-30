class inputView {
  #parentElement = document.querySelector('.input__area');

  getInput() {
    const input = this.#parentElement.querySelector('.input__field').value;
    this.#clearInput();
    return input;

  }

  addHandlerInput(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  #clearInput() {
    return this.#parentElement.querySelector('.input__field').value = '';
  }

}

export default new inputView;