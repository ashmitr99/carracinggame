var gameState = 'play';
var trackImg, track;
var policeImg, police;
var playercar, playercarImg;
var cycle, cycleImg;
var score = 0;
function preload() {
    trackImg = loadImage('track.png');
    policeImg = loadImage('police1.png');
    playercarImg = loadImage('playercar1.png');
    cycleImg = loadImage('cycle1.png');
}
function setup() {
    createCanvas(480,270);
    
    track = createSprite(240,135);
    track.addImage('track', trackImg)
    track.velocityY = 1;
    track.y = track.height/2;
    cycleGroup = new Group();
    policeGroup = new Group();
    playercar = createSprite(240,250);
    playercar.addImage('playercar', playercarImg);
    playercar.scale = 0.1;
}
function draw() {
    spawnCycles();
    spawnPolice();
     background(255);
    
    if (track.y > 150) {
        track.y = 135;
    }
    if(gameState === 'play') {
        if (keyDown('left_arrow')) {
            playercar.x = playercar.x -3;
        }
        if(keyDown('right_arrow')) {
            playercar.x = playercar.x + 3;
        }
        score = score + Math.round(getFrameRate()/50);
    }
    
    if(cycleGroup.isTouching(playercar) || policeGroup.isTouching(playercar)) {
        playercar.destroy();
        gameState = 'end';

    }
   drawSprites();
   textSize(20);
    fill(110);
     text('Score: ' + score, 380,50);
   if (gameState === 'end') {
        background('0')
        stroke('yellow');
        fill('yellow');
        textSize(30);
        text('Game over', 240, 135);
        
}
    }
    
     

function spawnCycles() {
    
    if (frameCount % 160 == 0) {
        cycle = createSprite(random(50,300),0 );
        cycle.addImage('cycle', cycleImg);
        cycle.scale = 0.1;
        
        cycle.velocityY = 2;
        cycleGroup.add(cycle);
    }
}
function spawnPolice() {
    
    if (frameCount % 140 == 0) {
        police = createSprite(random(200,450),0);
        police.addImage('police', policeImg);
        police.scale = 0.1;
        police.velocityY = 3;
        policeGroup.add(police);
    }
}