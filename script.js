window.onresize = scaleElement;
let currentChoice = "";
let score = 0;

function scaleElement() {
    let choose = document.querySelector(".choose");
    let width = screen.width;
    if(width > 500){
        let scaleValue = width / 500;
        scaleValue = Math.min(scaleValue, 1.4);
        choose.style.transform = `scale(${scaleValue})`;
    }
    let scoreData = localStorage.getItem('scoreData');
    if(scoreData){
        document.querySelector('.score-number').innerHTML = JSON.parse(scoreData).score;
    }
};

function phase2(el){
    currentChoice = el.classList[0];
    el.classList.add('chosen');
    let otherElements = document.querySelectorAll(`.choice:not(.${currentChoice})`);
    otherElements.forEach(el => {
        el.classList.add('hidden');
    });
    let choices = ["paper","rock","scissors"];
    let houseChoice = choices[Math.floor(Math.random() * choices.length)];
    const button = document.createElement('button');
    button.innerHTML = `<div class="inner"><img src="./images/icon-${houseChoice}.svg" alt="${houseChoice}"></div>`;
    button.setAttribute('type', 'button');
    button.setAttribute('class', `${houseChoice} choice house-choice-button hidden`);
    document.querySelector('.choose').appendChild(button);
    document.querySelector('.your-choice').classList.remove('hidden');
    document.querySelector('.house-choice').classList.remove('hidden');
    document.querySelector('.pl-circle').classList.remove('hidden');
    setTimeout(function() {
        button.classList.remove('hidden');
    },1000);
    phase3(currentChoice, houseChoice);
}

function phase3(currentChoice, houseChoice){
    console.log(currentChoice, houseChoice);
    let resultBox = document.createElement('div');
    resultBox.classList.add('result-box','hidden');
    if(currentChoice == houseChoice){
        // tie
        resultBox.innerHTML = `
        <div class="result-title">YOU TIED!</div>
        <button type="button" onclick="reset()" class="result-button">PLAY AGAIN</button>
        `;
    }
    else if((currentChoice == 'paper' && houseChoice == 'rock') || (currentChoice == 'rock' && houseChoice == 'scissors') || (currentChoice == 'scissors' && houseChoice == 'paper')){
        //win
        resultBox.innerHTML = `
        <div class="result-title">YOU WIN!</div>
        <button type="button" onclick="reset()" class="result-button">PLAY AGAIN</button>
        `;
        setTimeout(function() {
            resultBox.classList.remove('hidden');
            document.querySelector('.score-number').innerHTML = parseInt(document.querySelector('.score-number').innerHTML) + 1;
        },1500);
    }
    else{
        //lose
        resultBox.innerHTML = `
        <div class="result-title">YOU LOSE!</div>
        <button type="button" onclick="reset()" class="result-button">PLAY AGAIN</button>
        `;
        setTimeout(function() {
            resultBox.classList.remove('hidden');
            document.querySelector('.score-number').innerHTML = parseInt(document.querySelector('.score-number').innerHTML) - 1;
        },1500);
        }
    document.querySelector('.choose').appendChild(resultBox);
    setTimeout(function() {
        resultBox.classList.remove('hidden');
        let score = {score: parseInt(document.querySelector('.score-number').innerHTML)};
        let scoreData = JSON.stringify(score);
        localStorage.setItem('scoreData',scoreData);
    },1500);
}

function reset() {
    location.reload();
}

function returnButtonState(){
    document.querySelector('.rules-button').style.outline = 'solid 2px white';
}

document.addEventListener("DOMContentLoaded", scaleElement);