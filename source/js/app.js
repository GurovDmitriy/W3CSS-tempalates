'use strict'

const btnSlide = document.querySelector('.usr-btn-slide');
const slides = document.querySelectorAll('.slide');

let slideIndex = 1;
showDivs(slideIndex);

btnSlide.onclick = function() {
  plusDivs(1);
}

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  let i;
  let x = slides;
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

const modalBtns = document.querySelectorAll('.usr-modal-btn');
const modal = document.querySelector('.w3-modal');
const modalClose = document.querySelector('.usr-modal-btn-close');

for (let i = 0; i < modalBtns.length; i++) {
  modalBtns[i].onclick = function () {
    modal.classList.add('usr-show');
  }
}



modalClose.onclick = function () {
  modal.classList.remove('usr-show');
}
