/* const createDiv = document.createElement("div");
createDiv.id = "wrapper";
const createImg = document.createElement("img");
createImg.class = "img";
const field = document.getElementById("field") */

/* canvas.width = window.innerWidth;
canvas.height = window.innerHeight; */
//カウントダウン数字生成
/* const wrapper = document.getElementById("wrapper");
function cdNum() {
    let createP = [];
    let createText = [];
    for (i = 1; i < 3; i++) {
        setTimeout(function () {
            createP[i] = document.createElement("p");
            createText[i] = document.createTextNode(i);
            createP[i].appendChild(createText[i]);
            createP[i].className = "num";
            wrapper.appendChild(createP[i]);
        }, 1000);
        setTimeout(function () {
            createP[i].remove()
        }, 2000)
    }
}; */

/*
//スタート
function start() {
    let createStart = document.createElement("p");
    setTimeout(function () {
        createTextStart = document.createTextNode("START");
        createStart.appendChild(createTextStart);
        createStart.className = "start";
    }, 1000);
    setTimeout(
        function () {
            createStart.remove();
        }, 2000);
} */



//背景
/* function backDraw() {
    const backPicture = new Image();
    backPicture.src = "img/back2.svg";
    ctx.drawImage(backPicture, 0, 0, canvas.width, canvas.height);
} */

/* function backDraw() {
    const backPicture = new Image();
    backPicture.src = "img/back.svg";

    let scrollY = 0;
    ctx.drawImage(backPicture, scrollX, 0, canvas.width, canvas.height);
    scrollX--;
} */


/* let scrollX = 0;
let scrollY = 0;
function backDraw() {
    const backPicture = new Image();
    backPicture.src = "img/back2.svg";
    const pattern = ctx.createPattern(backPicture, "repeat-x");
    ctx.fillStyle = pattern;
    ctx.fillRect(scrollX, 0, canvas.width * 2, canvas.height)
    scrollX += 5;


} */


//走る
/* function horseDash() {
    for (i = 0; i < 1000; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(horse3, i, 0, 50, 50);
    }
} */

/* function horseTimerDashTest() {
    setInterval(function () {
        //move += 10;
        move += (Math.random() * (10 - 1) + 1) - (Math.random() * (5 - 1) + 1)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(horse[4], move, 0, 50, 50);
    }, 200);
} */

/* function horseTimerDash() {
    for (i = 1; i < 9; i++) {
        let a = i;
        setInterval(function () {
            // move += 10;
            move += (Math.random() * (10 - 1) + 1) - (Math.random() * (5 - 1) + 1)
            ctx.drawImage(horse[a], move, a * 50, 50, 50);
            console.log(move);
        }, 1000);
    }
} */
//走る原本
/* function horseTimerDash() {
    for (i = 1; i < 9; i++) {
        move += (Math.random() * (10 - 1) + 1) - (Math.random() * (5 - 1) + 1)
        ctx.drawImage(horse[i], move, i * horseMargin, horseSizeX, horseSizeY);
    }
} */