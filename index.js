
const time = document.getElementById('time');//document. htmlにアクセス  getElementByID('time')でtimeIDの要素を取得し変数のtimeに代入
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let startTime;//startボタンを押した時のdate.nowで入手した値[ms]を代入する変数
let stopTime = 0;//startボタンを押してからstopボタンを押すまでに経過した時間[ms]を代入する変数、初期値は0
let timeoutID;


//時間変化を表示するための関数
function displayTime() {
    const currentTime = new Date(Date.now() - startTime + stopTime);
    const h = String(currentTime.getHours() - 9).padStart(2, "0");//padstartは文字型の値に用いるのでstringに変換し２桁に満たない時のみ０で埋める
    const m = String(currentTime.getMinutes()).padStart(2, "0");
    const s = String(currentTime.getSeconds()).padStart(2, "0");
    let ms = Math.floor(currentTime.getMilliseconds() /10 );//m,sの2桁に合わせて表示するために[ms]の値を10で割り、math.floorで小数点以下切り捨て。/10を用いるためmsは数値型で定義。2桁に満たない時の0埋めは後で行う
    
    time.textContent = `${h}:${m}:${s}.${ms.toString().padStart(2,"0")}`;
    timeoutID = setTimeout(displayTime, 10);//displayTimeのオブジェクトを10ms毎に行うsetTimeout関数をtimeoutに代入
}




//任意のボタンを押した後の各ボタン押下の可・不可の設定、および変数への値の代入
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;
    startTime = Date.now();
    displayTime();
});

stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    clearTimeout(timeoutID); //timeoutIDの繰り返しを止める
    stopTime += (Date.now() - startTime);
});

resetButton.addEventListener('click', () =>{
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    time.textContent = "00:00:00.00";
    stopTime = 0;
});