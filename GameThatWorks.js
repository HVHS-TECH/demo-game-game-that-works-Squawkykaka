let player;
let playersize = 50;
let score = 0;

let timer = 10
let scoreGoal = 15

let gameState = 0;

let coinGroup;

function setup() {
    const SCREEN_WIDTH = windowWidth
    const SCREEN_HEIGHT = windowHeight

    const cnv = new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT)
    coinGroup = new Group()
    textSize(50)
}

function setupGame() {
    player = new Sprite(500, 500, 50, 50)

    spawnCoins(scoreGoal)
}

function draw() {
    background('blue')
    gameManager()

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
    }

    if(timer <= 0 && score < scoreGoal) {
        gameState=2
    } else if (timer <= 0 && score == scoreGoal) {
        gameState=3
    }
}

function spawnCoins(amount) {
    for (let i = 0; i < amount; i++) {
        coin = new Sprite(random(windowWidth), random(windowHeight), 20)
        coin.color = 'yellow'
        coinGroup.add(coin)
    }
}

function gameManager() {
    switch(gameState) {
        case 0:
            startScreen()
            break;
        case 1:
            gameLoop()
            break;
        case 2:
            lostGame()
            break;
        case 3:
            wonGame()
            break;
    }
}

function startScreen() {
    background('purple')
    text("Click the mouse to start", windowWidth/2, windowHeight/2)
}

function gameLoop() {
    player.moveTowards(mouse, 0.05)
    
    text("Score: " + score, 50, 50)
    text("Timer: " + timer, 50, 100)

    coinGroup.collides(player, (coin) => {
        coin.remove()
        score++;
    })
}

function lostGame() {
    allSprites.remove()
    background('red')

    text("You lost!", windowWidth/2, windowHeight/2)
    text("You got " + score + " points!", windowWidth/2, windowHeight/2+50)
    text("Click the mouse to restart!", windowWidth/2, windowHeight/2+100)
}

function wonGame() {
    allSprites.remove()
    background('green')

    text("You won!!", windowWidth/2, windowHeight/2)
    text("You got " + score + " points!", windowWidth/2, windowHeight/2+50)
    text("Click the mouse to restart!", windowWidth/2, windowHeight/2+100)
}

function mouseReleased() {
    if ( gameState == 0 || gameState == 2 || gameState == 3) {
        timer = 10
        score = 0
        setupGame()
        gameState=1
    }
}