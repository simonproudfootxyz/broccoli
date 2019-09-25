// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

let chapterNav = {
  headingTitles: [],
  getHeadingTitles: function(headings) {
    headings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
      this.headingTitles.push({
        title: heading.innerText,
        scrollPos: heading.id
      });
    });
    let chapterMarkup = this.headingTitles.map(heading => `
      <li class="chapter-nav__list-item">
        <a class="chapter-nav__item" data-scroll="${heading.scrollPos}">${heading.title}</a>
      </li>
    `);
    document.getElementById('chapter-nav').innerHTML = chapterMarkup.join('');
  }
};

function getCoords(elem) { // crossbrowser version
  let box = elem.getBoundingClientRect();
  let body = document.body;
  let docEl = document.documentElement;
  let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  let clientTop = docEl.clientTop || body.clientTop || 0;
  let top  = box.top +  scrollTop - clientTop;
  return Math.round(top);
}

document.addEventListener('DOMContentLoaded', () => {
  const chapterHeadings = document.querySelectorAll('.content-heading');
  window.location.pathname != '/' ? chapterNav.getHeadingTitles(chapterHeadings) : null;

  const chapterNavItems = document.querySelectorAll('.chapter-nav__item');
  chapterNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      let scrollPos = getCoords(document.getElementById(item.dataset.scroll));
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    });
  });
  
  const navTriggers = document.querySelectorAll('.mobile-nav-trigger');
  navTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('mobile-nav-active');
    });
  });

  if(window.location.pathname != '/') {
    const backToTop = document.getElementById('back-to-top');
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }
});
