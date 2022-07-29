`use strict`;
window.addEventListener(`load`, () => {
  const itemsContainer = document.querySelector(`.container`);
  const length = 7;
  const itemsArray = [];
  const itemColours = [`aqua`, `blue`, `yellow`, `purple`, `red`];
  let draggedItemColor;
  let replacedItemColor;
  let draggedItemId;
  let replacedItemId;
  function createItems() {
    let i = 0;
    for (; i < length * length; ) {
      const item = document.createElement(`div`);
      let randomColour = Math.floor(Math.random() * itemColours.length);
      item.setAttribute(`draggable`, true);
      item.setAttribute(`id`, i);
      item.style.backgroundColor = itemColours[randomColour];
      itemsContainer.append(item);
      itemsArray.push(item);
      ++i;
    }
  }
  createItems();

  itemsArray.forEach((item) =>
    item.addEventListener(`dragstart`, dragStartItem)
  );
  itemsArray.forEach((item) => item.addEventListener(`dragover`, dragOverItem));
  itemsArray.forEach((item) => item.addEventListener(`drop`, dropItem));
  itemsArray.forEach((item) =>
    item.addEventListener(`dragenter`, dragEnterItem)
  );
  itemsArray.forEach((item) =>
    item.addEventListener(`dragleave`, dragLeaveItem)
  );
  itemsArray.forEach((item) => item.addEventListener(`dragend`, dragEndItem));
  function dragStartItem() {
    draggedItemColor = this.style.backgroundColor;
    draggedItemId = +this.id;
    console.log(draggedItemId);
  }
  function dragOverItem(ev) {
    ev.preventDefault();
  }
  function dropItem() {
    replacedItemColor = this.style.backgroundColor;
    replacedItemId = +this.id;
    this.style.backgroundColor = draggedItemColor;
    itemsArray[draggedItemId].style.backgroundColor = replacedItemColor;
    console.log(replacedItemColor);
  }
  function dragEnterItem(ev) {
    ev.preventDefault();
  }
  function dragLeaveItem() {
    console.log(`leave`);
  }
  function dragEndItem() {
    let validMoves = [
      draggedItemId - 1,
      draggedItemId + 1,
      draggedItemId - length,
      draggedItemId + length,
    ];
    let isAValidMove = validMoves.includes(replacedItemId);
    if (isAValidMove && replacedItemId) {
      replacedItemId = null;
    } else if (!isAValidMove && replacedItemId) {
      itemsArray[replacedItemId].style.backgroundColor = replacedItemColor;
      itemsArray[draggedItemId].style.backgroundColor = draggedItemColor;
    } else itemsArray[draggedItemId].style.backgroundColor = draggedItemColor;

    // checks
    function checkColumnMatch() {
      let i = 0;
      for (; i < 46; ) {
        let matchThree = [i, i + 1, i + 2];
        let correctItemColor = itemsArray[i].style.backgroundColor;
        let isBlank = itemsArray[i].style.backgroundColor === ``;
        if (
          matchThree.every(
            (index) =>
              itemsArray[index].style.backgroundColor === correctItemColor &&
              !isBlank
          )
        ) {
          matchThree.forEach(
            (index) => (itemsArray[index].style.backgroundColor = ``)
          );
        }
        ++i;
      }
    }
    checkColumnMatch();
    function checkRowMatch() {
      let i = 0;
      for (; i < 42; ) {
        let matchThree = [i, i + length, i + length * 2];
        let correctItemColor = itemsArray[i].style.backgroundColor;
        let isBlank = itemsArray[i].style.backgroundColor === ``;
        if (
          matchThree.every(
            (index) =>
              itemsArray[index].style.backgroundColor === correctItemColor &&
              !isBlank
          )
        ) {
          matchThree.forEach(
            (index) => (itemsArray[index].style.backgroundColor = ``)
          );
        }
        ++i;
      }
    }
    checkRowMatch();
  }
});
