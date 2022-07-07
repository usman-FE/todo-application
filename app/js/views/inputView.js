class inputView {
  #parentElement = document.querySelector('.input__area');
  #idField = document.querySelector('.id');

  getInput() {
    const input = this.#parentElement.querySelector('.input__field').value;
    return input;
  }

  getID() {
    const updatedTaskID = this.#parentElement.querySelector('.id').value;
    return updatedTaskID;
  }

  addHandlerInput(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerOutsideClickEdit(handler) {
    window.addEventListener('click', function (e) {
      const field = e.target.closest('.input-section');
      if (field) return;
      handler();
    })
  }

  clearInput() {
    return this.#parentElement.querySelector('.input__field').value = '';
  }

  clearModifiedHiddenInput() {
    this.#idField.value = '';
  }

}

export default new inputView;