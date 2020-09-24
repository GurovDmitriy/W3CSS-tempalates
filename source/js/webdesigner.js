'use strict'

const burger = document.querySelector('.usr-burger');
const menu = document.querySelector('.usr-menu');
const overlay = document.querySelector('.w3-overlay');

burger.onclick = function () {
  if (burger.classList.contains('usr-burger--open')) {
    burger.classList.toggle('usr-burger--close');
  } else {
    burger.classList.add('usr-burger--open');
  }

  menu.classList.toggle('usr-hidden');
  overlay.classList.toggle('usr-show');
};

overlay.onclick = function () {
  burger.classList.add('usr-burger--close');
  menu.classList.add('usr-hidden');
  overlay.classList.remove('usr-show');
};

window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    burger.classList.add('usr-burger--close');
    menu.classList.add('usr-hidden');
    overlay.classList.remove('usr-show');
  }
}

// scrollspy

const sections = document.querySelectorAll('section[id]');
const menu_links = document.querySelectorAll('nav a.w3-bar-item');

const makeActive = (link) => menu_links[link].classList.add('w3-black');
const removeActive = (link) => menu_links[link].classList.remove('w3-black');
const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));

const sectionMargin = 100;

let currentActive = 0;

window.addEventListener('scroll', () => {
  const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin) - 1;

  if (current !== currentActive) {
    removeAllActive();
    currentActive = current;
    makeActive(current);
  }
});
