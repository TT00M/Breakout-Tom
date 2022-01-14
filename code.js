var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a49c0c08-762d-478e-80c6-18fa4bd88dba","b471adda-be68-4434-afa0-d8104af1f8d1"],"propsByKey":{"a49c0c08-762d-478e-80c6-18fa4bd88dba":{"name":"tennisball_1","sourceUrl":null,"frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":12,"version":"Bfb4_Ayz5V0PPTQPSDUiUACNx6Zt6qvf","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/a49c0c08-762d-478e-80c6-18fa4bd88dba.png"},"b471adda-be68-4434-afa0-d8104af1f8d1":{"name":"animation_1","sourceUrl":null,"frameSize":{"x":76,"y":3},"frameCount":1,"looping":true,"frameDelay":12,"version":"M5mXGvk_uE1dIBsAtqwlAGvp.KPcOrZK","loadedFromSource":true,"saved":true,"sourceSize":{"x":76,"y":3},"rootRelativePath":"assets/b471adda-be68-4434-afa0-d8104af1f8d1.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

createEdgeSprites();

var estadodejogo= 'iniciar';

var bola = createSprite(200, 200);
bola.setAnimation("tennisball_1");
bola.scale=0.10;

var sprite = createSprite(200, 324);
sprite.setAnimation("animation_1");
sprite.scale=1.5;

var grupodeblocos= new Group();

var pontos= 0;
var vidas= 1;

function criarblocos(y,color){
  for (var i = 0; i < 6; i++) {
   var bloco = createSprite(65+54*i,y,50,25);
    bloco.shapeColor=color;
    grupodeblocos.add(bloco);
  }
}

criarblocos(65,'red');
criarblocos(65+29,'green');
criarblocos(65+29+29,'blue');
criarblocos(65+29+29+29,'yellow');


function draw() {
  background('white');
  textSize(20);
  text('Vidas: '+vidas,24,20);
  textSize(20);
  text("placar: "+pontos,300,20);

  sprite.x = bola.x;

  if(estadodejogo=='iniciar'){
    text("Clique na tela para começar",57,250);
    bola.x=200;
    bola.y=200;
    bola.velocityY=0;
    bola.velocityX=0;
  }

  else if(estadodejogo=='fimdejogo'){
    textSize(30); 
    text('Fim de jogo',100,200);
    bola.remove();
  }
  
  else{
    bola.bounceOff(leftEdge);
    bola.bounceOff(rightEdge);
    bola.bounceOff(topEdge);

    bola.bounceOff(grupodeblocos,quebrarblocos); 

    //sprite.x=World.mouseX;
    sprite.bounceOff(leftEdge);
    sprite.bounceOff(rightEdge);
    if(bola.bounceOff(sprite)){
      playSound("assets/category_app/app_interface_button_2.mp3");
    }

    if(pontos==24){
      textSize(30);
      text("você venceu",200,200);
      bola.velocityX=0;
      bola.velocityY=0;
    }

    if(bola.isTouching(bottomEdge)){
      vidasperdidas();
    }  
  }

  drawSprites();
}
  
function mousePressed() {
  if(estadodejogo=='iniciar'){
    estadodejogo='jogar';
    bola.velocityX=5;
    bola.velocityY=5;
  }
}

function quebrarblocos(bola,bloco){

  //bloco.destroy();
  bloco.velocityY = 4;
  playSound("assets/category_app/app_button_1.mp3");
  pontos=pontos+1;
  bola.velocityX+=0.5;
  bola.velocityY+=0.5;
  //grupodeblocos.setVelocityYEach(1);
  grupodeblocos.remove(bloco);

  //console.log("Y: "+ bloco.y + "  posicao:  " + posicao);


}


function vidasperdidas (){
  vidas=vidas-1;
  if(vidas>=1){
    estadodejogo='iniciar';
  }
  else{
    estadodejogo='fimdejogo';
  }
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
