let nameElements = document.querySelectorAll(".name");
let scroll_btn = document.querySelector(".scroll-btn");
let name;

window.onload = async () => {
   name = new Name(nameElements, 100, 100);
   await name.animate();

  scroll_btn.classList.add("visible");
}