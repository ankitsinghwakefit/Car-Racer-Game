var score = document.querySelector(".score");
var startScreen = document.querySelector(".startScreen");
var gameArea = document.querySelector(".gameArea");

startScreen.addEventListener("click", start);
var player = {
    speed : 5,
    score : 0,
};

var keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false,
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

function isCollide(a,b){
    aCar = a.getBoundingClientRect();
    bCar = b.getBoundingClientRect();
    return !((aCar.bottom < bCar.top) || (aCar.top > bCar.bottom) || 
    (aCar.right < bCar.left) || (aCar.left > bCar.right));
}
function moveLines(){
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function(item){
        if(item.y>=900){
            item.y -= 870;
        }
        item.y += player.speed;
        item.style.top = item.y+"px";
    })
}
function endGame(){
    player.start = false;
}
function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            endGame();
            console.log("hit");
        }
        if(item.y>=900){
            item.y = -350;
            item.style.left = Math.floor(Math.random()*350)+"px";
        }
        item.y += player.speed;
        item.style.top = item.y+"px";
    })
}

function gamePlay(){
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if(player.start){
        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y > (road.top+70)){
            player.y -= player.speed;
        }
        if(keys.ArrowDown && player.y<(road.bottom-70)){
            player.y += player.speed;
        }
        if(keys.ArrowLeft && player.x>0){
            player.x -= player.speed;
        }
        if(keys.ArrowRight && player.x<(road.width-50)){
            player.x += player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
    window.requestAnimationFrame(gamePlay);
    player.score++;
    score.innerHTML = "Score: "+player.score;

    }
}

function start(){
    gameArea.classList.remove("hide");
    startScreen.classList.add("hide");
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(var x=0; x<7; x++){
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class","lines");
    roadLine.y = (x*150);
    roadLine.style.top = roadLine.y+"px";
    gameArea.appendChild(roadLine);
    }

    var car = document.createElement("div");
    car.setAttribute("class","car");
    // car.innerText = "car hai";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // console.log("top :"+car.offsetTop);
    // console.log(car.offsetLeft);

    for(var x=0; x<4; x++){
        let enenyCar = document.createElement("div");
        enenyCar.setAttribute("class","enemy");
        enenyCar.y = ((x+1)*350)*-1;
        enenyCar.style.top = enenyCar.y+"px";
        enenyCar.style.left = Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enenyCar);
    }
}
