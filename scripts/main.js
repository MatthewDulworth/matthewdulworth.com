let nameElements = document.querySelectorAll(".name");
let name;

window.onload = async () => {
   name = new Name(nameElements, 100, 100);
   await name.animate();

   console.log("yeet");
}