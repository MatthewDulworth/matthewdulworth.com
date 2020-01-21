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

   // brings the x position closer to 0 by 1
   reduceX() {
      let current_x = this.currentX();
      if (current_x > 0) {
         this.element.style.left = (current_x - 1) + "px";
      }
      else if (current_x < 0) {
         this.element.style.left = (current_x + 1) + "px";
      }
   }

   // brings the y position closer to zero by 1
   reduceY() {
      let current_y = this.currentY();
      if (current_y > 0) {
         this.element.style.bottom = (current_y - 1) + "px";
      }
      else if (current_y < 0) {
         this.element.style.bottom = (current_y + 1) + "px";
      }
   }

   moveX(target, speed) {
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

   moveY(target, speed) {
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

   // checks if x and y coordinates are 0
   home() {
      return (this.currentX() === 0 && this.currentY() === 0);
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
// splits the word out into random positions and then reassembles it
// takes in a list of elements that are the letters of the name 
// elements should be spans with position: relative
// max x and y are the furthest a letter position can be randomized
// delay is the delay before animation starts after randomization
// speed is wait between animation frames
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

   async explode() {

      let lettersAtTarget = [];

      while (lettersAtTarget.length < this.letters.length) {

         this.letters.forEach(letter => {

            if (!letter.atTarget) {
               let xAtTarget = letter.moveX(letter.targetX, this.explodeSpeed);
               let yAtTarget = letter.moveY(letter.targetY, this.explodeSpeed);

               if (xAtTarget && yAtTarget) {
                  letter.atTarget = true;
                  lettersAtTarget.push(true);
               }
            }
         });
         await new Promise(r => setTimeout(r, this.speed));
      }
      return ("done");
   }

   async assemble() {
      let lettersAtHome = [];

      while (lettersAtHome.length < this.letters.length) {

         this.letters.forEach(letter => {

            if (!letter.atHome) {
               let xAt
            }
         });
      }
   }

   // runs the animation 
   async animate() {
      let home = [];
      for (let i = 0; i < this.letters.length; i++) {
         home.push(false);
      }
      let quit = false;


      await this.explode();

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

         await new Promise(r => setTimeout(r, this.speed));
      }

      return ("done");
   }
}