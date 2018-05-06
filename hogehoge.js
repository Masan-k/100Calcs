//=============================
//フォームから呼び出される関数
//更新日:20180506_3
//=============================

//-----------------------
// Click start button !!
//-----------------------
function clickbtnStart(){
  startStopWatch();
  setFormula();
  
  var eBtnSubmit = document.getElementById("btnSubmit");
  eBtnSubmit.disabled = false;
  
  var eBtnStart = document.getElementById("btnStart");
  eBtnStart.disabled = true;
  
  var eLblTitle = document.getElementById("lblTitle");
  eLblTitle.innerText = "Running...";
  
  var eAnsTitle = document.getElementById("lblTitle");

  //フォーカス
  var eInputAns = document.getElementById("inputAns");	
  eInputAns.focus();
  
}

//---------------------------
// Key press AnswerTextbox!!
//---------------------------
function keyPressTextBox(){
  KEYCODE_ENTER = 13;
  if (event.keyCode == KEYCODE_ENTER){
    clickbtnSubmit();
  }
}

//-----------------------
// Click Reset button !!
//-----------------------
function clickbtnReset(){
  
  //var eBtnSubmit = document.getElementById("btnSubmit");
  //eBtnSubmit.disabled = true;
  
  init();
  var eBtnStart = document.getElementById("btnStart");
  eBtnStart.disabled = false;
  
  started = 0 //ストップウォッチを停止

  //解答数を0
  var eLblAnsCount = document.getElementById("lblAnsCount");    
  eLblAnsCount.innerText = 0;
  
  //回答欄を空欄
  var eInputAns = document.getElementById("inputAns");	
  eInputAns.value = "";
  
  addCount = 0;
  subCount = 0;
  multiCount = 0;
  divCount = 0;
}

//----------------------
// Click Submit button!!
//----------------------
function clickbtnSubmit(){
  //console.log("button Submit Click!!")
  //startStopWatch();
	
  var eLblLeftQ;
  var correctAns;
  var eLblTitle;
  var eLblOperation;
  
  eLblTitle = document.getElementById("lblTitle");	
  eLblLeftQ = document.getElementById("lblLeftQ");
  eLblRightQ = document.getElementById("lblRightQ");
  eLblOperation = document.getElementById("lblOperation");
  
  operationCode = getOperationCode(eLblOperation.innerText);
  //console.log("operationCode::::" + operationCode);
  switch (operationCode){
    case OPE_ADD:
      correctAns = parseInt(eLblLeftQ.innerText) + parseInt(eLblRightQ.innerText);
      break;
    
    case OPE_SUB:
      correctAns = parseInt(eLblLeftQ.innerText) - parseInt(eLblRightQ.innerText);
      break;
    
    case OPE_MULTI:
      correctAns = parseInt(eLblLeftQ.innerText) * parseInt(eLblRightQ.innerText);
      break;
    
    case OPE_DIV:
      correctAns = parseInt(eLblLeftQ.innerText) / parseInt(eLblRightQ.innerText);
      break;
    
    default:
      break;
  }
  
  //console.log("eLblLeftQ -> " + eLblLeftQ.innerText);
  //console.log("eLblRightQ -> " + eLblRightQ.innerText);
  //correctAns = parseInt(eLblLeftQ.innerText) + parseInt(eLblRightQ.innerText);
  //correctAns = parseInt(eLblLeftQ.innerText) + (eLblLeftQ.innerText) +  parseInt(eLblRightQ.innerText);
  //console.log("correctAns -> " + correctAns);
  
  var eInputAns = document.getElementById("inputAns");	
  var MAX_ANS_COUNT = 100 // 解答数
  if (parseInt(eInputAns.value) == correctAns){ //明示的キャスト（つけなくても動く）
    var eLblAnsCount = document.getElementById("lblAnsCount");
	var ansCount;
    
    ansCount = parseInt(eLblAnsCount.innerText) + 1;
    eLblAnsCount.innerText = ansCount;
    
    if (ansCount === MAX_ANS_COUNT){
      eLblTitle.innerText = "Clear!"
      started = 0 //ストップウォッチを停止
      
      var eBtnStart = document.getElementById("btnStart");
      eBtnStart.disabled = true;
      
      var eBtnSubmit = document.getElementById("btnSubmit");
      eBtnSubmit.disabled = true;
      
      eLblLeftQ.innerText = "Clear";
      eLblOperation.innerText = "+"
      eLblRightQ.innerText = "!!";
      eInputAns.value = eLblLeftQ.innerText + eLblRightQ.innerText;
      
    }else{
      eLblTitle.innerText = "OK"; //labelにはvalueはない
      setFormula() //次の問題を表示
      eInputAns.value = "";
      
    }
  }else{
    eLblTitle.innerText = "NG"; //labelにはvalueはない
    eInputAns.value = "";

	}
}

//-----------
//初期化処理
//-----------
function init(){
  
  var eLblTitle = document.getElementById("lblTitle");
  var eLblLeftQ = document.getElementById("lblLeftQ");
  var eLblRightQ = document.getElementById("lblRightQ");
  var eLblOperation = document.getElementById("lblOperation");
  
  eLblTitle.innerText = "Ready ...";
  eLblLeftQ.innerText = "x"
  eLblRightQ.innerText = "y"
  eLblOperation.innerText = "+"
   
  var eBtnSubmit = document.getElementById("btnSubmit");
  eBtnSubmit.disabled = true;
  //console.log("call function init!!");
  
}

//=====
//数式
//=====

//演算子識別記号
var OPE_ADD = '01';   //加算 演算子識別コード
var OPE_SUB = '02';   //減算 演算子識別コード
var OPE_MULTI = '03'; //乗算 演算子識別コード
var OPE_DIV = '04';   //除算 演算子識別コード

var addCount = 0;
var subCount = 0;
var multiCount = 0;
var divCount = 0;

function setFormula(){

  var operationCode,operationName; //演算子
  var leftQ;
  var rightQ;
  var correctAns;

  //演算子の取得処理
  operationCode = getOperationCode();
  operationName = getOperationName(operationCode);
     
  switch (operationCode){
    case OPE_ADD:
      correctAns = getCurrentAnsAdd();
      leftQ = getLeftQAdd(correctAns);
      rightQ = getRightQAdd(correctAns,leftQ);
      break;
     
    case OPE_SUB:
      correctAns = getCurrentAnsSub();
      leftQ = getLeftQSub(correctAns);
      rightQ = getRightQSub(correctAns,leftQ);
      break;
   
    case OPE_MULTI:
      correctAns = getCurrentAnsMulti();
      leftQ = getLeftQMulti(correctAns);
      rightQ = getRightQMulti(correctAns,leftQ);
      break;

    case OPE_DIV:
      correctAns = getCurrentAnsDiv();
      leftQ = getLeftQDiv(correctAns);
      rightQ = getRightQDiv(correctAns,leftQ);
      break;
      
    default: 
      break;
  }

  //数式表示
  var eLblLeftQ = document.getElementById("lblLeftQ");
  var eLblRightQ = document.getElementById("lblRightQ");
  var eLblOperation = document.getElementById("lblOperation");
      
  eLblLeftQ.innerText = leftQ;
  eLblRightQ.innerText = rightQ;
  eLblOperation.innerText = operationName;  
  
  function getCurrentAnsAdd(){
    var min,max;
    min = 2; //解の最小値
    max = 99; //解の最大値
    return getRandom(min,max);
  }
  function getCurrentAnsSub(){
    var min,max;
    min = 2; //解の最小値
    max = 98; //解の最大値
    return getRandom(min,max);
  }
  function getCurrentAnsMulti(){
    var anPrimeNumbers = getAnPrimeNumbers(); //素数の配列を取得

    //素数の一覧表示（テスト用）
    //for (i = 0; i < primeNumbers.length; i++){
    //  console.log('primeNumbers[i] ==>> ' + primeNumbers[i]);
    //}
  
    var min = 0;
    var max = anPrimeNumbers.length - 1;
    var pIndex
    pIndex = getRandom(min, max);
    //console.log('primeNumbers[pIndex] -> ' + primeNumbers[pIndex]);
    return anPrimeNumbers[pIndex]
  }
  
  function getCurrentAnsDiv(){
    var min,max;
    min = 2; //解の最小値
    max = 49; //解の最大値
    return getRandom(min,max);
  }
  
  function getLeftQAdd(_correctAns){
    var min,max;
    min = 1; //加算する最小値
    max = _correctAns - min;  
    return  getRandom(min,max);
  }
  function getLeftQSub(_correctAns){
    var min,max;
    min = _correctAns + 1; //加算する最小値
    max = 99;
    return getRandom(min,max);
  }
  function getLeftQMulti(_correctAns){
    var divisor = [] //約数
    var min,max;
    for (i = 2; i <= _correctAns / 2; i++){
      if (_correctAns % i === 0){
        divisor.push(i)
      }
    }
    //console.log(divisor);
    min = 0;
    max = divisor.length - 1;
    return divisor[getRandom(min, max)];
  }
  function getLeftQDiv(_correctAns){
    var multiple = []; //倍数
    var maxAns 
    var min ,max;
    maxAns = 99;
    
    for (i = 2; i * _correctAns <= maxAns; i++){
      if (i * _correctAns <= maxAns){
        multiple.push(i);
      }
    }

    min = 0
    max = multiple.length - 1; 
    return _correctAns * multiple[getRandom(min,max)];
  }

  
  function getRightQAdd(_correctAns,_leftQ){
    return correctAns - leftQ;
  }
  function getRightQSub(_correctAns,_leftQ){
    return _leftQ - correctAns;
  }
  function getRightQMulti(_correctAns,_leftQ){
    return _correctAns / _leftQ;
  }
  function getRightQDiv(_correctAns,_leftQ){
    return _leftQ / _correctAns;
  }
  
  function getOperationCode(){
    var min,max,opeName,random;
    min = 1
    max = 4
    
    random = getRandom(min ,max);
      
//    console.log("count -> " + addCount + "," + subCount + "," + multiCount + "," + divCount);
//    console.log("subCount -> " + subCount);
//    console.log("multiCount -> " + multiCount);
//    console.log("divCount -> " + divCount);
//    console.log('getope random -> ' + random);

    var maxQ = 25;

    if (random === 1 && addCount < maxQ){
      opeCode = OPE_ADD;
      addCount++;
    }else if (random === 1 && addCount >= maxQ){
      if (subCount < maxQ){
        opeCode = OPE_SUB;
        subCount++;
      }else if (multiCount < maxQ){
        opeCode = OPE_MULTI;
        multiCount++;
      }else{
        opeCode = OPE_DIV;
        divCount++;
      }
    }else if (random === 2 && subCount < maxQ){
      opeCode = OPE_SUB;
      subCount++;
    }else if (random === 2 && subCount >= maxQ){
      if (addCount < maxQ){
        opeCode = OPE_ADD;
        addCount++;
      }else if (multiCount < maxQ){
        opeCode = OPE_MULTI;
        multiCount++;
      }else{
        opeCode = OPE_DIV;
        divCount++;
      }
    }else if (random === 3 && multiCount < maxQ){
      opeCode = OPE_MULTI;
      multiCount++;
    }else if (random === 3 && multiCount >= maxQ){
      if (addCount < maxQ){
        opeCode = OPE_ADD;
        addCount++;
      }else if (subCount < maxQ){
        opeCode = OPE_SUB;
        subCount++;
      }else{
        opeCode = OPE_DIV;
        divCount++;
      }
    }else if (random === 4 && divCount < maxQ){
      opeCode = OPE_DIV;
      divCount++;
    }else if (random === 4 && divCount >= maxQ){
       if (addCount < maxQ){
        opeCode = OPE_ADD;
        addCount++;
      }else if (subCount < maxQ){
        opeCode = OPE_SUB;
        subCount++;
      }else{
        opeCode = OPE_MULTI;
        multiCount++;
      }
    }
    return opeCode;
  }
}

function getRandom(_min,_max){
  //console.log("call getRandom");
  var range;
  var ramdomRange;
  var randomNum;
  
  range = _max - _min + 1;
  ramdomRange = Math.floor(Math.random() * range);
  randomNum = ramdomRange + _min;
  return randomNum;
}

function getOperationCode(_opeName){
  var opeCode;
  switch (_opeName){
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


function getOperationName(_operationCode){
  switch (_operationCode){
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
    break;
  }
  return result;
}

function getAnPrimeNumbers(){
  
  var MAX = 99;
  var sieve = new Array(MAX);
  
  for (i = 0; i <= MAX ; i++ ){
    sieve[i] = true;
  }
  
  sieve[0] = false;
  sieve[1] = false;
  
  //---------------
  //素数にTrueを格納
  //---------------
  for (i = 2; i <= Math.sqrt(MAX) ; i++){
    if (sieve[i] === true){      
      for (j = i * 2 ; j <= MAX; j = j + i){
        sieve[j] = false;
      }
    }
  }
  
  //---------------
  //素数の数を取得
  //---------------
  var pCount = 0 //素数の数
  for (i = 0; i <= MAX; i++){
    if (sieve[i] === true){
      //console.log('i -> ' + i);
      pCount = pCount + 1;
    }
  }
  
  //--------------------------------
  //0と1を除いた素数以外の配列を作成
  //--------------------------------
  var pIndex = 0;
  var pAnNumbers = new Array(pCount);
  for (i = 2; i <= MAX; i++){
    if (sieve[i] === false){ //素数だけの場合はtrue,
      pAnNumbers[pIndex] = i;
      pIndex = pIndex + 1;
    }
  }
  return pAnNumbers
}

// =================
// ストップウォッチ
// =================

var started = 0; //開始フラグ
var timer1 = null; //タイマー
var startDate = -1; //開始時間

//---------------------
//ストップウォッチ開始
//---------------------
function startStopWatch(){
  if (started == 0){
    startDate = new Date();
    started = 1;
    timer1 = setInterval(showTime, 10);
  }else{
  }
}
//---------
//時間表示
//---------
function showTime(){
  if (started == 1){
    //console.log("call onload event!!");
   
    var stopwatchMiliSecond;

    var stopwatchSecond;
    var stopwatchMinute;
    var nowDate;
    
    nowDate = new Date();
    stopWatchTime = nowDate.getTime() - startDate.getTime();
    
    stopwatchMiliSecond = Math.floor( stopWatchTime / 10 ) % 60;
    stopwatchMiliSecond = ('0' + stopwatchMiliSecond).slice(-2)
    
    stopwatchSecond = Math.floor( stopWatchTime / 1000 ) % 60;
    stopwatchSecond = ('0' + stopwatchSecond).slice(-2)
    
    stopwatchMinute = Math.floor( stopWatchTime / 1000 / 60 ) % 60;
    stopwatchMinute = ('0' + stopwatchMinute).slice(-2)
    
    //console.log("stopwatchSecond : " + stopwatchSecond);
    //console.log("stopwatchMinute : " + stopwatchMinute);
    
    eLblTime = document.getElementById("lblTime");
    eLblTime.innerText = stopwatchMinute + "." + stopwatchSecond + "." + stopwatchMiliSecond;
  }
}

//
//Math.ramdomで取得される値
//rasult 0.3856537048811626
//result 0.8959839793677062
//       1234567890123457
// 7桁の少数
