let canvas;
let mode = -1;// -1: loading, 0: pause, 1: play
let word = {
  stack: [],
  update: true,//更新と見做すか？ 
  minLen: 5,// 最低限の文字数にはする
  pos: { x: 0, y: 0 },// 位置
  color: { h: 0, s: 50, b: 100 },// 色
  last: 0,
  maxDelta: 1000,
};
let myFont;
let camPos = { r: 500, theta: Math.PI * 0.4, phi: 0 };

function preload() {
  myFont = loadFont("https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Regular.otf");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  //textFont('Hachi Maru Pop', width / 30);
  textFont(myFont, width / 30);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0);
  switch (mode) {
    case -1:
      draw_loading();
      break;
    case 0:
      draw_init();
      break;
    case 1:
      draw_main();
      break;
  }
}

function draw_loading() {
  fill(255);
  textAlign(CENTER, CENTER);

  text("Now Loading...", 0, 0);
}

function draw_init() {
  fill(255);
  textAlign(CENTER, CENTER);
  text("click/touch to play", 0, 0);
}



function draw_main() {
  camera(
    camPos.r * Math.sin(camPos.theta) * Math.sin(camPos.phi),
    -camPos.r * Math.cos(camPos.theta),
    camPos.r * Math.sin(camPos.theta) * Math.cos(camPos.phi),
  );
  push();
  fill(255);
  stroke(0, 40, 100);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(min(width, height) * 0.1);
  pop();

  push();
  if (word.update) {
    word.pos.x = (Math.random() - 0.5) * width * 0.6;
    word.pos.y = (Math.random() - 0.5) * height * 0.8;
    word.color.h = Math.floor(Math.random() * 360);
    word.update = false;
  }
  fill(word.color.h, word.color.s, word.color.b);
  textAlign(CENTER, CENTER);
  text(word.stack.join(""), word.pos.x, word.pos.y);
  pop();
  camPos.phi += 0.02;
}

const animateWord = function (now, unit) {
  if (unit.contains(now) && word.stack[word.stack.length - 1] != unit.text) {
    if (word.stack.join("").length < word.minLen
      && Math.abs(now - word.last) < word.maxDelta) {
      word.stack.push(unit.text);
      word.update = false;
    } else {
      word.stack = [unit.text];
      word.update = true;
    }
    word.last = now;
  }
};

