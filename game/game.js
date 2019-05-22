
    
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
   
// till vinst.    
var score = 0;   

//definerar vart bollens radius är. för att användas för att räkna ut vart bollen ska studsa. 
var ballRadius = 10;
    
//bestämmer vart x och y är. 
var x = canvas.width/2;
var y = canvas.height-30; 
    
    
//we want to add a small value to x and y after every frame has been drawn to make it appear that the ball is moving.     
var dx = 4;
var dy = -4;    
    
//skapar vaiabler till paddeln.
var paddleHeight = 20;
var paddleWidth = 80;
var paddleX = (canvas.width-paddleWidth)/2;
  
//vaiabler för att kontrollera paddeln med kontrollerna på tangerntbordet. False- för att dom ska vara stilla när man startar.
var rightPressed = false;
var leftPressed = false;
    
// Varibale till liv. 
    
var lives = 3;  
    
 //skapar variabler till brickorna. 
    
//rader/columner
var brickRowCount = 6;
var brickColumnCount = 9;
// storlek, padding mellan brickor.
var brickWidth = 75;
var brickHeight = 30;
var brickPadding = 13;
//Placering i canvas. alltså typ 30px åt höger/nedåt X&Y.
var brickOffsetTop = 50;
var brickOffsetLeft = 20;
    
    
//Variabler till ljud. 
var hit = new Audio('hit.mp3'); 
var gameOver = new Audio('gameover.mp3');    
var game = new Audio('hej.mp3'); 
var lostLife = new Audio('liv.mp3'); 
    
    
// BRICKS används till att skapa Kollision med brickorna senare. Skapar brickorna i en Array, i en loop. Startar på 0, innehåller kolumner, plussar på med 1 varje loop.   
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    
//Startar på 0, innehåller rader, plussar på med 1 varje loop. Ger brickorna en position. Status 1, denna används för att få brickorna att    
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
     
  
 // Dessa lyssnar efter om man trycker på knapparna på tangetbordet. "lyssnar efter event" keydown och keyup.
//document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);
//lyssnar efter musen.
document.addEventListener("mousemove", mouseMoveHandler, false);
 
    

//key code 37 is the left cursor key
//39 is the right cursor
    
// //skapar en funktion som avgör vad som sker när man trycker på höger eller vänster pil. (e) säger att det är ett event.

    /*function keyDownHandler(e) {
    
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
    

//Vad som sker när man släpper tangenterna.
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}    
   */ 
    
// Funktion för att använda musen att styra med. 

function mouseMoveHandler(e) {
//skapar variabel. 
// relativeX value, which is equal to the horizontal mouse position in the viewport, e.clientx.
    var relativeX = e.clientX - canvas.offsetLeft;
    
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
    
    
    
// Skapar en funktion som jämför varje brickas position med bollens position, en loop som gör detta i varje frame.
function collisionDetection() {
    
    
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            //skapar en varibel (b) som lagrar brickorna i varje loop.
            var b = bricks[c][r];
            // calculations
            
              if(b.status == 1) {
                  
            // Allt detta måste vara sant. 
            //The x position of the ball is greater than the x position of the brick.
            //The x position of the ball is less than the x position of the brick plus its width.
            //The y position of the ball is greater than the y position of the brick.
            //The y position of the ball is less than the y position of the brick plus its height.
            // Om bollens center är i en brickas position, ändra riktning.
    if(x+ballRadius > b.x-ballRadius && x < b.x+brickWidth && y+ballRadius > b.y && y-ballRadius < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
        
      
                
                 //Plussar på 1 score per träff.  
                score++; 
                   
        
         hit.play();
        
// Om score = antal bricks, skriv ut detta. Vid vinst!
                   if(score == brickRowCount*brickColumnCount) {
                       
    setTimeout(function() {
            (alert('VICTORY!')) 
            {
           window.location.href='http://home.mi.sh.se/~sh17hp0755/test/game/';
            };
           
                              }, 500); 
         
            
                       
                   }
               }
            }
        }
    }
}    

    
//Skapar en funktion för att visa Score.       
function drawScore() {
    ctx.font = "23px Times New Roman";
    ctx.textAlign = "center";
   ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 58, 30);
   
}; 
    
// Ritar upp liven
function drawLives() {
    ctx.font = "23px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: "+lives, canvas.width-62, 30);
}
    
    
        
 function drawBall() {
     
//skapar en blå cirkel. 
ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.fillStyle = "black";
ctx.fill();
ctx.closePath();   
       
 };
    
 //skapar en paddel.
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
   ctx.fillStyle = "black";
   ctx.fill();
    ctx.closePath();
};
    

    
//Skapar brickor, printar ut.      
    
function drawBricks() {
    //Startar på 0, innehåller kolumner, plussar på med 1 varje loop. Ger brickorna en position.  
    for(c=0; c<brickColumnCount; c++) {
        
 //Startar på 0, innehåller rader, plussar på med 1 varje loop. Ger brickorna en position.  
        for(r=0; r<brickRowCount; r++) {
            
            
            // if status is 1, then draw it, but if it's 0, then it was hit by the ball
            if(bricks[c][r].status == 1) {
            
            
            // till brickorna, för att ändra deras position i en loop. så att inte alla brickor hamnar på samma plats. 
            //En brickas position räkans genom,  brickWidth + brickPadding, multiplicerat med antal kolumner (c), plus brickOffsetLeft (nuvarande position). 
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            
            
                
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#6495ED";
            ctx.fill();
            ctx.closePath();
                 
                
            }
        }
    }
};     
    
function myFunctionlight() {
  document.location.reload();   
}    

    
    function bytBak() {
        //document.location.reload();
  
        document.getElementById("myCanvas").style.background = "linear-gradient(black, #C0C0C0, white)"; 
        
    /*
  document.getElementById("myCanvas").style.backgroundImage = "url('space2.jpg')";    
*/
        
      
}  
    
function draw() {
//tar bort spåret som bollen efterlämnar efter varje "frame".
ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    
game.play(); 
//anropar funktionen drawBricks, brickorna.    
drawBricks();
//anropar funktionen drawBall, bollen.    
drawBall(); 
//anropar funktionen drawPaddle, paddeln. 
drawPaddle();
    
drawScore();
drawLives();
// //anropar funktionen kollitionsdetektorn.
collisionDetection();
    

    

 
   //För att få bollen att studsa.
//översta/nedersta vägg, om y och dy blir 0, alltså får kordinaten y=0. (längst upp) så ska dy bli -dy, alltså att  bollen helt ska byta riktning, positiv till negativ. 
    
    
//höger och vänster vägg. BallRadius säger att den inte ska stutsa när mitten av bollen nuddar väggen utan när kanten av bollen nuddar. När bollens radius och avståndet till bollen är exakt lika ska bollen studsa.     //If either of the two statements is true, reverse the movement of the ball.

  
//höger/vänster
if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    
//topp    
  
if(y + dy < ballRadius) {
        dy = -dy;
    } 
    
   //botten 
    else if(y + dy > canvas.height-ballRadius) {
    
  
      // Om man träffar paddeln. && betyder och.
    //Om bollen är mellan paddelns position.
    
    
 if(x > paddleX && x < paddleX + paddleWidth ) {
            dy = -dy;
      
        } 
    
      
  
        
// Om man missar paddeln.
else  {
     
    if(lives >= 1){
    //Tar bort 1 liv, varje gång man missar paddeln. 
    lives--;
    
   }
    //Om 0 liv, gör detta.
    
if(lives == 0) {
    
  
    //document.location.reload();
    bytBak(); 
                    game.pause(); 
                    gameOver.play();
    
                 
                setTimeout(function() {
            if(window.confirm('GAME OVER!')) 
            {
                
                
            window.location.href='index.html';
                window.confirm = false; 
            }
            else {
                window.confirm = false; 
            }
           
                
                              }, 50); 
                    
                     
    
}
    
    
    //Annars, 
else {
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 4;
    dy = -4;
   lostLife.play();
     
    
        }
    }
}
    
    
// Kollar om vi trycker på någon tangent. Och gör så att man inte kan åka utanför canvas hight/width med paddeln. paddleX visar hur snabbt paddeln ska röra sig.   
   
if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
    
    
            
//Uppdaterar x och y värdena efter varje "frame" så att den rör på sig, med det värdet som dy är. (definerat i starten).  
x += dx;
y += dy;
    
 //här slutar draw 
    requestAnimationFrame(draw);
}    
    

    
//printar ut DRAW på skärmen.
draw();
    
    
    
	// JavaScript code goes here
