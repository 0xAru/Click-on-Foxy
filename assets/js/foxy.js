function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let cont = document.querySelector("#jeu");
let foxy = document.querySelector("#foxy");
let containerTime = document.querySelector("#time");
let containerScore = document.querySelector("#score");
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");
let restart = document.querySelector("#restart");
let userName = localStorage.getItem('player');
let userBestScore = localStorage.getItem('bestScore');
let limitWidth = cont.clientWidth;
let limitHeight = cont.clientHeight;
let time = 20;
let score = 0;
let timeInterval;
let foxyInterval;
let gameStart = false;


if (userBestScore) {
    userBestScore = JSON.parse(userBestScore)
    document.querySelector('#bestScore').innerHTML = " Meilleur score: " + userBestScore.score;
}

function begin() {
    score = 0;
    containerScore.innerHTML = "Score : " + score;
    containerTime.innerHTML = "Timer : " + time;
    if (gameStart == false) {
        time = 20;
        score = 0;
        gameStart = true;
        timeInterval = setInterval(countDown, 1000);
        foxyInterval = setInterval(move, 1000);
    }
}

function move() {
    let randomWidth = random(0, limitWidth - foxy.clientWidth);
    let randomHeight = random(0, limitHeight - foxy.clientHeight);
    foxy.style.left = randomWidth + "px";
    foxy.style.bottom = randomHeight + "px";
}


function countDown() {
    time--
    containerScore.innerHTML = "Score : " + score;
    containerTime.innerHTML = "Timer : " + time;
    if (time <= 0) {
        clearInterval(timeInterval)
        clearInterval(foxyInterval)
        gameStart = false;
        endGame()
    }
}

function scoring() {
    score++
    containerScore.innerHTML = "Score : " + score;
    clearInterval(foxyInterval)
    foxyInterval = setInterval(move, 1000);
    move()
}

function endGame() {
    if (userBestScore) {
        if (userBestScore.score < score) {
            let bestScore = {
                name: userName,
                score: score
            }
            document.querySelector('#bestScore').innerHTML = " Meilleur score: " + bestScore.score
            localStorage.setItem("bestScore", JSON.stringify(bestScore))
        }
    } else {
        let bestScore = {
            name: userName,
            score: score
        }
        document.querySelector('#bestScore').innerHTML = " Meilleur score: " + bestScore.score
        localStorage.setItem("bestScore", JSON.stringify(bestScore))
    }
    openModal()
}

begin()

function openModal() {
    modal.classList.add("show-modal");
    document.querySelector("#score-final").innerHTML = "Bien joué " + userName + "! Ton score final est de " + score + " points."
}

function closeModal() {
    modal.classList.remove("show-modal");
    begin()
}

restart.addEventListener("click", closeModal);

