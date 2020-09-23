'use strict'

const gridBtn = document.querySelector('.usr-grid-btn');
const imgs = document.querySelectorAll('.w3-image');
const row = document.querySelector('.w3-row');

gridBtn.onclick = function () {
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].classList.toggle('w3-margin-bottom');
  }

  row.classList.toggle('w3-row-padding');
};

window.onscroll = function () { myFunction(); };
function myFunction() {
  const navbar = document.querySelector('.usr-nav-box');
  if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 270) {
    navbar.className = 'w3-top' + ' usr-nav-box' + ' w3-white';
  } else {
    navbar.className = navbar.className.replace('w3-top usr-nav-box w3-white', 'w3-top usr-nav-box');
  }
}
