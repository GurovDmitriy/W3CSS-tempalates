'use strict';

const modalBtn = document.querySelector('.usr-modal-btn');
const modal = document.querySelector('.w3-modal');
const modalClose = document.querySelector('.usr-modal-btn-close');

modalBtn.onclick = function () {
  modal.classList.add('usr-show');
}

modalClose.onclick = function () {
  modal.classList.remove('usr-show');
}
