let player;
let playersize = 50;
let score = 0;

let timer = 10

let gameState = 0;

let coinGroup;
let buttonGroup;
let enemyGroup;


function setup() {
    const SCREEN_WIDTH = windowWidth
    const SCREEN_HEIGHT = windowHeight

    const cnv = new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT)
    coinGroup = new Group()
    buttonGroup = new Group()
    enemyGroup = new Group()

    textSize(50)
}

function draw() {
    gameManager()

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
    }

    if (timer <= 0) {
        gameState = 2
    }
}

function spawnCoins(amount) {
    for (let i = 0; i < amount; i++) {
        coin = new Sprite(random(windowWidth), random(windowHeight), 20)
        coin.color = 'yellow'
        coin.life = 60 * 2

        coinGroup.add(coin)
    }
}

function spawnEnemys(amount) {
    for (let i = 0; i < amount; i++) {
        enemy = new Sprite(random(windowWidth), random(windowHeight), 30, 30)
        enemy.color = 'red'

        enemyGroup.add(enemy)
    }
}

function gameManager() {
    switch (gameState) {
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
    textAlign('center')
    background('purple')
    text("Click the mouse to start", windowWidth / 2, windowHeight / 2)
    createNewButton("Begin", windowWidth / 2, windowHeight / 2 + 50)

    timer = 10000
}

function gameLoop() {
    textAlign("left")

    background('#453c3b')

    text("Score: " + score, 50, 50)
    text("Timer: " + timer, 50, 100)

    coinGroup.collides(player, (coin) => {
        coin.remove()
        score++;
        timer += 2
    })

    enemyGroup.collides(player, (enemy) => {
        gameState = 2
    })

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        spawnCoins(1)
    }

    if (random(0, 500) < 5) {
        spawnEnemys(random(3))
    }

}

function endScreen() {
    allSprites.remove()
    textAlign("center")

    background('green')

    text("You Died!", windowWidth / 2, windowHeight / 2)
    text("You got " + score + " points!", windowWidth / 2, windowHeight / 2 + 50)
    text("Click the mouse to restart!", windowWidth / 2, windowHeight / 2 + 100)

    createNewButton("Begin Again", windowWidth / 2, windowHeight / 2 + 150)
}

function resetGame() {
    timer = 10
    score = 0
    gameState = 1


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
    };

    spawnCoins(1)
}

/**
 * A function to spawn a button at the specified coords
 * @param {string} text The text to display
 * @param {x} x The x coord to spawn the button
 * @param {y} y The x coord to spawn the button
 */
function createNewButton(text, x, y) {
    button = new Sprite(x, y)
    button.text = text
    button.height = 60
    button.color = 'white'
    button.life = 2
    button.width = textWidth(text) + 20

    button.update = () => {
        if (button.mouse.pressing()) {
            resetGame()
        }
    }

    buttonGroup.add(button)
}