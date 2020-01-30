// ------- elelments ------- //
let letters = document.querySelectorAll(".letter");
let scrollBtn = document.querySelector(".scroll-btn");
let aboutSection = document.querySelector(".main-item.about");
let experienceSection = document.querySelector(".main-item.experience");
let projectsSection = document.querySelector(".main-item.projects");
let musicSection = document.querySelector(".main-item.music");

// ------- vars ------- //
// safari detection adapted from: https://blog.kiprosh.com/browser-detection-using-javascript/
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// ------- on page load ------- //
window.onload = async () => {
   loadBtn(aboutSection, ".about.btn.storage", ".about.content.storage");
   loadBtn(experienceSection, ".experience.btn.storage", ".experience.content.storage");
   loadBtn(projectsSection, ".projects.btn.storage", ".projects.content.storage");
   loadBtn(musicSection, ".music.btn.storage", ".music.content.storage");

   await animateName(letters);
   scrollBtn.classList.add("visible");
};

// ------- animate name ------- //
async function animateName(elements) {
   let xSpread = 300, ySpread = 300;
   if (window.innerWidth < 600) {
      xSpread = 90;
      ySpread = 200;
   }
   let name = new WordAssembleAnimation(elements, xSpread, ySpread, 500, 0);
   await name.run();
}

// ------- loads button html into an element ------- //
function loadBtn(parent, btnStorage, contentStorage) {
   parent.classList.add("btn");
   parent.innerHTML = document.querySelector(btnStorage).innerHTML;

   parent.querySelector(".trigger").addEventListener('click', e => {
      parent.classList.remove("btn");
      parent.classList.add("fullscreen");
      loadContent(parent, contentStorage, btnStorage);
      console.log("fullscreen");
   });
}

// ------- loads content into an element ------- //
function loadContent(parent, contentStorage, btnStorage) {
   parent.innerHTML = document.querySelector(contentStorage).innerHTML;
}