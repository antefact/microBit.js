var microBit;
var canvas;
var button;
var MARGIN = 40;

//SPRITES VARIABLES
var boats;
var boatsImage;
var containers;
var lars;
var larsImage;
var sweat, still;

//Character moves variables
// x position variable
var xpos;
// y position variable
var ypos;

// target x and y positions
var targetX;
var targetY;
// easing variable
var easing = 0.05;

//API VARIABLES
var localTemp;

// microBit variables
var moveX, moveY;
var larsTemp;

var ok = [
  ['0', '0', '0', '0', '0'],
  ['1', '0', '0', '0', '1'],
  ['1', '0', '0', '0', '1'],
  ['0', '1', '1', '1', '0'],
  ['0', '0', '0', '0', '0']
]

var hot= [
  ['0', '1', '1', '1', '0'],
  ['1', '0', '0', '0', '1'],
  ['1', '0', '0', '0', '1'],
  ['1', '0', '0', '0', '1'],
  ['0', '1', '1', '1', '0']
]

// Game variables
var hits;
var waterLevel;
var parsed;


function preload() {
  fontBold=loadFont("assets/RobotoMono-Bold.ttf");
  var url = 'https://api.apixu.com/v1/current.json?key=513d8003c8b348f1a2461629162106&q=SHA';
  loadJSON(url, gotWeather);
  sweat = loadAnimation("assets/sweat-01.png", "assets/sweat-04.png");
  still = loadAnimation("assets/lars.png");
}

function setup() {
//Let's create a full screen canvas
createCanvas(windowWidth, windowHeight);
xpos=width/2;
ypos=height/2

// Here we add the microbit
microBit=new uBit();

// Here we create the pairing interface
button = createButton('connect microBit');
button.position(width/2-50,height-40);
button.mousePressed(searchDevice); // attach button listener

boats = new Group();
containers=new Group();

for(var i = 0; i<20; i++) {
  var ang = random(360);
  var px = width/2 + 1000 * cos(radians(ang));
  var py = int(random(0,height));
  var sp= random(0.1,0.3);
  createBoats("boat", px, py, sp);
  }

  createLars(width/2, height/2);

  hits= 0;
  waterLevel=0;
  parsed=0;


}

function draw() {
  // Comment this out to avoid having your console flooded with numbers


  background(0,140,255);

  if (microBit.connected){
    get_Microbit_values();
    if  (larsTemp>localTemp-5){
      meltingTitle();
      console.log("it's " + larsTemp+ " i'm melting !!")
      showSweat();
      microBit.writeMatrixIcon(hot);
      waterLevel=waterLevel+0.00001
      parsed= parseFloat(Math.round(waterLevel * 100) / 100).toFixed(2);

    } else{
      boatsTitle();
      showLars();
      microBit.writeMatrixIcon(ok);
    }
  } else {
    connectTitle()
  }

  updateBoats();
  updateLars();
  defineCollisions();
  drawSprites();
}


function defineCollisions(){
  boats.bounce(boats);
  boats.bounce(containers);
  containers.bounce(lars);
  boats.collide(lars, boatHit);
}

function updateBoats(){
  for(var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
    if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
    if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
    if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
  }
}

function connectTitle(){
  textFont(fontBold);
  fill(255,255, 255);
  textAlign(CENTER);
  textSize(20);
  text("Lars is a game about ice, boats and climate change", width/2, 40);
  textSize(15);
  text("and a demo game for our microbit.js library and p5js", width/2, 60);
  text("Connect your microbit", width/2, height-60);
  //console.log(temp);
}



function boatsTitle(){
  textFont(fontBold);
  fill(255,255, 255);
  textAlign(CENTER);
  textSize(20);
  text("Keep Lars from melting and destroying boats.", width/2, 40);
  textSize(15);
  text("Lars is ok at "+ larsTemp+ " degrees. And so far you hit "+ hits+ " boats", width/2, 60);
  text("Water level +"+ parsed+" cm", width/2, height-60);
  //console.log(temp);
}

function meltingTitle(){
  textFont(fontBold);
  textAlign(CENTER);
  fill(255,255, 255);
  textSize(20);
  text("Keep Lars from melting and destroying boats.", width/2, 40);
  textSize(15);
  text("Lars is melting at "+ larsTemp+ " degrees! and so far you hit "+ hits+ " boats", width/2, 60);
  text("Water level +"+ parsed+" m", width/2, height-60);
  fill(255,255, 255);

}





function get_Microbit_values() {
  //console.log ("acceleration",microBit.getAccelerometer());
  moveX=microBit.getAccelerometer().x;
  moveY=microBit.getAccelerometer().y;
  larsTemp=microBit.getTemperature();
  //console.log ("x: "+ moveX);
  //console.log ("y: "+ moveY);
  //console.log ("temp: "+ larsTemp);
  //console.log ("temperature",microBit.getTemperature());
  //console.log ("bearing",microBit.getBearing());
  //console.log ("buttonA",microBit.getButtonA());
  //console.log ("buttonB",microBit.getButtonB());
}

function searchDevice(){
  microBit.searchDevice();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function gotWeather(weather) {
  localTemp = weather.current.temp_c;
}
