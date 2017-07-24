function createLars(x,y){
  lars = createSprite(x, y);
  lars.mass = 10;
  lars.scale=1;
  lars.addAnimation("sweat","assets/sweat-01.png", "assets/sweat-04.png" );
  lars.addAnimation("still","assets/lars.png");
  lars.setCollider("circle", 0, 0, 60);
}


function showLars(){
    lars.changeAnimation("still");
    lars.scale=1;
    
}
function showSweat(){

  lars.changeAnimation("sweat");
  lars.scale=lars.scale-0.0001;
  microBit.writeMatrixIcon(hot);
}

function updateLars(){
    var dx = targetX - xpos;
    if(abs(dx) > 1) {
      xpos += dx * easing;
    }
    // calculate the new ypos value
    var dy = targetY - ypos;
    if(abs(dy) > 1) {
      ypos += dy * easing;
    }
  lars.position.x=xpos;
  lars.position.y=ypos;
  targetX = xpos - moveX/100;
  targetY = ypos - moveY/100;

}

function createBoats(type, x, y,s) {
  var a = createSprite(x, y);
  a.type = type;
  // console.log(type);
  var img  = loadImage("assets/"+type+".png");
  a.addImage(img);
  a.setSpeed(s, 0);
  a.rotationSpeed = 0;
  //a.debug = true;
  a.scale = .2;

  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 100);
  boats.add(a);
  return a;
}

function boatHit(boats, lars) {

for(var i=0; i<10; i++) {
  var p = createSprite(boats.position.x, boats.position.y);
  p.addImage(loadImage('assets/container.png'));
  p.setSpeed(random(0.1,0.2), random(360));
  p.scale=0.2;
  p.mass=0.1;
  p.life=200;
  containers.add(p);

  }
hits=hits+1;
boats.remove();

}
