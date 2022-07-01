class FilterView {
  #parentElement = document.querySelector('.container');

  addHanderFilter() {
    this.#parentElement.addEventListener('click', function (e) {
      const listContainer = Array.from(document.querySelector('.task__list').children);
      listContainer.forEach(item => {
        item.style.maxHeight = item.scrollHeight + 'rem';
      })
      if (e.target.classList.contains('all')) {
        listContainer.forEach(item => {
          item.style.maxHeight = item.scrollHeight + 'rem';
        })
      }

      if (e.target.classList.contains('active')) {
        const active = listContainer.filter(item => item.querySelector('.task__description').classList.contains('task-done'))
        active.forEach(item => {
          // if (item.style.maxHeight) {
          //   item.style.maxHeight = 0;
          // } else {
          //   item.style.maxHeight = item.scrollHeight + 'rem';
          // }
          item.style.maxHeight = '0px';
        })
      }

      if (e.target.classList.contains('completed')) {
        const active = listContainer.filter(item => !(item.querySelector('.task__description').classList.contains('task-done')))
        active.forEach(item => {
          // if (item.style.maxHeight) {
          //   item.style.maxHeight = 0;
          // } else {
          //   item.style.maxHeight = item.scrollHeight + 'rem';
          // }
          item.style.maxHeight = '0px';
        })
      }
    })
  }
}

export default new FilterView;