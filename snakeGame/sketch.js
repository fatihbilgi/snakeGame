let apple;
let gap = 15; //gap between grid lines
let snake;
let pLoc = {};
let highest = 0;
let game_over = new Audio('assets/game_over.mp3');
let eat = new Audio('assets/eat.mp3');
var screen = 0;


function setup() {
    bg = loadImage('assets/background2.jpg');
    bgMenu = loadImage('assets/backgroundmenu.jpg');
    bgGameOver = loadImage('assets/backgroundGameOver.jpg');
    createCanvas(405, 495);
    apple = new Fruit();
    snake = new Head();
    frameRate(12);
    textSize(14);
    textStyle(BOLD);

    for (let i = 0; i < 2; i++) {
        snake.tails.push(new Tail(snake.x, snake.y + (15 * i)));
    }
}

function draw() {
    if (screen == 0) {
    menuScreen(); // function for menu screen
  } else if (screen == 1) {
    gameScreen();
  } else if (screen == 2) {
    gameOverScreen();
  }
}
    
function menuScreen() {
  background(bgMenu);
  
  
  textSize(22);
  fill('#D9D9D9');
  text('Talimatlar',150,160);
  fill('black');
  noStroke();
  textSize (15);
  text ('1) Yukarı hareket için "yukarı ok" tuşunu kullanınız.', 20, 200);
  text ('2) Sağa hareket için "sağ ok" tuşunu kullanınız.', 20, 220);
  text ('3) Aşağı hareket için "aşağı ok" tuşunu kullanınız.', 20, 240);
  text ('4) Sola hareket için "sol ok" tuşunu kullanınız.', 20, 260);
  text ('5) Oyundaki amacınız yılanınızın kenarlara ve\n kendi gövdesine çarpmadan elmayı yiyerek\n olabildiğince büyümesidir.', 20, 280);
  textSize(17);
  fill('red');
  text('Başlamak için sol tıklatın',120,400);
}


function gameScreen() {
  background(bg);

    
    noFill();
    noStroke();
    for (let i = 0; i < height; i += gap) {
        for (let j = 0; j < width; j += gap) {

            rect(j, i, gap, gap);

        }
    }
    
    for (let i = snake.tails.length - 1; i >= 0; i--) {
        if (i == 0) {
            snake.tails[i].x = snake.x;
            snake.tails[i].y = snake.y;
        } else {
            snake.tails[i].x = snake.tails[i - 1].x;
            snake.tails[i].y = snake.tails[i - 1].y;
        }
        snake.tails[i].show();
    }


    pLoc.x = snake.x;
    pLoc.y = snake.y;
    snake.update();

    if (snake.collision(apple)) {
        eat.play();
        snake.score++;
        apple.eat();
        snake.tails.push(new Tail(pLoc.x, pLoc.y));
    }
    if (snake.score > highest) {
        highest = snake.score;
    }
    if (snake.collision(apple) == false || snake.tail_collide() == true) {
        
        gameOverScreen();
      
        
    }

    apple.show();
    
    textSize(15);
    fill('#fff');
    text("Skor: " + int(snake.score), 10, height - 25);
    text("Rekor: " + int(highest), 10, height - 10);
    snake.show();
    noFill();
    strokeWeight(4);
    stroke(43, 51, 25);
    rect(1, 1, width - 2, height - 2);

}

function keyPressed() {
    if (keyCode == LEFT_ARROW && snake.dir != 'right') {
        snake.dir = 'left';
    } else if (keyCode == RIGHT_ARROW && snake.dir != 'left') {
        snake.dir = 'right';
    } else if (keyCode == UP_ARROW && snake.dir != 'down') {
        snake.dir = 'up';
    } else if (keyCode == DOWN_ARROW && snake.dir != 'up') {
        snake.dir = 'down';
    }
}
function gameOverScreen() {
 
  background (bgGameOver);
  fill ('white');
  textSize(40);
  text ('Game over',100,150);
  textSize(20);
  text('Please click to restart the game',60,300);
  
  if(mouseIsPressed==true){
    game_over.play();
    snake.redefine();
    apple.eat();
  }
  
}

function mousePressed() {
  if(screen == 0) {
    startGame();
  }
}

function startGame() {
  screen = 1;
}

