'use strict'

const leftBtn = document.querySelector('.usr-left-btn');
const rightBtn = document.querySelector('.usr-right-btn');
const indicators = document.querySelectorAll('.usr-indicator');

let slideIndex = 1;
showDivs(slideIndex);

leftBtn.onclick = function () {
  plusDivs(-1);
};

rightBtn.onclick = function () {
  plusDivs(1);
};

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  let i;
  const x = document.getElementsByClassName('slide');
  const dots = indicators;
  if (n > x.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = x.length; }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' w3-white', '');
  }
  x[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' w3-white';
}

// set the observer options
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

// create observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // add an observed class to the section
      entry.target.classList.add('observed');
      // check the section's id
      document.querySelectorAll('nav a').forEach((link) => {
        if (link.hash === `#${entry.target.id}`) {
          link.classList.add('w3-dark-grey');
        } else {
          link.classList.remove('w3-dark-grey');
        }
      });
    }
  });
}, options);
// Observe all sections that have an `id` applied
document.querySelectorAll('div[id]').forEach((section) => {
  observer.observe(section);
});
