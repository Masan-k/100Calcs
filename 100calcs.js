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

};
