var fundo
var player
var mask
var saw
var grupoSaw
var grupoMask
var gameOver, gameOverImg
var score=0
gameState="PLAY"




function preload() {
    fundoImg = loadImage("well.png");
    sawImg = loadImage("buzzsaw.png")
    maskImg = loadImage("mask.png")
    gameOverImg = loadImage("gameover.png")

    pulando=loadAnimation("jump.png")
    parado=loadAnimation("knight.png")
}

function setup() {
    createCanvas(600, 600);
    fundo=createSprite(300,300)
    fundo.addImage(fundoImg)
    fundo.scale=2.4

    player=createSprite(300,300)
    player.addAnimation("parado",parado)
    player.addAnimation("pulo",pulando)
    player.scale=0.3

    edges = createEdgeSprites();

    grupoSaw=new Group
    grupoMask=new Group
}

function draw() {
    background(200);

    if (gameState=="PLAY") {
       
        player.changeAnimation("parado")


        if(keyDown("left")){
            player.x-=3
        }
        if(keyDown("right")){
            player.x+=3
        }
        if(keyDown("space")){
            player.velocityY=-5
            player.changeAnimation("pulo")
        }
        
       
        player.velocityY+=0.8
        
    
        fundo.y+=3
        if(fundo.y>400){
            fundo.y=300
        }

        gerarObj()
        

        drawSprites();

        if(player.isTouching(grupoSaw)){
            gameState="END"
        }
        if(player.y>600){
            gameState="END"
        }

        if(player.isTouching(grupoMask)){
            grupoMask.destroyEach(  )
            score++
        }

        fill("white")
        textSize(20)
        text("Máscaras: "+score,20,20)
    }
    if (gameState === "END") {
        background(0);
        fill("red");
        textSize(70);
        text("GAME OVER", 90, 300);

    }
}


function gerarObj() {
if(frameCount%100==0){
    saw=createSprite(100,0,10,10)
    saw.x=player.x 
    saw.velocityY=3
    saw.scale=0.5 
    saw.addImage(sawImg)
    saw.setCollider("circle",0,0,100)
    grupoSaw.add(saw)
} 

if(frameCount%175==0){
    mask=createSprite(100,0,10,10)
    mask.x=Math.round(random(50,550))
    mask.addImage(maskImg)
    mask.scale=0.2
    mask.velocityY=4
    grupoMask.add(mask)
}

}
