'use strict'

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
          link.classList.add('w3-light-grey');
        } else {
          link.classList.remove('w3-light-grey');
        }
      });
    }
  });
}, options);
// Observe all sections that have an `id` applied
document.querySelectorAll('section[id]').forEach((section) => {
  observer.observe(section);
});
