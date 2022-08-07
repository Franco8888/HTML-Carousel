var images = document.getElementById('images');
var dotButtons = document.getElementsByClassName('dot');
var width = document.querySelector('.slideshow-container').offsetWidth;
var backButton = document.getElementById('backButton')
var forwardButton = document.getElementById('forwardButton')
// settings:
var total = 4;  // total number of slides
var transitionTimeSeconds = 3;

var currentIndex = 0;
var manualTransitionPromted = false;
var moveRight = false;
var moveLeft = false;
var moveToStart = false;
var firstEntry = false;
var moveAmount = 0;
var moveAmountString = '';

showSlides();

// Next/prev buttons pressed
function onTransition(increment) {
    manualTransitionPromted = true;
    // increment 1
    if (increment === 1) {
        if (currentIndex === total - 1) {
            return;
        } else {
            currentIndex++;
            moveRight = true;
        }
    }
    // subtract 1
    if (increment === -1) {
        if (currentIndex === 0) {
            return;
        } else {
            currentIndex--;
            moveLeft = true;
        }
    }

    showSlides();
}

// Use dot buttons
function onTransitionToSlide(slide) {
    manualTransitionPromted = true;
    if (currentIndex === slide) {
        showSlides();
        return;
    }
    currentIndex = slide;

    showSlides();
}

// SHow slides using buttons
async function showSlides() {
    calculateAllowedTransition();   // calculation for normal buttons

    moveSlides();

    // setting correct dot button to active
    for (let i = 0; i < dotButtons.length; i++) {
        dotButtons[i].classList.remove('active');
    }
    dotButtons[currentIndex].classList.add('active');
    
    if (!firstEntry) {
        await delay(500);
        autoShowSlides();
    }
    firstEntry = false;
}

// show slides with automatic transition
async function autoShowSlides() {
    for (let j = 0; j < transitionTimeSeconds * 2; j++) {
        await delay(500);
        const result = checkIfManualTransitionPromted();
        if (result) {
            manualTransitionPromted = false;
            return;
        }
    }

    // auto increment index
    if (currentIndex === total - 1) {
        currentIndex = 0;
        moveToStart = true;
    } else {
        currentIndex++;
        moveRight = true;
    }
    // for normal buttons
    calculateAllowedTransition();

    moveSlides();

    // setting correct dot button to active
    for (let i = 0; i < dotButtons.length; i++) {
        dotButtons[i].classList.remove('active');
    }
    dotButtons[currentIndex].classList.add('active');

    autoShowSlides();
}

function moveSlides() {
    if (firstEntry) {
        return;
    } else {
        // normal buttons
        if (moveRight) {
            moveAmount += -(width);
        }
        if (moveLeft) {
            moveAmount += (width);
        }
        if (moveToStart) {
            moveAmount = 0;
        }
        moveRight = false;
        moveLeft = false;
        moveToStart = false;

        // dot buttons
        moveAmount = -(currentIndex) * width;
    }

    moveAmountString = `translateX(${moveAmount}px)`;
    images.style.transform = moveAmountString;
}

function checkIfManualTransitionPromted(){
    if (manualTransitionPromted) {
        return true;
    } else {
        return false;
    }
}

// Calculate Allowed transition for buttons
function calculateAllowedTransition() {
    if (currentIndex === 0) {
        backButton.style.visibility = 'hidden';
    } else {
        backButton.style.visibility = 'visible';
    }
    if (currentIndex === total - 1) {
        forwardButton.style.visibility = 'hidden';
    } else {
        forwardButton.style.visibility = 'visible';
    }

}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
