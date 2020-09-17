'use strict'

const burger = document.querySelector('.usr-burger');
const menu = document.querySelector('.usr-menu');
const overlay = document.querySelector('.w3-overlay');

burger.onclick  = function () {
  if (burger.classList.contains('usr-burger--open')) {
    burger.classList.toggle('usr-burger--close');
  } else {
    burger.classList.add('usr-burger--open');
  }

  menu.classList.toggle('usr-hidden');
  overlay.classList.toggle('usr-show');
}

overlay.onclick  = function () {
  burger.classList.add('usr-burger--close');
  menu.classList.add('usr-hidden');
  overlay.classList.remove('usr-show');
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    burger.classList.add('usr-burger--close');
    menu.classList.add('usr-hidden');
    overlay.classList.remove('usr-show');
  }
}

// set the observer options
let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

// create observer
const observer = new IntersectionObserver( entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      // add an observed class to the section
      entry.target.classList.add('observed');
      // check the section's id
      document.querySelectorAll('nav a').forEach( link => {
        if(link.hash === `#${entry.target.id}`) {
          link.classList.add('w3-black');
        } else {
          link.classList.remove('w3-black');
        }
      });
    };
  });
}, options);
// Observe all sections that have an `id` applied
document.querySelectorAll('section[id]').forEach(section => {
  observer.observe(section);
});

