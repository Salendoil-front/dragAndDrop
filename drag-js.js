var jobTask = {
  planned: [{name: '#name1', info: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}, {name: 'create repository', info: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}],
  indev: [{name: '#found capital investor', info: 'Lorem ipsum dolor sit amet.'}],
  qa: [],
  production: []
};

function Card(obj, category) {
  this.htmlElem = `
    <div class="list__card js-card" data-name="${obj.name}" draggable="true">
      <div class="list__card-header">
        ${obj.name}
      </div>
      <div class="list__card-info">
        ${obj.info}
      </div>
    </div>
  `;

  this.plusTask = function() {
    let categoryBlock = document.querySelector(`#${category}`);

    categoryBlock.innerHTML += this.htmlElem;
  }
}

var z = 0;

var dragElemBlock = '';
var dragItem;

function dragAndDrop() {
  const cards = document.querySelectorAll('.js-card');
  const cells = document.querySelectorAll('.js-cell');


  //FUNCTION FOR CARD
  //#start
  const dragStart = function() {
    setTimeout(() => {
      this.classList.add('hide');
      dragElemBlock = this;

      let dragName = dragElemBlock.getAttribute('data-name');
      let arrCategory = dragElemBlock.closest('li').getAttribute('data-title');

      console.log(dragName, arrCategory);

      jobTask[arrCategory].forEach((item, index) => {
        if(item.name == dragName) {
          dragItem = item;
          jobTask[arrCategory].splice(index, 1);
        }
      })
    }, 0);
  };

  //#end
  const dragEnd = function() {
    this.classList.remove('hide');

    let dragName = dragElemBlock.getAttribute('data-name');
    let arrCategory = dragElemBlock.closest('li').getAttribute('data-title');

    jobTask[arrCategory].push(dragItem);

    console.log(jobTask);
    dragElemBlock = '';
  };


  //FUNCTION FOR CELL
  const dragOver = function(evt) {
    evt.preventDefault();
  };

  const dragEnter = function(evt) {
    evt.preventDefault();
    this.classList.add('hovered');
  };

  const dragLeave = function() {
    this.classList.remove('hovered');
  };

  const dragDrop = function() {
    var elem = this;

    elem.append(dragElemBlock);
    elem.classList.remove('hovered');
  };


  //addEventListeners iteration
  cells.forEach(cell => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dragDrop);
  });

  cards.forEach(elem => {
    elem.addEventListener('dragstart', dragStart);
    elem.addEventListener('dragend', dragEnd);
  })
};

//ВЫЗЫВАЕМ ФУНКЦИЮ ДЛЯ НАЧАЛА РАБОТЫ ПРИЛОЖЕНИЯ
document.addEventListener('DOMContentLoaded', function() {
  console.log(jobTask);

  Object.keys(jobTask).forEach((item, index) => {
    let categoryName = item;
    let arr = jobTask[item];

    arr.forEach((item, index) => {
      let newElem = new Card(item, categoryName);
      newElem.plusTask();
    });
  });

  dragAndDrop();
});
