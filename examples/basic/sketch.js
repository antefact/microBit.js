var microBit;
var canvas;
var button;

var iconLeft = [
  ['0', '0', '0', '0', '0'],
  ['0', '1', '0', '1', '0'],
  ['0', '0', '0', '0', '0'],
  ['1', '0', '0', '0', '1'],
  ['0', '1', '1', '1', '0']
]

var iconRight = [
  ['0', '0', '0', '0', '0'],
  ['0', '1', '0', '1', '0'],
  ['0', '0', '0', '0', '0'],
  ['0', '1', '1', '1', '0'],
  ['1', '0', '0', '0', '1']
]

function preload() {

}

function setup() {
  canvas = createCanvas(600, 400);

  microBit=new uBit();

  button = createButton('connect microBit');
  button.mousePressed(searchDevice); // attach button listener

  microBit.setButtonACallback(function(){
    console.log("buttonA pressed");
    microBit.writeMatrixIcon(iconLeft);

  });

  microBit.setButtonBCallback(function(){
    console.log("buttonB pressed");
    microBit.writeMatrixText("CIAO!");
  });

  microBit.onConnect(function(){
    console.log("connected");
  });

  microBit.onDisconnect(function(){
    console.log("disconnected");
  });

}

function draw() {
  background(23);
  if (microBit.connected){
    // console.log ("acceleration",microBit.getAccelerometer());
    // console.log ("temperature",microBit.getTemperature());
    // console.log ("bearing",microBit.getBearing());
  }

}

function searchDevice(){
  microBit.searchDevice();
}
