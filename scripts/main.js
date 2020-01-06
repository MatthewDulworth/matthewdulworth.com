let scrollWrapper = document.querySelector(".scroll-wrapper");
let nameElements = document.querySelectorAll(".name");
let scrollBtn = document.querySelector(".scroll-btn");
let nameWrapper = document.querySelector("#name-wrapper");
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

window.onload = async () => {
   let name = new Name(nameElements, 100, 100, 500);
   await name.animate();

   scrollBtn.classList.add("visible");
}

nameWrapper.addEventListener('click', e =>{
   let name = new Name(nameElements, 100, 100, 100);
   name.animate();
});

scrollBtn.addEventListener('click', e => {
   if (isSafari) {
      safariScroll(100);
   }
   else {
      scrollWrapper.scrollTop += 1000;
   }
});

// hacky way to scroll on safari cuz safari sorta sucks and wont scroll the normal way like a normal browser
async function safariScroll(px) {
   for (let i = 1; i <= px; i++) {
      scrollWrapper.scrollTop += i;
      await new Promise(r => setTimeout(r, 0));
   }
}