let player;
let playersize = 50;
let score = 0;

let timer = 10

let gameState = 0;

let coinGroup;
let buttonGroup;

function setup() {
    const SCREEN_WIDTH = windowWidth
    const SCREEN_HEIGHT = windowHeight

    const cnv = new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT)
    coinGroup = new Group()
    buttonGroup = new Group()
    textSize(50)
}

function draw() {
    gameManager()

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
    }

    if(timer <= 0) {
        gameState=2
    }
}

function spawnCoins(amount) {
    for (let i = 0; i < amount; i++) {
        coin = new Sprite(random(windowWidth), random(windowHeight), 20)
        coin.color = 'yellow'
        coin.life=60*2

        // coin.update = () => {
        //     if(coin.life == 1) {
        //         gameState=2
        //     }
        // }

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
            endScreen()
            break;
    }
}

function startScreen() {
    background('purple')
    text("Click the mouse to start", windowWidth/2, windowHeight/2)
}

function gameLoop() {
    textAlign("left")

    background('blue')

    // player.moveTowards(mouse, 0.05)
    
    text("Score: " + score, 50, 50)
    text("Timer: " + timer, 50, 100)

    coinGroup.collides(player, (coin) => {
        coin.remove()
        score++;
        timer += 2
    })

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        spawnCoins(random(1))
    }

}

function endScreen() {
    allSprites.remove()
    textAlign("center")

    background('green')

    text("You Died!", windowWidth/2, windowHeight/2)
    text("You got " + score + " points!", windowWidth/2, windowHeight/2+50)
    // button = new Button("Hello", windowWidth, windowHeight-100)
    text("Click the mouse to restart!", windowWidth/2, windowHeight/2+100)
}

function mouseReleased() {
    if ( gameState == 0 || gameState == 2) {
        resetGame()
    }
}

function resetGame() {
    timer = 10
    score = 0
    gameState=1


    player = new Sprite(500, 500)

	player.update = () => {
		player.moveTowards(mouse, 0.07);
	};
	
	player.draw = () => {
		fill(237, 205, 0);

		push();
		rotate(player.direction);
		let w = 100 + player.speed;
		let h = 100 - player.speed;
		ellipse(0, 0, w, h);
		pop();

		// image(face, player.vel.x*2, player.vel.y*2);
	};

    spawnCoins(1)
}

class Button {
    constructor(text, x, y) {
        this.x = x
        this.y = y
        this.text = text
    }

    get text() {
        return this.text
    }
    
    draw() {
        textAlign("center")
        textWidth = textWidth(this.text)
        textHeight = textHeight(this.text)

        button = new Sprite(this.x, this.y, textWidth+8-4, textHeight+8-4)

        button.draw = () => {
            this.draw()
        }

        buttonGroup.add(button)
        text(this.text, this.x, this.y)
    }
}