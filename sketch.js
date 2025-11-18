let spriteSheet;
let frames = [];
const FRAME_COUNT = 8;
let frameWidth, frameHeight;
let animationSpeed = 8;
let playing = false;
let currentFrame = 0;
let animationFPS = 12;
let frameInterval = 1000 / animationFPS;
let frameTimer = 0;

function preload() {
  spriteSheet = loadImage('1_all.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  frameRate(60);
  frameWidth = Math.floor(spriteSheet.width / FRAME_COUNT);
  frameHeight = spriteSheet.height;
  for (let i = 0; i < FRAME_COUNT; i++) {
    let sx = i * frameWidth;
    frames[i] = spriteSheet.get(sx, 0, frameWidth, frameHeight);
  }
}

function draw() {
  background('#f4f0bb');
  if (playing) {
    frameTimer += deltaTime;
    if (frameTimer >= frameInterval) {
      let steps = floor(frameTimer / frameInterval);
      currentFrame = (currentFrame + steps) % FRAME_COUNT;
      frameTimer = frameTimer % frameInterval;
    }
  }

  let img = frames[currentFrame];
  image(img, width / 2, height / 2);

  // 顯示提示文字（當未播放時）
  if (!playing) {
    noStroke();
    fill(0, 160);
    textAlign(CENTER, TOP);
    textSize(18);
    text('按一下滑鼠開始 / 暫停動畫', width / 2, height / 2 + frameHeight / 2 + 12);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // 點擊切換播放/暫停
  playing = !playing;
}
