'use strict';

// ------- elements ------- //
let scrollBtns = document.querySelectorAll(".trigger div");
let scrollBoxes = document.querySelectorAll(".scroll-box");
let scrollPane = document.querySelector("#scroll-pane");
let navBar = document.querySelector("nav");
let scrollItems = document.querySelectorAll(".scroll-item");


// ------- event listeners ------- //
/**
 * Listens for the scroll event in the scroll pane and sets the highlighted scroll button accordingly. 
 */
scrollPane.addEventListener('scroll', () => {
   // Checks each scroll box to see if it is in the viewport, if so, sets the corresponding scroll button 
   scrollBoxes.forEach((box, index) => {
      if (inView(box)) {
         setCurrentTab(scrollBtns[index]);
      }
   });
});

/**
 * Scrolls the scroll pane to the appropriate place based on the button clicked. 
 */
scrollBtns.forEach((btn, index) => btn.addEventListener('click', () => scrollItems[index].scrollIntoView({behavior: 'smooth'})));

// ------- functions ------- //

/**
 * 
 * @param {Element} btn 
 * @param {number} index
 */
function scrollTo(btn, index) {
  
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
 * Removes sets the passed button to the current tab. 
 * 
 * @param {Element} button A scroll button. 
 */
function setCurrentTab(button) {
   if (button.id != "current-tab") {
      for (let btn of scrollBtns) {
         if (btn.id === "current-tab") {
            btn.id = "";
         }
      }
      button.id = "current-tab";
   }
}