/*globals window, document, setInterval, event , localStorage */

var OPE_ADD = '01',
    OPE_SUB = '02',
    OPE_MULTI = '03',
    OPE_DIV = '04',
    addCount = 0,
    subCount = 0,
    multiCount = 0,
    divCount = 0,
    started = 0,
    startDate = -1,
    KEYCODE_ENTER = 13;


function getRandom(min, max) {
    'use strict';
    var range,
        ramdomRange,
        randomNum;
  
    range = max - min + 1;
    ramdomRange = Math.floor(Math.random() * range);
    randomNum = ramdomRange + min;
    return randomNum;
}

function getOperationCode() {
    'use strict';
    
    var min,
        max,
        random,
        maxQ,
        opeCode;
      
    min = 1;
    max = 4;
    maxQ = 25;
    random = getRandom(min, max);

    if (random === 1 && addCount < maxQ) {
        opeCode = OPE_ADD;
        addCount += 1;
    } else if (random === 1 && addCount >= maxQ) {
        if (subCount < maxQ) {
            opeCode = OPE_SUB;
            subCount += 1;
        } else if (multiCount < maxQ) {
            opeCode = OPE_MULTI;
            multiCount += 1;
        } else {
            opeCode = OPE_DIV;
            divCount += 1;
        }
    } else if (random === 2 && subCount < maxQ) {
        opeCode = OPE_SUB;
        subCount += 1;
    } else if (random === 2 && subCount >= maxQ) {
        if (addCount < maxQ) {
            opeCode = OPE_ADD;
            addCount += 1;
        } else if (multiCount < maxQ) {
            opeCode = OPE_MULTI;
            multiCount += 1;
        } else {
            opeCode = OPE_DIV;
            divCount += 1;
        }
    } else if (random === 3 && multiCount < maxQ) {
        opeCode = OPE_MULTI;
        multiCount += 1;
    } else if (random === 3 && multiCount >= maxQ) {
        if (addCount < maxQ) {
            opeCode = OPE_ADD;
            addCount += 1;
        } else if (subCount < maxQ) {
            opeCode = OPE_SUB;
            subCount += 1;
        } else {
            opeCode = OPE_DIV;
            divCount += 1;
        }
    } else if (random === 4 && divCount < maxQ) {
        opeCode = OPE_DIV;
        divCount += 1;
    } else if (random === 4 && divCount >= maxQ) {
        if (addCount < maxQ) {
            opeCode = OPE_ADD;
            addCount += 1;
        } else if (subCount < maxQ) {
            opeCode = OPE_SUB;
            subCount += 1;
        } else {
            opeCode = OPE_MULTI;
            multiCount += 1;
        }
    }
    return opeCode;
}
function getOperationCodeFromName(opeName) {
    'use strict';
    var opeCode;
    switch (opeName) {
    case "+":
        opeCode = OPE_ADD;
        break;
      
    case "-":
        opeCode = OPE_SUB;
        break;
      
    case "x":
        opeCode = OPE_MULTI;
        break;
    
    case "/":
        opeCode = OPE_DIV;
        break;
      
    
    default:
        opeCode = -1;
        break;
    }
    return opeCode;
}

function getOperationName(operationCode) {
    'use strict';
    var result;
    switch (operationCode) {
    case OPE_ADD:
        result = "+";
        break;
    case OPE_SUB:
        result = "-";
        break;
    case OPE_MULTI:
        result = "x";
        break;
    case OPE_DIV:
        result = "/";
        break;
    default:
        result = -1;
    }
    return result;
}

function getAnPrimeNumbers() {
    'use strict';
    var MAX = 99,
        sieve = [MAX],
        i,
        j,
        pCount = 0, //素数の数
        pIndex = 0,
        pAnNumbers;
  
    for (i = 0; i <= MAX; i += 1) {
        sieve[i] = true;
    }
    
    sieve[0] = false;
    sieve[1] = false;
  
  //---------------
  //素数にTrueを格納
  //---------------
    for (i = 2; i <= Math.sqrt(MAX); i += 1) {
        if (sieve[i] === true) {
            for (j = i * 2; j <= MAX; j = j + i) {
                sieve[j] = false;
            }
        }
    }
  
  //---------------
  //素数の数を取得
  //---------------
    for (i = 0; i <= MAX; i += 1) {
        if (sieve[i] === true) {
            pCount = pCount + 1;
        }
    }
    pAnNumbers = [pCount];
    //--------------------------------
    //0と1を除いた素数以外の配列を作成
    //--------------------------------
    for (i = 2; i <= MAX; i += 1) {
        if (sieve[i] === false) {
            pAnNumbers[pIndex] = i;
            pIndex = pIndex + 1;
        }
    }
    return pAnNumbers;
}
function setFormula() {
    'use strict';
    
    
    var operationCode,
        operationName,
        leftQ,
        rightQ,
        correctAns,
        eLblLeftQ = document.getElementById("lblLeftQ"),
        eLblRightQ = document.getElementById("lblRightQ"),
        eLblOperation = document.getElementById("lblOperation");

    
    function getCurrentAnsAdd() {
        var min, max;
        min = 2;
        max = 99;
        return getRandom(min, max);
    }
    function getCurrentAnsSub() {
        var min, max;
        min = 2;
        max = 98;
        return getRandom(min, max);
    }
    function getCurrentAnsMulti() {
        var anPrimeNumbers = getAnPrimeNumbers(), //素数の配列を取得
            min = 0,
            max = anPrimeNumbers.length - 1,
            pIndex;
        
        pIndex = getRandom(min, max);
        return anPrimeNumbers[pIndex];
    }
    
    function getCurrentAnsDiv() {
        var min, max;
        min = 2; //解の最小値
        max = 49; //解の最大値
        return getRandom(min, max);
    }
    
    function getLeftQAdd(correctAns) {
        var min, max;
        min = 1; //加算する最小値
        max = correctAns - min;
        return getRandom(min, max);
    }
    function getLeftQSub(correctAns) {
        var min, max;
        min = correctAns + 1; //加算する最小値
        max = 99;
        return getRandom(min, max);
    }
    function getLeftQMulti(correctAns) {
        var divisor = [],
            min,
            max,
            i;
        for (i = 2; i <= correctAns / 2; i += 1) {
            if (correctAns % i === 0) {
                divisor.push(i);
            }
        }
        min = 0;
        max = divisor.length - 1;
        return divisor[getRandom(min, max)];
    }
    function getLeftQDiv(correctAns) {
        var multiple = [],
            maxAns,
            min,
            max,
            i;
        maxAns = 99;
        
        for (i = 2; i * correctAns <= maxAns; i += 1) {
            if (i * correctAns <= maxAns) {
                multiple.push(i);
            }
        }
        min = 0;
        max = multiple.length - 1;
        return correctAns * multiple[getRandom(min, max)];
    }
    function getRightQAdd(correctAns, leftQ) {
        return correctAns - leftQ;
    }
    function getRightQSub(correctAns, leftQ) {
        return leftQ - correctAns;
    }
    function getRightQMulti(correctAns, leftQ) {
        return correctAns / leftQ;
    }
    function getRightQDiv(correctAns, leftQ) {
        return leftQ / correctAns;
    }

    operationCode = getOperationCode();
    operationName = getOperationName(operationCode);
       
    switch (operationCode) {
    case OPE_ADD:
        correctAns = getCurrentAnsAdd();
        leftQ = getLeftQAdd(correctAns);
        rightQ = getRightQAdd(correctAns, leftQ);
        break;
       
    case OPE_SUB:
        correctAns = getCurrentAnsSub();
        leftQ = getLeftQSub(correctAns);
        rightQ = getRightQSub(correctAns, leftQ);
        break;
     
    case OPE_MULTI:
        correctAns = getCurrentAnsMulti();
        leftQ = getLeftQMulti(correctAns);
        rightQ = getRightQMulti(correctAns, leftQ);
        break;
  
    case OPE_DIV:
        correctAns = getCurrentAnsDiv();
        leftQ = getLeftQDiv(correctAns);
        rightQ = getRightQDiv(correctAns, leftQ);
        break;
        
    default:
        break;
    }
    
    eLblLeftQ.innerText = leftQ;
    eLblRightQ.innerText = rightQ;
    eLblOperation.innerText = operationName;
}


function showTime() {
    'use strict';
    if (started === 1) {
        var stopwatchMiliSecond,
            stopwatchSecond,
            stopwatchMinute,
            nowDate,
            stopWatchTime,
            eLblTime,
            times,
            secondTime;

        nowDate = new Date();
        stopWatchTime = nowDate.getTime() - startDate.getTime();
        
        stopwatchMiliSecond = Math.floor(stopWatchTime / 10) % 100;
        stopwatchMiliSecond = ('0' + stopwatchMiliSecond).slice(-2);
        
        stopwatchSecond = Math.floor(stopWatchTime / 1000) % 60;
        stopwatchSecond = ('0' + stopwatchSecond).slice(-2);
        
        stopwatchMinute = Math.floor(stopWatchTime / 1000 / 60) % 60;
        stopwatchMinute = ('0' + stopwatchMinute).slice(-2);
            
        eLblTime = document.getElementById("lblTime");
        eLblTime.innerText = stopwatchMinute + ":" + stopwatchSecond + ":" + stopwatchMiliSecond;

    }
}


function startStopWatch() {
    'use strict';
    if (started === 0) {
        startDate = new Date();
        started = 1;
        
        setInterval(showTime, 10);
    }
}

//-----------------------
// Click start button !!
//-----------------------
function clickbtnStart() {
    'use strict';
    
    var eBtnStart = document.getElementById("btnStart"),
        eLblTitle = document.getElementById("lblTitle"),
        eInputAns = document.getElementById("inputAns");
    
    eBtnStart.focus();
    
    startStopWatch();
    setFormula();
    eBtnStart.disabled = true;
    eLblTitle.innerText = "Running...";
    
    eInputAns.innerText = "";
    eInputAns.focus();
}


//----------------------
// Click Submit button!!
//----------------------
function clickbtnSubmit() {
    'use strict';
    
    var eLblLeftQ,
        eLblRightQ,
        correctAns,
        eLblTitle,
        eLblOperation,
        operationCode,
        eInputAns = document.getElementById("inputAns"),
        MAX_ANS_COUNT = 100,
        eLblAnsCount = document.getElementById("lblAnsCount"),
        ansCount,
        eBtnStart = document.getElementById("btnStart"),
        eLblTime,
        times,
        secondTime,
        nowDate,year,month,day,hour,minute,second;
    
    eLblTitle = document.getElementById("lblTitle");
    eLblLeftQ = document.getElementById("lblLeftQ");
    eLblRightQ = document.getElementById("lblRightQ");
    eLblOperation = document.getElementById("lblOperation");
    
    operationCode = getOperationCodeFromName(eLblOperation.innerText);
  
    switch (operationCode) {
    case OPE_ADD:
        correctAns = parseInt(eLblLeftQ.innerText, 10) + parseInt(eLblRightQ.innerText, 10);
        break;
      
    case OPE_SUB:
        correctAns = parseInt(eLblLeftQ.innerText, 10) - parseInt(eLblRightQ.innerText, 10);
        break;
      
    case OPE_MULTI:
        correctAns = parseInt(eLblLeftQ.innerText, 10) * parseInt(eLblRightQ.innerText, 10);
        break;
      
    case OPE_DIV:
        correctAns = parseInt(eLblLeftQ.innerText, 10) / parseInt(eLblRightQ.innerText, 10);
        break;
      
    default:
        break;
    }
    
    if (parseInt(eInputAns.value, 10) === correctAns) {
        
        ansCount = parseInt(eLblAnsCount.innerText, 10) + 1;
        eLblAnsCount.innerText = ansCount;
    
        if (ansCount === MAX_ANS_COUNT) {
            eLblTitle.innerText = "Clear!";
            started = 0;
        
            eBtnStart.disabled = true;
            
            eLblLeftQ.innerText = "Clear";
            eLblOperation.innerText = "+";
            eLblRightQ.innerText = "!!";

            eInputAns.value = eLblLeftQ.innerText + eLblRightQ.innerText;

            //score save
            eLblTime = document.getElementById("lblTime");
            times = eLblTime.innerText.split(":");
            secondTime = Number(times[0] * 60) + Number(times[1]) + Number(times[2] / 100);

            nowDate = new Date();
            year = nowDate.getFullYear();
            month = ('00' + (nowDate.getMonth()+1)).slice(-2);
            day = ('00' + nowDate.getDate()).slice(-2);
            hour = ('00' + nowDate.getHours()).slice(-2);
            minute = ('00' + nowDate.getMinutes()).slice(-2);
            second = ('00' + nowDate.getSeconds()).slice(-2);

            localStorage.setItem('100CALCS' + ',' + year + month + day + hour + minute + second, secondTime);
            drawCtxLastYear();

        } else {
            eLblTitle.innerText = "OK";
            setFormula();
            eInputAns.value = "";
        }
        
    } else {
        if (eInputAns.value.length >= String(correctAns).length || event.keyCode === KEYCODE_ENTER) {
            eLblTitle.innerText = "NG";
            eInputAns.value = "";
        }
    }
}
function changeBlack() {
    'use strict';
    document.body.style.backgroundColor = '#DDD';
}

function changeBlue() {
    'use strict';
    document.body.style.backgroundColor = '#B4CCE3';

}

function changeWhite() {
    'use strict';
    document.body.style.backgroundColor = '#FFF';
}

function init() {
    'use strict';
    
    var eLblTitle = document.getElementById("lblTitle"),
        eLblLeftQ = document.getElementById("lblLeftQ"),
        eLblRightQ = document.getElementById("lblRightQ"),
        eLblOperation = document.getElementById("lblOperation");
    
    eLblTitle.innerText = "Ready ...";
    eLblLeftQ.innerText = "x";
    eLblRightQ.innerText = "y";
    eLblOperation.innerText = "+";
    
}

//-----------------------
// Click Reset button !!
//-----------------------
function clickbtnReset() {
    'use strict';
    var eBtnStart = document.getElementById("btnStart"),
        eLblAnsCount = document.getElementById("lblAnsCount"),
        eInputAns = document.getElementById("inputAns");

    init();
    eBtnStart.disabled = false;
    
    started = 0;
    
    eLblAnsCount.innerText = 0;
    eInputAns.value = "";
  
    addCount = 0;
    subCount = 0;
    multiCount = 0;
    divCount = 0;
}


function keyInput() {
    'use strict';
    var KEYCODE_START = 83;
    
    if (event.keyCode === KEYCODE_START) {
        event.preventDefault();
        clickbtnStart();
    } else {
        clickbtnSubmit();
    }
}

function getRecord() {
    let dateYmd = [];    
    let record = new Object();
    let date = [];
    let count = [];

    for(let key in localStorage) {

        let keys = key.split(',');

        if(keys.length === 2 && keys[0] === '100CALCS') {
            
            dateYmd.push(keys[1].slice(0,8));
        }
    }

　　dateYmd.sort();
    
    let wDate;
    for(let d in dateYmd){
        
        if(wDate !== dateYmd[d]) {
            wDate = dateYmd[d];
            count.push(1);
            date.push(wDate);
        }else{
            count[count.length - 1] += 1;
        }
    }

　　record.count = count;
    record.dateYmd = date;
    
    return record;
}

function getRectColor(count){
    if(count === 0){
        return '#EAECF0';
    }else if(count <= 2){
        return '#6BF8A3';
    }else if(count <= 4){
        return '#00D65D';
    }else if(count <= 6){
        return '#00AF4A';
    }else {
        return '#007839';
    }
}

function drawCtxLastYear() {
    'use strict';

    const X_BLANK_WIDTH = 60;
    const Y_BLANK_WIDTH = 50;
    const RECT_LENGTH = 10;
    const BLANK_LENGTH = 3;
    const INIT_BLANK_HEIGHT = 30;
    const INIT_BLANK_WIDTH = 30;
    const VERTICAL_COUNT = 7;
    const HORIZONTAL_COUNT = 50;

    let canvas = document.getElementById('cvsLastYear');
    let ctx = canvas.getContext('2d'); 

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Character drawing
    ctx.lineWidth = '0.3';
    ctx.textBaseline = 'alphabetic';
    ctx.strokeText('Mon', 5, 50.3);
    ctx.strokeText('Wed', 5, 77.3);
    ctx.strokeText('Fri', 5, 105.3);

    ctx.textBaseline = 'top';
    ctx.strokeText('Less', 500, 130);
    ctx.fillStyle = getRectColor(0);
    ctx.fillRect(528, 133, RECT_LENGTH, RECT_LENGTH)
    
    ctx.textBaseline = 'top';
    ctx.fillStyle = getRectColor(2);
    ctx.fillRect(540, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(4);
    ctx.fillRect(552, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(6);
    ctx.fillRect(564, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(8);
    ctx.fillRect(576, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.strokeText('More', 595, 130);


    //Drawing of shapes
    ctx.lineWidth = '0.2';

    let nowDate = new Date();
    let dayOfWeek = nowDate.getDay();
    
    let record;
    record = getRecord();

    let blockCount = (VERTICAL_COUNT * HORIZONTAL_COUNT) + dayOfWeek + 1;
    let targetDate = new Date();
    targetDate.setDate(nowDate.getDate() - (blockCount - 1));

    let dateYmd = targetDate.getFullYear() + ('00' + (targetDate.getMonth()+1)).slice(-2) + ('00' + targetDate.getDate()).slice(-2);
    let count = 0;

    for(var x = 0; x <= HORIZONTAL_COUNT - 1; x++){
        for(var y = 0; y <= VERTICAL_COUNT - 1; y++){
                  
            for (var key in Object.keys(record.dateYmd)){
                if(dateYmd === record.dateYmd[key]){
                    count = record.count[key];
                }
            }

            ctx.fillStyle = getRectColor(count);
            count = 0;
            ctx.fillRect(INIT_BLANK_WIDTH + (BLANK_LENGTH + RECT_LENGTH) * x, INIT_BLANK_HEIGHT + (BLANK_LENGTH + RECT_LENGTH) * y, RECT_LENGTH, RECT_LENGTH);

            
            targetDate.setDate(targetDate.getDate() + 1);
            dateYmd = targetDate.getFullYear() + ('00' + (targetDate.getMonth()+1)).slice(-2) + ('00' + targetDate.getDate()).slice(-2);
        }
    }
    for(var y = 0; y <= dayOfWeek; y++){
        for (var key in Object.keys(record.dateYmd)){
            if(dateYmd === record.dateYmd[key]){
                count = record.count[key];
            }
        }

        ctx.fillStyle = getRectColor(count)
        count = 0;
        
        ctx.fillRect(INIT_BLANK_WIDTH + (BLANK_LENGTH + RECT_LENGTH) * HORIZONTAL_COUNT, INIT_BLANK_HEIGHT + (BLANK_LENGTH + RECT_LENGTH) * y, RECT_LENGTH, RECT_LENGTH)
        
        targetDate.setDate(targetDate.getDate() + 1);
        dateYmd = targetDate.getFullYear() + ('00' + (targetDate.getMonth()+1)).slice(-2) + ('00' + targetDate.getDate()).slice(-2);
    }

    ctx.stroke();

}


function getRecordKeys() {

    const HORIZONTAL_COUNT = 100;

    let record = [];
    
    for(let key in localStorage) {
        let keys = key.split(',');
        if(keys.length === 2 && keys[0] === '100CALCS') {
            record.push(key);
            if(record.length > HORIZONTAL_COUNT){
                 record.shift();
            }
        }
    }
    return record;
}

function drawPast() {
    'use strict';

    const X_BLANK_WIDTH = 7;
    const Y_BLANK_WIDTH = 50;
    const INIT_BLANK_HEIGHT = 50.2;
    const INIT_BLANK_WIDTH = 30.5;
    const VERTICAL_COUNT = 6;
    const HORIZONTAL_COUNT = 100;

    let canvas = document.getElementById('cvsPast');
    let ctx = canvas.getContext('2d'); 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //Frame drawing
    ctx.lineWidth = '0.1';
    for(let i = 0; i <= HORIZONTAL_COUNT + 1; i++) {
        ctx.beginPath();
        ctx.lineTo(i * X_BLANK_WIDTH + INIT_BLANK_WIDTH, 50);
        ctx.lineTo(i * X_BLANK_WIDTH + INIT_BLANK_WIDTH, 350);
        ctx.closePath();
        ctx.stroke();
    }

    for(let i = 0; i <= VERTICAL_COUNT + 1; i++) {
        ctx.lineWidth = '0.1';
        ctx.beginPath();
        ctx.lineTo(INIT_BLANK_WIDTH, i * Y_BLANK_WIDTH);
        ctx.lineTo(X_BLANK_WIDTH * (HORIZONTAL_COUNT + 1) + INIT_BLANK_WIDTH, i * Y_BLANK_WIDTH);
        ctx.closePath();
        ctx.stroke();

        ctx.lineWidth = '0.3';
        ctx.beginPath()
        ctx.textAlign = 'right';
        ctx.strokeText(350 - i * Y_BLANK_WIDTH, X_BLANK_WIDTH + 25, i * Y_BLANK_WIDTH);
        ctx.stroke();
    }

    //Drawing a bar graph
    let keys = getRecordKeys();
    ctx.beginPath();
    ctx.lineWidth = '1.0';
    for(let i = 0; i < keys.length; i++){
        ctx.lineTo(INIT_BLANK_WIDTH + i * X_BLANK_WIDTH, (VERTICAL_COUNT + 1) * Y_BLANK_WIDTH -localStorage.getItem(keys[i]));
    }
    ctx.stroke();

}


window.onload = function () {
    'use strict';
    
    var btnStart, btnReset, btnBlack, btnBlue, btnWhite;

    document.body.onkeyup = keyInput;

    btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", clickbtnStart, false);

    btnReset = document.getElementById("btnReset");
    btnReset.addEventListener("click", clickbtnReset, false);
        
    btnBlack = document.getElementById("btnBlack");
    btnBlack.addEventListener("click", changeBlack, false);
    
    btnBlue = document.getElementById("btnBlue");
    btnBlue.addEventListener("click", changeBlue, false);

    btnWhite = document.getElementById("btnWhite");
    btnWhite.addEventListener("click", changeWhite, false);

    drawCtxLastYear();
    drawPast();

};
