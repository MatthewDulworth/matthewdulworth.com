class Letter {
   constructor(element, parent) {
      this.element = element;
      this.element.style.left = 0 + "px";
      this.element.style.bottom = 0 + "px";
      this.parent = parent;
      this.setRandomPos();
   }

   setRandomPos() {
      let x = Math.floor(Math.random() * (this.parent.max_x - this.parent.min_x) + this.parent.min_x);
      let y = Math.floor(Math.random() * (this.parent.max_y - this.parent.min_y) + this.parent.min_y);
      this.setPos(x, y);
   }

   setPos(x, y) {
      this.element.style.left = x + "px";
      this.element.style.bottom = y + "px";
   }

   reduceX() {
      let current_x = this.currentX();
      if (current_x > 0) {
         this.element.style.left = (current_x - 1) + "px";
      }
      else if (current_x < 0) {
         this.element.style.left = (current_x + 1) + "px";
      }
   }

   reduceY() {
      let current_y = this.currentY();
      if (current_y > 0) {
         this.element.style.bottom = (current_y - 1) + "px";
      }
      else if (current_y < 0) {
         this.element.style.bottom = (current_y + 1) + "px";
      }
   }

   home() {
      return (this.currentX() === 0 && this.currentY() === 0);
   }

   currentX() {
      return parseInt(this.element.style.left);
   }

   currentY() {
      return parseInt(this.element.style.bottom);
   }
}

class Name {
   constructor(nameElements, max_x, max_y, delay) {
      this.max_x = max_x;
      this.min_x = -max_x + 1;
      this.max_y = max_y;
      this.min_y = -max_y + 1;
      this.delay = delay;

      this.initLetters(nameElements);
   }

   initLetters(nameElements) {
      this.letters = [];
      nameElements.forEach(element => {
         this.letters.push(new Letter(element, this));
      });
   }

   async animate() {
      let home = [];
      for (let i = 0; i < this.letters.length; i++) {
         home.push(false);
      }
      let quit = false;

      await new Promise(r => setTimeout(r, this.delay));

      while (!quit) {

         for (let i = 0; i < this.letters.length; i++) {
            this.letters[i].reduceX();
            this.letters[i].reduceY();

            if (this.letters[i].home()) {
               home[i] = true;
            }

            if (!home.includes(false)) {
               quit = true;
            }
         }

         await new Promise(r => setTimeout(r, 5));
      }

      return ("done");
   }
}