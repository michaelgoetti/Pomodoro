
let sessDuration = 25;
let brkDuration = 5;
let hrs;
let mins; 
let secs;
let timer;
let timerRunning = false;
let pctCplt;
let pctRemain;
let sessBreak = 'session';

const fmtTime = function(a) {
  if (a <= 9) {
    return "0" + a;
  } else {
    return a;
  }
}

$("#time-disp").text(fmtTime(sessDuration) + ":00");

const sessBreakReset = function() {
  sessBreak = 'session';
  $("#break").css({ opacity: '0.3' });
  $("#session").css({ opacity: '1' });
  $("#time-disp").text(fmtTime(sessDuration) + ":00");
  $(".flip-color1").css({ 'background-color': 'green' });
  $(".flip-color2").css({ 'border-left': '50px solid green' });
  $(".flip-color3").css({ 'border-right': '30px solid green' });  
}

const sessBreakFlip = function() {
  sessBreak = 'break';
  $("#break").css({ opacity: '1' });
  $("#session").css({ opacity: '0.3' });
  $("#time-disp").text(fmtTime(brkDuration) + ":00");
  $(".flip-color1").css({ 'background-color': '#448dee' });
  $(".flip-color2").css({ 'border-left': '50px solid #448dee' });
  $(".flip-color3").css({ 'border-right': '30px solid #448dee' });
  $("#right-semi").css({ 'background-color': '#222222' });
}

$("#pie-top").click(function() {
  if (sessBreak === 'session' && timerRunning === false) {
    sessBreakFlip();
  } else if (sessBreak === 'break' && timerRunning === false) {
    sessBreakReset();
  }
})

$("#play-box").click(function(){
  if (timerRunning === false) {
    sessBreakReset();
    pomoTimer(sessDuration);
    timerRunning = true;
  }
});

$("#reset-box").click(function(){
  sessBreakReset();
  clearInterval(timer);
  timerRunning = false;
  $("#left-semi").css("transform", "");
  $("#right-semi").css("transform", "");
  $("#right-semi").css({ 'background-color': '#222222' });
  $("#min-hand").css("transform", "");
  $("#time-disp").text(fmtTime(sessDuration) + ":00");
});

const pomoTimer = function(durMins) {
  let durTime = durMins * 60 * 1000;
  let endTime = new Date().getTime() + durTime;
  let secCounter = 0;
  pctCplt = 0;
  pctRemain = 0;
  
  timer = setInterval(function() {
    let currTime = new Date().getTime();
    let pomoRemain = endTime - currTime;
    let clockRemain = pomoRemain + 1000;
    let min = fmtTime(Math.floor((clockRemain % (1000 * 3600)) / (1000 * 60)));
    let sec = fmtTime(Math.floor((clockRemain % (1000 * 60)) / 1000));
    pctCplt = (((durTime - pomoRemain) / durTime) * 100).toFixed(1);
    pctRemain = 100 - pctCplt;
    
    secCounter += 0.25;

    $("#min-hand").css({transform: 'rotate(' + (secCounter * 6) + 'deg)'});
    if (pctCplt < 50) {
      $("#right-semi").css({transform: 'rotate(' + (pctCplt * 3.6) + 'deg)'});
    } else if (pctCplt >= 50) {
      $("#right-semi").css({transform: 'rotate(0deg)'});
      $("#left-semi").css({transform: 'rotate(' + ((pctCplt - 50) * 3.6) + 'deg)'});
      if (sessBreak === 'session') {
        $("#right-semi").css({ 'background-color': 'green' });
      } else if (sessBreak === 'break') {
        $("#right-semi").css({ 'background-color': '#448dee' });
      }
    }
    
    $("#time-disp").text(min + ":" + sec);
    
    if (pomoRemain < 0.00001 && sessBreak === 'session') {
			clearInterval(timer);
			$('#time-disp').text('00:00');
      sessBreakFlip();
      pomoTimer(brkDuration);
      $("#left-semi").css({ 'transform': '' });
      $(".flip-color").css({ 'background-color': 'LightBlue'});
      $("#time-disp").text(fmtTime(sessDuration) + ":00");
    } else if  (pomoRemain < 0.00001 && sessBreak === 'break') {
      clearInterval(timer);
			$('#time-disp').text('00:00');
    } 
    
  }, 250);
  
}

$("#plus-box").click(function() {
  if (sessBreak === 'session') {
    if (sessDuration < 59 && timerRunning === false) {
      sessDuration ++;
      $("#time-disp").text(fmtTime(sessDuration) + ":00");
    }
  } else if ( brkDuration < 59 && sessBreak === 'break') {
    brkDuration ++;
    $("#time-disp").text(fmtTime(brkDuration) + ":00");
  }
})

$("#minus-box").click(function() {
  if (sessBreak === 'session') {
    if (sessDuration > 1 && timerRunning === false) {
      sessDuration --;
      $("#time-disp").text(fmtTime(sessDuration) + ":00");
    }
  } else if ( brkDuration > 1 && sessBreak === 'break') {
    brkDuration --;
    $("#time-disp").text(fmtTime(brkDuration) + ":00");
  }
})




