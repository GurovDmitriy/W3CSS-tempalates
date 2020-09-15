'use strict';

const gridBtn = document.querySelector('.usr-grid-btn');
const imgs = document.querySelectorAll('.w3-image');
const row = document.querySelector('.w3-row');

gridBtn.onclick = function () {
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].classList.toggle('w3-margin-bottom');
  }

  row.classList.toggle('w3-row-padding');
}

modalClose.onclick = function () {
  modal.classList.remove('usr-show');
}
