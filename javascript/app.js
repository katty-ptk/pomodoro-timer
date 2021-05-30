// VARIABLES
const STUDY_TIME = 10;
const BREAK_TIME = 5;

let time_left = convertSeconds(STUDY_TIME);
let counter = 0;
let timer_interval = -1;    // the timer is paused
let study_interval;

const ding = new Audio();
ding.src = "../ding.mp3";

const timer = document.getElementById('time-left');
timer.innerHTML = time_left;

const start_pause = document.querySelector('.start');


// FUNCTIONS
function convertSeconds(sec) {
    let minutes = Math.floor(sec / 60 );   
    let seconds = sec % 60;

    if ( minutes < 10 ) {
        if ( seconds < 10 ) {
            return '0' + minutes + ' : 0' + seconds;
        } 
        return '0' + minutes + ' : ' + seconds;
    } else if ( seconds < 10 ) {
        return minutes + ' : 0' + seconds;
    } else {
        return minutes + ' : ' + seconds;
    }
}   // converts seconds into minutes

$('.start').click(() => {
    study_interval = setInterval( studyTime, 1000 );
});

function studyTime() {
    start_pause.innerHTML = "Pause";
    time_left = STUDY_TIME; // 30 : 00
    timer.innerHTML = convertSeconds(time_left - counter);
    counter += 1;

    if ( time_left == counter ) {   // 00 : 00
        ding.play();
        clearInterval(study_interval);  // pauses timer
        timer.innerHTML = "00 : 00";
        start_pause.innerHTML = "Start";
    }
}