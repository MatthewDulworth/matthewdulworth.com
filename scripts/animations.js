'use strict';

let navBtns = document.querySelectorAll(".trigger div");
let subtitles = document.querySelectorAll("#subtitle span");
let titleLine = document.querySelector(".titleLine");

/**
 * Startup animations go here. 
 */
window.onload = async function () {
   await titleLoadAnimation(500, 500);
   await navBarLoadAnimation(100, 75);
}

/**
 * Animates in the the home page title. 
 * 
 * @param {*} startup The startup time before the animation starts.
 * @param {*} timeBetween The time between the line animation start and the subtitle animation start.
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
 * @param {*} startup The startup time before the animation starts.
 * @param {*} timeBetween The time between the button animations.
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
 * @param {*} speed The time to wait. 
 */
function time(speed) {
   return new Promise(r => setTimeout(r, speed));
}