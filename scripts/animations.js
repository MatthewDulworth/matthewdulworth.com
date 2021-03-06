'use strict';

// ----------------------------------------------------------------
// elements
// ----------------------------------------------------------------
let navBtns = document.querySelectorAll(".trigger div");
let subtitle = document.querySelector("#subtitle");
let titleLine = document.querySelector(".titleLine");
let themeBtn = document.querySelector("#theme-btn");
let nameLetters = document.querySelectorAll(".letter");
let name = document.querySelector("#name");
let pics = document.querySelectorAll(".box-img");
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
   subtitle.classList.remove("hidden");
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
   // light-mode styles
   if (isDark) {
      root.style.setProperty('--main-color', "black");
      root.style.setProperty('--secondary-color', "rgb(90,90,90)");
      root.style.setProperty('--background-color', "white");
      pics.forEach(pic => pic.style.setProperty('box-shadow', "0px 0px 10px 3px rgba(0,0,0,0.5)"));
      isDark = false;
   }
   // dark-mode styles
   else {
      root.style.setProperty('--main-color', "white");
      root.style.setProperty('--secondary-color', "#7f7f7f");
      root.style.setProperty('--background-color', "black");
      pics.forEach(pic => pic.style.setProperty('box-shadow', "0px 0px 10px 3px rgba(270,270,270,0.2)"));
      isDark = true;
   }
}



// ----------------------------------------------------------------
// handle name animation
// ----------------------------------------------------------------
name.addEventListener('click', () => animateName(nameLetters));
let running = false;

async function animateName(elements) {
   if (!running) {
      running = true;
      name.style.setProperty('cursor', "auto");
      subtitle.classList.remove("transition");
      titleLine.classList.remove("transition");
      subtitle.classList.add("hidden");
      titleLine.classList.add("hidden");

      let xSpread = 300, ySpread = 300;
      if (window.innerWidth < 600) {
         xSpread = 90;
         ySpread = 200;
      }
      let anim = new WordExplodeAnimation(elements, xSpread, ySpread, 500, 0);
      await anim.run();

      subtitle.classList.add("transition");
      titleLine.classList.add("transition");
      subtitle.classList.remove("hidden");
      titleLine.classList.remove("hidden");
      name.style.setProperty('cursor', "pointer");
      running = false;
   }
}