let scrollWrapper = document.querySelector(".scroll-wrapper");
let nameElements = document.querySelectorAll(".name");
let scrollBtn = document.querySelector(".scroll-btn");
let nameWrapper = document.querySelector(".name-wrapper");
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

window.onload = async () => {
   disableSelect(nameWrapper);
   disableSelect(scrollBtn);
   let name = new Name(nameElements, 100, 100, 500, 5);
   await name.animate();

   scrollBtn.classList.add("visible");
}

nameWrapper.addEventListener('click', e => {
   let name = new Name(nameElements, 100, 100, 100, 5);
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

// the following three functions for text selection disabling are taken from: https://solidlystated.com/scripting/proper-way-to-disable-text-selection-and-highlighting/
function disableSelect(el) {
   if (el.addEventListener) {
      el.addEventListener("mousedown", disabler, "false");
   } else {
      el.attachEvent("onselectstart", disabler);
   }
}
function enableSelect(el) {
   if (el.addEventListener) {
      el.removeEventListener("mousedown", disabler, "false");
   } else {
      el.detachEvent("onselectstart", disabler);
   }
}
function disabler(e) {
   if (e.preventDefault) { e.preventDefault(); }
   return false;
}
