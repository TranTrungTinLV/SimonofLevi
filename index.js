'use strict'
const button = document.querySelectorAll('.btn');

let buttonColor = ["green", "red", "yellow", "blue"];

let userClick = [];

let gamePass = [];

let level = 0;
let start = false;

document.addEventListener('keydown', function (e) {
    // e.preventDefault();
    if (!start) {
        // document.getElementById('text-title').textContent = 'hello';
        nextSound();
        start = true;
    }
})

for (var i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function (e) {
        e.preventDefault();
        console.log("hello");
        let userChosenColor = this.id; // nhận id
        userClick.push(userChosenColor);
        PlaySound(userChosenColor);
        AnimatedCurrent(userChosenColor);
        checkAnswer(userClick.length - 1)
    })
}


function PlaySound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    if (gamePass[currentLevel] === userClick[currentLevel]) {
        if (userClick.length === gamePass.length) {
            setTimeout(function () {
                nextSound();
            }, 1000);
        }
    } else {
        PlaySound("wrong");
        document.body.classList.add("game-over");
        document.querySelector('.container').style.opacity = 0;
        document.querySelector('h1').style.opacity = 0;
        document.getElementById('level-title').textContent = 'Game Over, Please try again!';
        setTimeout(function () {
            document.body.classList.remove("game-over");
            document.querySelector('.container').style.opacity = 1;
            document.querySelector('h1').style.opacity = 1;
        }, 3000);
        // document.querySelector('.container').style.opacity = 1;

        startOver();
    }
}

//trong quá trình chơi(level)
function nextSound() {
    userClick = [];
    level++;
    document.getElementById('level-title').textContent = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChoosenNumber = buttonColor[randomNumber];
    gamePass.push(randomChoosenNumber);
    document.getElementById(randomChoosenNumber).classList.add('pressed');
    setTimeout(function () {
        document.getElementById(randomChoosenNumber).classList.remove('pressed');

    }, 1000);
    PlaySound(randomChoosenNumber);
}


function AnimatedCurrent(current) {
    document.getElementById(current).classList.add('pressed');

    setTimeout(function () {
        document.getElementById(current).classList.remove('pressed');

    }, 100);

}

function startOver() {
    level = 0;
    gamePass = [];
    start = false;
}

// ... (Your existing code)

// Function to show the start popup
function showStartPopup() {
    document.querySelector('.popup').style.display = 'block';
    start = true;
}

// Function to hide the start popup
function hideStartPopup() {
    document.querySelector('.popup').style.display = 'none'; 
    nextSound();
    userClick.push(userChosenColor);
    PlaySound(userChosenColor);
    AnimatedCurrent(userChosenColor);
    checkAnswer(userClick.length - 1)
}

// Add an event listener to the "Start" button in the popup
document.getElementById('startButton').addEventListener('click', function () {
    hideStartPopup(); // Hide the popup when the "Start" button is clicked
    startGame(); // Start the game after hiding the popup
});

// Add an event listener to the document to show the popup when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Show the popup only on mobile devices (you can adjust the screen width as needed)
    if (window.innerWidth <= 768) {
        document.querySelector('h1').textContent = ' '; //
        showStartPopup();
    }
});

// ... (Your existing code)
