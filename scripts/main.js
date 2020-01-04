let main = document.querySelector("main");
let overlays = document.querySelectorAll(".overlay");
let atTop = true;
let moveFlag = false;
let scrollTimer = null;
let scrollStop = false;

window.onload = () =>{
   window.scrollTo(0, 0);
   console.log("yeete")
   console.log(atTop);
}

window.addEventListener('scroll', e => {
   window.clearTimeout(scrollTimer);
   scrollStop = false;
   scrollTimer = setTimeout(function() {
      scrollStop = true;
   }, 150);
   
   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      atTop = false;
   }
   else {
      atTop = true;

      if(moveFlag){
         moveflag = false;
         console.log("remove");
         removeSlideClasses(overlays);
      }
   }
});

main.addEventListener('mousemove', e => {
   if(!atTop && !moveFlag && scrollStop){
      console.log("add");
      moveFlag = true;
      addSlideClasses(overlays);
   }
});

function addSlideClasses(overlays){
   overlays.forEach(overlay => {
      if(overlay.classList.contains("right")){
         overlay.classList.add("slide-right");
      }
      else if(overlay.classList.contains("left")){
         overlay.classList.add("slide-left");
      }
   });
}

function removeSlideClasses(overlays){
   overlays.forEach(overlay => {
      if(overlay.classList.contains("right")){
         overlay.classList.remove("slide-right");
      }
      else if(overlay.classList.contains("left")){
         overlay.classList.remove("slide-left");
      }
   });
}