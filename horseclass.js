//キャンバス
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;//1920
canvas.height = window.innerHeight;//977
console.log(window.innerWidth);
console.log(window.innerHeight);
let fps = 1000 / 8;
let goal = false;
const wrapper = document.getElementById("wrapper");

//馬の大きさと配置間隔
horseSizeX = canvas.width / 10;
horseSizeY = canvas.width / 10;
horseMargin = canvas.width / 20;

let countDown = 3;

//クラス用のプロパティー
let runTime = 30;
let runPower = 7;
//背景ポジション
let scrollX = 0;
let goalScrollX = 0;

//BGM
let bgm = new Audio("mp3/kusakeiba.mp3");
bgm.loop = false;

//ゴール描写
function goalDraw() {
    const goalPicture = new Image();
    goalPicture.src = "img/goal.svg";
    ctx.drawImage(goalPicture, goalScrollX, 0, canvas.width, canvas.height)
    goalScrollX -= 40;
}

/* window.addEventListener("load", function () {
    goalDraw();
    preparationHorse();
}) */

//背景描写
function backDraw() {
    const backPicture = new Image();
    backPicture.src = "img/back.svg";
    ctx.drawImage(backPicture, scrollX, 0, canvas.width * 2, canvas.height);
    scrollX -= 28;
    if (scrollX < -canvas.width) {
        scrollX = 0;
    }
}

//再描画用
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



//馬生成
let horse = [];
let move = [];
function preparationHorse() {
    for (i = 1; i < 9; i++) {
        horse[i] = new Image();
        horse[i].src = "img/horse" + i + ".svg";
        move[i] = 0;
        ctx.drawImage(horse[i], 0, i * horseMargin, horseSizeX, horseSizeY);

        /* ctx.drawImage("box1.png", 0, 100); */
    }
}

//判定式
//Math.max.apply(null, goalTime);
//let top=Math.max(...goalTime);スプレッド演算子
let goalTime = [];
let ranking = [];
function judge() {
    let tempGoalTime = [];
    for (i = 0; i < 9; i++) {
        tempGoalTime[i] = goalTime[i];
    }
    tempGoalTime.sort(function (a, b) {
        return b - a;    //降順 a-bは昇順
    });
    for (i = 0; i < 9; i++) {
        ranking[i] = goalTime.indexOf(tempGoalTime[i]);
        console.log(i + "位は" + ranking[i] + "番:" + tempGoalTime[i]);
    }
}
//走る速さ 初期設定
let highSpeed = 24;
let middleSpeed = 15;
let lowSpeed = 7;
let startDownMove = [];
for (i = 1; i < 9; i++) {
    startDownMove[i] = Math.floor((Math.random() * (4 - 1) + 1)) - Math.floor((Math.random() * (4 - 1) + 1));
}
let middleDownMove = [];
for (i = 1; i < 9; i++) {
    middleDownMove[i] = Math.floor((Math.random() * (4 - 1) + 1)) - Math.floor((Math.random() * (4 - 1) + 1));
}
let lastDownMove = [];
for (i = 1; i < 9; i++) {
    lastDownMove[i] = Math.floor((Math.random() * (4 - 1) + 1)) - Math.floor((Math.random() * (4 - 1) + 1));
}
/*
134:high,middle,low
568:middle,high,low
27:low,middle,high */

//スタート
function startDash() {
    for (i = 1; i < 9; i++) {
        highSpeed = highSpeed;
        middleSpeed = middleSpeed;
        lowSpeed = lowSpeed;
        if (i == 1 || i == 3 || i == 4) {
            move[i] += Math.floor((Math.random() * highSpeed));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        }
        if (i == 5 || i == 6 || i == 8) {
            move[i] += Math.floor((Math.random() * middleSpeed));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        } if (i == 2 || i == 7) {
            move[i] += Math.floor((Math.random() * lowSpeed));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        }
    }
}
//スタート後
function startDownDash() {
    for (i = 1; i < 9; i++) {
        move[i] += startDownMove[i];
        ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
    }
}
//中間ダッシュ
function middleDash() {
    for (i = 1; i < 9; i++) {
        highSpeed = highSpeed;
        middleSpeed = middleSpeed;
        lowSpeed = lowSpeed;
        if (i == 1 || i == 3 || i == 4) {
            move[i] += Math.floor((Math.random() * middleSpeed));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        }
        if (i == 5 || i == 6 || i == 8) {
            move[i] += Math.floor((Math.random() * highSpeed));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        } if (i == 2 || i == 7) {
            move[i] += Math.floor((Math.random() * middleSpeed));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        }
    }
}

//中間後
function middleDownDash() {
    for (i = 1; i < 9; i++) {
        move[i] += middleDownMove[i];
        ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
    }
}

//ラストスパート
function lastDash() {
    for (i = 1; i < 9; i++) {
        highSpeed = highSpeed;
        middleSpeed = middleSpeed;
        lowSpeed = lowSpeed;
        if (i == 1 || i == 3 || i == 4) {
            move[i] += Math.floor((Math.random() * lowSpeed));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        }
        if (i == 5 || i == 6 || i == 8) {
            move[i] += Math.floor((Math.random() * lowSpeed));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        } if (i == 2 || i == 7) {
            move[i] += Math.floor((Math.random() * highSpeed));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        }
    }
}

function lastDownDash() {
    for (i = 1; i < 9; i++) {
        move[i] += lastDownMove[i];
        ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
    }
}

function endDash() {
    for (i = 1; i < 9; i++) {
        move[i] += 10;
        ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
    }
}

let specialTime = 50;
let normalTime = 30;



//クリック時実行
const button = document.getElementById("button");
button.addEventListener("click", function () {
    //setTimer(countDown);
    //startTimer();
    start();    //startTimer()に入ってる後で消す
    preparationHorse();


    //カウントダウン


    function setTimer(countDown) {
        const createTimerP = document.createElement("p");
        const createText = document.createTextNode(countDown);
        createTimerP.appendChild(createText);
        createTimerP.className = "num";
        createTimerP.id = "createTimerId";
        wrapper.appendChild(createTimerP);
    }
    function startTimer() {
        const createTimer = document.getElementById("createTimerId")
        let timer = setInterval(function () {
            if (countDown > 1) {
                countDown--;
                createTimer.innerHTML = countDown;
            }
            else {
                createTimer.innerHTML = "START";
                setTimeout(function () { createTimer.remove(); }, 1200)
                clearInterval(timer);
                /* bgm.play(); */
                start();
            }
        }, 1000);
    }



    //スタートダッシュ
    function start() {
        let startTime = specialTime;
        let start = setInterval(function () {
            if (startTime < 0) {
                clearInterval(start);
                startDown();

            } else {
                clear();
                backDraw();
                startDash();
                startTime--;
            }
        }, fps);
    }


    //スタート後
    function startDown() {
        let startDownTime = normalTime;
        let Down = setInterval(function () {
            if (startDownTime < 0) {
                clearInterval(Down);
                middle();

            } else {
                clear();
                backDraw();
                startDownDash();
                startDownTime--;
            }
        }, fps);
    }
    //中間ダッシュ
    function middle() {
        let middleTime = 30;
        let middle = setInterval(function () {
            if (middleTime < 0) {
                clearInterval(middle);
                middleDown();
            } else {
                clear();
                backDraw();
                middleDash();
                middleTime--;
            }
        }, fps);
    }

    //中間後
    function middleDown() {
        let startDownTime = normalTime;
        let Down = setInterval(function () {
            if (startDownTime < 0) {
                clearInterval(Down);
                last();

            } else {
                clear();
                backDraw();
                middleDownDash();
                startDownTime--;
            }
        }, fps);
    }

    //ラストスパート
    function lastSpurt() {
        let lastTime = specialTime;
        let last = setInterval(function () {

            if (lastTime < 0) {
                clearInterval(last);
                last();
            } else {
                clear();
                backDraw();
                lastDownDash();
                lastTime--;
            }
        }, fps);
    }

    //ラスト
    function last() {
        let lastTime = specialTime;
        let last = setInterval(function () {

            if (lastTime < 0) {
                clearInterval(last);
                for (i = 0; i < 9; i++) {
                    goalTime[i] = move[i];
                }
                judge();
                end();
            } else {
                clear();
                backDraw();
                lastDash();
                lastTime--;
            }
        }, fps);
    }

    function end() {
        let endTime = 50;
        let end = setInterval(function () {

            if (endTime < 0) {
                clearInterval(end);
            } else {
                clear();
                backDraw();
                goalDraw();
                endDash();
                endTime--;
            }
            for (i = 0; i < 8; i++) {
                //console.log(move[i]);
            }
        }, fps);
    }
});

/* horseTimerDash(); */
/* horseTimerDashTest(); */
/* horseDash(); */
/*     setTimer(time);
    startTimer(); */



/* drawImage(画像, x位置, y位置, width, height); */

//スタートダウンダッシュ改良
function startDownDash() {
    for (i = 1; i < 9; i++) {
        if (startTime % 2 == 0) {
            move[i] += startDownMove[i];
            //ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        } else {
            move[i] += startDownMove[i];
        }
    }
}

class run {
    constructor(runTime, runPower, number) {
        this.runTime = runTime;
        this.runPower = runPower;
        this.n = number;
    }
    normalDash() {
        runPower = Math.random() * 7;
        if (runTime % 2 == 0) {
            move[n] += Math.floor(Math.random() * runPower);
            //ctx.drawimage(horse[n], move[n], horseMargin * n, horseSizeX, horseSizeY)
        } else {
            move[n] -= Math.floor(Math.random() * 4);
            //ctx.drawimage(horse[n], move[n], n * horseMargin, horseSizeX, horseSizeY)
        }
    }

}

class specialRun extends run {
    constructor(highSpeed, middleSpeed, lowSpeed) {
        this.highSpeed = highSpeed;
        this.middleSpeed = middleSpeed;
        this.lowSpeed = lowSpeed;
    }

    highDash() {
        this.highSpeed = highSpeed;
        move[n] += Math.floor((Math.random() * this.highSpeed));
        //ctx.drawImage(horse[n], move[n], n * horseMargin, horseSizeX, horseSizeY);
    }
    middleDash() {
        this.middleSpeed = middleSpeed;
        move[n] += Math.floor((Math.random() * this.middleSpeed));
        //ctx.drawImage(horse[n], move[n], n * horseMargin, horseSizeX, horseSizeY);
    }
    middleDash() {
        this.lowSpeed = lowSpeed;
        move[n] += Math.floor((Math.random() * this.lowSpeed));
        //ctx.drawImage(horse[n], move[n], n * horseMargin, horseSizeX, horseSizeY);
    }
}

class horse {
    constructor(number) {
        this.horseSizeX = canvas.width / 10;
        this.horseSizeY = canvas.width / 10;
        this.horseMargin = (canvas.width / 20) * number;
        this.n = number;
        this.move = move[number];
        this.picture = new Image();
        picture.src = "img/horse" + n + ".svg";
    }

    drawHorse() {
        ctx.drawImage(picture, this.move, horseMargin, horseSizeX, horseSizeY);
    }
}

class escapeHorse extends horse {

}

class stretchHorse extends horse {

}

class chasingHorse extends horse {

}
