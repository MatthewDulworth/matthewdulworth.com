// ------- elelments ------- //
let letters = document.querySelectorAll(".letter");
let scrollBtn = document.querySelector(".scroll-btn");

// ------- vars ------- //
// safari detection adapted from: https://blog.kiprosh.com/browser-detection-using-javascript/
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// ------- on page load ------- //
window.onload = async () => {
   let name = new WordAssembleAnimation(letters, 300, 300, 500, 0);
   await name.animate();

   scrollBtn.classList.add("visible");
};