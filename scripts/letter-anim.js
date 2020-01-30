// ------- class for each individual letter in a name ------- //
// element for each letter must be set to position: relative;
class Letter {
   constructor(element, parent) {
      this.element = element;
      this.element.style.left = 0 + "px";
      this.element.style.bottom = 0 + "px";
      this.parent = parent;
      this.targetX;
      this.targetY;
      this.atTarget = false;
      this.setRandomTarget();
   }

   // gives the element a random position based on the max and min set by the WordAssembleAnimation
   setRandomPos() {
      let x = Math.floor(Math.random() * (this.parent.max_x - this.parent.min_x) + this.parent.min_x);
      let y = Math.floor(Math.random() * (this.parent.max_y - this.parent.min_y) + this.parent.min_y);
      this.setPos(x, y);
   }

   setRandomTarget() {
      this.targetX = Math.floor(Math.random() * (this.parent.max_x - this.parent.min_x) + this.parent.min_x);
      this.targetY = Math.floor(Math.random() * (this.parent.max_y - this.parent.min_y) + this.parent.min_y);
   }

   // sets element position
   setPos(x, y) {
      this.element.style.left = x + "px";
      this.element.style.bottom = y + "px";
   }

   stepX(target, speed) {
      let currentX = this.currentX();

      // if the current x position is greater than the target x position 
      if (currentX > target) {

         if ((currentX - speed) < target) {
            this.element.style.left = (currentX - 1) + "px";
         } else {
            this.element.style.left = (currentX - speed) + "px";
         }
         return false;
      }

      // if it is smaller
      else if (currentX < target) {

         if ((currentX + speed) > target) {
            this.element.style.left = (currentX + 1) + "px";
         } else {
            this.element.style.left = (currentX + speed) + "px";
         }
         return false;
      }

      // if the current x position is at the target x, return true
      else {
         return true;
      }
   }

   stepY(target, speed) {
      let currentY = this.currentY();

      if (currentY > target) {

         if ((currentY - speed) < target) {
            this.element.style.bottom = (currentY - 1) + "px";
         } else {
            this.element.style.bottom = (currentY - speed) + "px";
         }
         return false;
      }

      else if (currentY < target) {

         if ((currentY + speed) > target) {
            this.element.style.bottom = (currentY + 1) + "px";
         } else {
            this.element.style.bottom = (currentY + speed) + "px";
         }
         return false;
      }

      else {
         return true;
      }
   }

   // gets current x position 
   currentX() {
      return parseInt(this.element.style.left);
   }

   // gets current y position 
   currentY() {
      return parseInt(this.element.style.bottom);
   }
}


// -------- class for a word assembly animation ------- //
class WordAssembleAnimation {
   constructor(nameElements, max_x, max_y, delay, speed) {
      this.max_x = max_x;
      this.min_x = -max_x + 1;
      this.max_y = max_y;
      this.min_y = -max_y + 1;
      this.delay = delay;
      this.speed = speed;
      this.explodeSpeed = 10;
      this.assembleSpeed = 1;

      this.initLetters(nameElements);
   }

   // creates array of letters
   initLetters(nameElements) {
      this.letters = [];
      nameElements.forEach(element => {
         this.letters.push(new Letter(element, this));
      });
   }

   async animate(explode) {

      // make sure no letters are at target
      let lettersAtTarget = [];
      this.letters.forEach(letter => letter.atTarget = false);

      // loop until all letters are at the target
      while (lettersAtTarget.length < this.letters.length) {

         // loop once for each letter
         this.letters.forEach(letter => {

            // if the letter is not at the target, step it towrads the target
            if (!letter.atTarget) {
               let xAtTarget
               let yAtTarget

               // step the letter to the target
               if (explode) {
                  xAtTarget = letter.stepX(letter.targetX, 10);
                  yAtTarget = letter.stepY(letter.targetY, 10);
               } else {
                  xAtTarget = letter.stepX(0, 1);
                  yAtTarget = letter.stepY(0, 1);
               }

               // check if the letter is at the target
               if (xAtTarget && yAtTarget) {
                  letter.atTarget = true;
                  lettersAtTarget.push(true);
               }
            }
         });
         await new Promise(r => setTimeout(r, this.speed));
      }
   }

   // runs the animation 
   async run() {
      await this.animate(true);
      await new Promise(r => setTimeout(r, this.delay));
      await this.animate(false);
   }
}