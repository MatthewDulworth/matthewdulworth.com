'use strict';

// ----------------------------------------------------------------
// elements
// ----------------------------------------------------------------
let scrollItems = document.querySelectorAll(".scroll-item");
let scrollBtns = document.querySelectorAll(".trigger div");
let scrollBoxes = document.querySelectorAll(".scroll-box");
let scrollPane = document.querySelector("#scroll-pane");
let homeSection = document.querySelector("#home");
let navBar = document.querySelector("nav");



// ----------------------------------------------------------------
// handle mobile layout
// ----------------------------------------------------------------
const mediaQueryList = window.matchMedia("(max-width: 600px)");

handleNavBarMobileLayout(mediaQueryList);
mediaQueryList.addListener(handleNavBarMobileLayout);

/**
 * Changes nav bar dom position based on media query. 
 * 
 * @param {MediaQueryList} mql The media query list.
 */
function handleNavBarMobileLayout(mql) {

   let onMobile = mql.matches;
   let navBarMobile = (scrollPane.childNodes[0] == navBar);

   if (onMobile && !navBarMobile) {
      homeSection.appendChild(navBar);
      document.querySelector("#highlighted-btn").id = "";
   } else if (!onMobile && navBarMobile) {
      scrollPane.prepend(navBar);
      handleButtonHighlight();
   }
}



// ----------------------------------------------------------------
// handle scrolling
// ----------------------------------------------------------------

/**
 * Scrolls the scroll pane to the appropriate place based on the button clicked. 
 */
scrollBtns.forEach((btn, index) => btn.addEventListener('click', () => scrollItems[index].scrollIntoView({ behavior: 'smooth' })));

/**
 * Listens for the scroll event in the scroll pane and sets the highlighted scroll button accordingly.
 */
scrollPane.addEventListener('scroll', () => handleButtonHighlight());

/**
 * Highlights the correct button for scroll location. 
 * Disabled on mobile mode.
 */
function handleButtonHighlight() {
   if (!mediaQueryList.matches) {
      // Checks each scroll box to see if it is in the viewport, if so, sets the corresponding scroll button 
      scrollBoxes.forEach((box, index) => {
         if (inView(box)) {
            highlightButton(scrollBtns[index]);
         }
      });
   }
}

/**
 * Checks to see if the passed element is completely in the viewport.
 * 
 * @param {Element} element An html element. 
 * @return {boolean} True if the element is in the viewport. 
 */
function inView(element) {
   let bounds = element.getBoundingClientRect();
   let window_w = window.innerWidth || document.documentElement.clientWidth;
   let window_h = window.innerHeight || document.documentElement.clientHeight;
   // If bounding rect is entirely within the viewport, return true. 
   return (bounds.top >= 0 && bounds.left >= 0 && bounds.right <= window_w && bounds.bottom <= window_h);
}

/**
 * Highlights the passed scroll button as the current button. 
 * 
 * @param {Element} button A scroll button. 
 */
function highlightButton(button) {

   if (button.id != "highlighted-btn") {
      for (let btn of scrollBtns) {
         if (btn.id === "highlighted-btn") {
            btn.id = "";
         }
      }
      button.id = "highlighted-btn";
   }
}