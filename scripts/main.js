// ------- elements ------- //
let scrollBtns = document.querySelectorAll(".trigger div");
let scrollBoxes = document.querySelectorAll(".scroll-box");
let scrollPane = document.querySelector("#scroll-pane");


// ------- event listeners ------- //
/**
 * Listens for the scroll event in 
 * 
 * @listens scroll 
 */
scrollPane.addEventListener('scroll', () => {
   scrollBoxes.forEach((box, index) => {
      if (inView(box)) {
         setCurrentTab(scrollBtns[index]);
      }
   });
});


// ------- functions ------- //
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
      for (btn of scrollBtns) {
         if (btn.id === "current-tab") {
            btn.id = "";
         }
      }
      button.id = "current-tab";
   }
}