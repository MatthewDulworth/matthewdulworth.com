'use strict';

// ----------------------------------------------------------------
// elements
// ----------------------------------------------------------------
let navBtns = document.querySelectorAll(".trigger div");
let subtitles = document.querySelectorAll("#subtitle span");
let titleLine = document.querySelector(".titleLine");
let themeBtn = document.querySelector("#theme-btn");
let root = document.documentElement;



// ----------------------------------------------------------------
// startup animations 
// ----------------------------------------------------------------
window.onload = async function () {
   await titleLoadAnimation(500, 500);
   themeBtn.classList.remove("hidden");
   navBarLoadAnimation(100, 75);
}

/**
 * Animates in the the home page title. 
 * 
 * @param {number} startup The startup time before the animation starts.
 * @param {number} timeBetween The time between the line animation start and the subtitle animation start.
 */
async function titleLoadAnimation(startup, timeBetween) {
   await time(startup);
   titleLine.classList.remove("hr-hide");
   await time(timeBetween);
   subtitles.forEach(sub => sub.classList.remove("hidden"));
}

/**
 * Animates in the nav bar. 
 * 
 * @param {number} startup The startup time before the animation starts.
 * @param {number} timeBetween The time between the button animations.
 */
async function navBarLoadAnimation(startup, timeBetween) {
   await time(startup);

   for (let btn of navBtns) {
      btn.classList.remove("hidden");
      await time(timeBetween);
   }
}

/**
 * Returns a timeout for async functions. 
 * 
 * @param {number} speed The time to wait. 
 */
function time(speed) {
   return new Promise(r => setTimeout(r, speed));
}



// ----------------------------------------------------------------
// handle light and dark themes
// ----------------------------------------------------------------
themeBtn.addEventListener('click', () => handleThemeChange());
let isDark = true;

/**
 * Handles changes for light and dark themes.
 */
function handleThemeChange() {
   if (isDark) {
      root.style.setProperty('--main-color', "black");
      root.style.setProperty('--secondary-color', "rgb(90,90,90)");
      root.style.setProperty('--background-color', "white");
      isDark = false;
   } else {
      root.style.setProperty('--main-color', "white");
      root.style.setProperty('--secondary-color', "#7f7f7f");
      root.style.setProperty('--background-color', "black");
      isDark = true;
   }
}
