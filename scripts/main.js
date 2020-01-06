let scroll_wrapper = document.querySelector(".scroll-wrapper");
let nameElements = document.querySelectorAll(".name");
let scroll_btn = document.querySelector(".scroll-btn");
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

window.onload = async () => {
   let name = new Name(nameElements, 100, 100);
   await name.animate();

   scroll_btn.classList.add("visible");
}

scroll_btn.addEventListener('click', e => {
   if (isSafari) {
      safariScroll(100);
   }
   else {
      scroll_wrapper.scrollTop += 500;
   }
});

// hacky way to scroll on safari cuz safari sorta sucks and wont scroll the normal way like a normal browser
async function safariScroll(px) {
   for (let i = 1; i <= px; i++) {
      scroll_wrapper.scrollTop += i;
      await new Promise(r => setTimeout(r, 0));
   }
}