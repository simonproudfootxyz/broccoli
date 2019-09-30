// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

const navTriggers = document.querySelectorAll('.mobile-nav-trigger');
navTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle('mobile-nav-active');
  });
});