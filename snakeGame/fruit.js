let appleImg;
function preload(){
  appleImg = loadImage('assets/apple.png');
}
class Fruit {

    constructor() {
        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;
    }

    eat() {

        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;

        if (this.x == snake.x || this.y == snake.y) {
            this.eat();
        }
    }

    show() {
        image(appleImg,this.x,this.y,gap,gap,4);
        //fill(42, 51, 25);
        //rect(this.x, this.y, gap, gap, 4);
    }

}

