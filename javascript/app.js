// VARIABLES
const STUDY_TIME = 10;
const BREAK_TIME = 5;

let time_left = STUDY_TIME;
let counter = 0;
let interval = -1;    // the timer is paused

const ding = new Audio();
ding.src = "../ding.mp3";

const timer = document.getElementById('time-left');
timer.innerHTML = convertSeconds(time_left);

const start_pause = document.querySelector('.start');
start_pause.addEventListener('click', function() {
    startPauseTimer();

    if ( this.innerHTML == "Start" ) {
        this.innerHTML = "Pause";
    } else {
        this.innerHTML = "Start";
    }
});


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

function startPauseTimer() {
    if ( interval != -1 ) {
        pauseInterval();
    } else {
        updateInterval();
    }
}

function pauseInterval() {
    clearInterval( interval );
    interval = -1;
}

function updateInterval() {
    if ( time_left == STUDY_TIME ) {
        studyInterval();
    } else {
        breakInterval();
    }
}

function studyInterval() {
    interval = setInterval( studyTime, 1000 );
}

function breakInterval() {
    interval = setInterval( breakTime, 1000 );
}

function startTimer( callback, time_left_value ) {
    time_left = time_left_value; // 30 : 00
    timer.innerHTML = convertSeconds( time_left - counter );
    counter += 1;

    if ( time_left == counter ) {   // 00 : 00
        // ding.play();
        clearInterval( interval );
        counter = 0;
        callback();
    }
}

function studyTime() {
    startTimer( breakInterval, STUDY_TIME );
}

function breakTime() {
    startTimer( studyInterval, BREAK_TIME );
}