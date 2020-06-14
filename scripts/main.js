// ------- elements ------- //
let scrollBtns = document.querySelectorAll(".trigger div");

scrollBtns.forEach(btn => btn.addEventListener('click', () => scroll(btn)));

function scroll(button){
   console.log(`yeet: ${button.textContent}`);
   setCurrentTab(button);
}

function setCurrentTab(button){
   if(button.id != "current-tab"){
      for(btn of scrollBtns) {
         if (btn.id === "current-tab"){
            btn.id = "";
         }
      }
      button.id = "current-tab";
   }
}