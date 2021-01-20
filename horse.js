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

//実行時間
let specialTime = 50;
let normalTime = 31;

//走る速さ 初期設定
let highSpeed = 20;
let middleSpeed = 14;
let lowSpeed = 7;
/*
134:high,middle,low
568:middle,high,low
27:low,middle,high */

//背景ポジション
let scrollX = 0;
let goalScrollX = 0;

//BGM
let bgm = new Audio("mp3/kusakeiba.mp3");
bgm.loop = false;
let opening = new Audio("mp3/fanfare.mp3");
opening.loop = false;

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
    for (i = 1; i < 9; i++) {
        tempGoalTime[i] = goalTime[i];
    }
    tempGoalTime.sort(function (a, b) {
        return b - a;    //降順 a-bは昇順
    });
    //配列並び替えたことにより配列[0]が誕生。だからfor文0～8になっている。
    for (i = 0; i < 8; i++) {
        ranking[i] = goalTime.indexOf(tempGoalTime[i]);
        console.log((i + 1) + "位は" + ranking[i] + "番:" + tempGoalTime[i]);
    }
}


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
//スタートダウンダッシュ
function startDownDash(startDownTime) {
    for (i = 1; i < 9; i++) {
        if (startDownTime % 4 == 0) {
            move[i] -= Math.floor((Math.random() * 50)) - Math.floor((Math.random() * 50));;
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        } else {
            move[i] += Math.floor((Math.random() * 5));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        }
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
function middleDownDash(middleDownTime) {
    for (i = 1; i < 9; i++) {
        if (middleDownTime % 5 == 0) {
            move[i] -= 10
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        } else {
            move[i] += Math.floor((Math.random() * 20));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        }
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

//ラスト
function lastDownDash(lastTime) {
    for (i = 1; i < 9; i++) {
        if (lastTime % 5 == 0) {
            move[i] -= 10
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        } else {
            move[i] += Math.floor((Math.random() * 20));
            ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
        }
    }
}

//終了画面外に移動
function endDash() {
    for (i = 1; i < 9; i++) {
        move[i] += 50;
        ctx.drawImage(horse[i], move[i], i * horseMargin, horseSizeX, horseSizeY);
    }
}


//残り表示
let remaining = 2290;
function countRemaining(remaining) {
    const createRemaining = document.createElement("p");
    const createText = document.createTextNode("残り" + remaining + "m");
    createRemaining.appendChild(createText);
    createRemaining.className = "remaining";
    createRemaining.id = "createRemainingId";
    wrapper.appendChild(createRemaining);
    const createRemainingId = document.getElementById("createTimerId")
    return createRemainingId;
}
function writeRemaining(remaining) {
    createRemainingId.innerHTML = ("残り" + remaining + "m");
}

//ファンファーレアニメ
function anime1() {
    const anime1 = document.createElement("p");
    anime1.id = "anime1";
    wrapper.appendChild(anime1);
    const createText = document.createTextNode("第1回");
    anime1.appendChild(createText);
}

function anime2() {
    const anime2 = document.createElement("p");
    anime2.id = "anime2";
    wrapper.appendChild(anime2);
    const createText = document.createTextNode("―QLIP WORLD CUP―");
    anime2.appendChild(createText);
}

function anime3() {
    const anime3 = document.createElement("p");
    anime3.id = "anime3";
    wrapper.appendChild(anime3);
    const createText = document.createTextNode("Q1 芝 2400M");
    anime3.appendChild(createText);
}
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
            start();
        }
    }, 1000);
}

//クリック時実行
const button = document.getElementById("button");
button.addEventListener("click", function () {
    opening.play();
    setTimeout(function () { anime1(); }, 1000);
    setTimeout(function () { anime2(); }, 4000);
    setTimeout(function () { anime3(); }, 8000);
    //setTimer(countDown);
    //startTimer();
    setTimeout(function () {
        const anime11 = document.getElementById("anime1")
        const anime22 = document.getElementById("anime2")
        const anime33 = document.getElementById("anime3")
        anime11.remove();
        anime22.remove();
        anime33.remove();
        countRemaining(remaining);
        bgm.play();
        start();    //startTimer()に入ってる後で消す
        preparationHorse();
    }, 16500);


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
                remaining -= 10
                writeRemaining(remaining)
                console.log(remaining);
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
                startDownDash(startDownTime);
                startDownTime--;
                remaining -= 10
                writeRemaining(remaining)
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
                remaining -= 10
                writeRemaining(remaining)
            }
        }, fps);
    }

    //中間後
    function middleDown() {
        let middleDownTime = normalTime;
        let Down = setInterval(function () {
            if (middleDownTime < 0) {
                clearInterval(Down);
                lastSpurt();
            } else {
                clear();
                backDraw();
                middleDownDash(middleDownTime);
                middleDownTime--;
                remaining -= 10
                writeRemaining(remaining)
            }
        }, fps);
    }

    //ラストスパート
    function lastSpurt() {
        let lastSpurtTime = specialTime;
        let lastSpurtInterval = setInterval(function () {
            if (lastSpurtTime < 0) {
                clearInterval(lastSpurtInterval);
                last();
            } else {
                clear();
                backDraw();
                lastDownDash();
                lastSpurtTime--;
                remaining -= 10
                writeRemaining(remaining)
            }
        }, fps);
    }

    //ラスト
    function last() {
        let lastTime = normalTime;
        let lastInterval = setInterval(function () {

            if (lastTime < 0) {
                clearInterval(lastInterval);
                for (i = 1; i < 9; i++) {
                    goalTime[i] = move[i];
                }
                judge();
                end();
            } else {
                clear();
                backDraw();
                lastDash(lastTime);
                lastTime--;
                remaining -= 10
                writeRemaining(remaining)
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
        }, fps);
    }
});

/* horseTimerDash(); */
/* horseTimerDashTest(); */
/* horseDash(); */
/*     setTimer(time);
    startTimer(); */



/* drawImage(画像, x位置, y位置, width, height); */
