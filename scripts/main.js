// ------- vars ------- //
let scrollWrapper = document.querySelector(".scroll-wrapper");
let nameElements = document.querySelectorAll(".name");
let scrollBtn = document.querySelector(".scroll-btn");
let scrollBtnMobile = document.querySelector(".scroll-btn-mobile");
let nameWrapper = document.querySelector(".name-wrapper");
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
let mql = window.matchMedia('(max-width: 600px)');
let onMobile = false;

// ------- on page load do name animation ------- //
window.onload = async () => {
   onMobile = mql.matches;
   console.log("mobile")
   disableSelect(nameWrapper);
   disableSelect(scrollBtn);
   disableSelect(scrollBtnMobile);
   let name = new WordAssembleAnimation(nameElements, 200, 200, 500, 0);
   await name.animate();

   scrollBtn.classList.add("visible");
}

// ------- on name click run new name animation ------- //
nameWrapper.addEventListener('click', e => {
   let name = new WordAssembleAnimation(nameElements, 200, 200, 200, 0);
   name.animate();
});

// ------- scroll on scroll button click ------- //
scrollBtn.addEventListener('click', e => {
   console.log(onMobile);
   if (isSafari) {
      if(onMobile){
         safariScroll(43);
      } else{
         safariScroll(100);
      }
   }
   else {
      scrollWrapper.scrollTop += 1000;
   }
});

// ------- scroll on mobile scroll button click ------- //
scrollBtnMobile.addEventListener('click', e => {
   console.log(onMobile);
   if (isSafari) {
      safariScroll(50);
   }
   else {
      scrollWrapper.scrollTop += 800;
   }
});

// ------- check if on mobile or no ------- //
mql.addListener(e => {
   if (e.matches) {
      onMobile = true;
   } else {
      onMobile = false;
   }
});

// hacky way to scroll on safari cuz safari sorta sucks and wont scroll the normal way like a normal browser
async function safariScroll(px) {
   for (let i = 1; i <= px; i++) {
      scrollWrapper.scrollTop += i;
      await new Promise(r => setTimeout(r, 0));
   }
}

// the following three functions for text selection disabling are adapted from: https://solidlystated.com/scripting/proper-way-to-disable-text-selection-and-highlighting/
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