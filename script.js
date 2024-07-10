const gameBoard =document.querySelector("#gameBoard");
const ctx=gameBoard.getContext("2d");
const score=document.querySelector("#score");
const reset=document.querySelector("#reset");
const gamewidth=gameBoard.width;
const gameheight=gameBoard.height;
const bgColor="white";
const snakeColor="pink";
const snakeBorder="black";
const foodColor="red";
const unitSize=25;
let running=false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodx;
let foody;
let scoree=0;
let snake=[
    { x:unitSize *4,y:0},
    { x:unitSize *3,y:0},
    { x:unitSize *2,y:0},
    { x:unitSize *1,y:0},
    { x:0,y:0}
];

window.addEventListener("keydown",changeDirection);
reset.addEventListener("click",resetGame);

gameStart();


function gameStart(){
    running=true;
    score.textContent=scoree;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout (()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },100)
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle=bgColor;
    ctx.fillRect(0,0,gamewidth,gameheight);
};
function createFood(){
    function randomFood(min, max){
        const randnum=Math.round((Math.random() * (max-min)+min) / unitSize) *unitSize;
        console.log(randnum);
        return randnum; 
        
    }
    foodx=randomFood(0,gamewidth -unitSize);
    foody=randomFood(0,gamewidth -unitSize);
};
function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodx,foody,unitSize,unitSize);
};
function moveSnake(){
    const head={x:snake[0].x+ xVelocity,
                y:snake[0].y+ yVelocity};
     snake.unshift(head);   
     if(snake[0].x == foodx && snake[0].y == foody){
        scoree+=1;
        score.textContent=scoree;
        createFood();

     }  
     else{
snake.pop();
     }      
};
function drawSnake()
{ctx.fillStyle=snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);

    })
};
function changeDirection(event){
    const keyPressed =event.keyCode;
    const left =37;
    const up=38;
    const right=39;
    const down=40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == left && !goingRight ):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;
        case(keyPressed == right && !goingLeft ):
        xVelocity =unitSize;
        yVelocity = 0;
        break;
        case(keyPressed == down && !goingUp ):
        yVelocity = unitSize;
        xVelocity = 0;
        break;
        case(keyPressed == up && !goingDown ):
        yVelocity = -unitSize;
        xVelocity= 0;
        break;
    }

};
function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        running =false;
        break;
        case(snake[0].x>= gamewidth):
        running =false;
        break;
        case(snake[0].y<0):
        running =false;
        break;
        case(snake[0].y>= gameheight):
        running =false;
        break;


    }

    for(let i=1;i<snake.length;i+=1){
        if(snake[i].x == snake[0].x && snake[i].y ==snake[0].y){
            running=false;
        }
    }
};
function displayGameOver(){
    ctx.font ="50px MV Boli";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("Game Over!" , gamewidth/2,gameheight/2);
    running=false;
};
function resetGame(){
    scoree = 0;
    xVelocity = unitSize;
    yVelocity =0;
    snake=[
        { x:unitSize *4,y:0},
        { x:unitSize *3,y:0},
        { x:unitSize *2,y:0},
        { x:unitSize *1,y:0},
        { x:0,y:0}
    ];
    gameStart();
    

};

