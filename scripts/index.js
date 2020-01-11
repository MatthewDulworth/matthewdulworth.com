// ------- elelments ------- //
let letters = document.querySelectorAll(".letter");
let scrollBtn = document.querySelector(".scroll-btn");

// ------- vars ------- //
// safari detection adapted from: https://blog.kiprosh.com/browser-detection-using-javascript/
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// ------- on page load ------- //
window.onload = async () => {

   await animateName(letters);
   scrollBtn.classList.add("visible");
};


async function animateName(elements) {
   let xSpread = 300, ySpread = 300;
   if (window.innerWidth < 600) {
      xSpread = 90;
      ySpread = 200;
   }
   let name = new WordAssembleAnimation(elements, xSpread, ySpread, 500, 0);
   await name.animate();
}