/*globals window, document, setInterval, event , localStorage */

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
    drawCtxLastYear();
    drawPast();

};
