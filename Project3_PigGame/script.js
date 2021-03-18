'use strict';
const scoreP1Element = document.getElementById("score--0");
const scoreP2Element = document.getElementById("score--1");
const currentScoreP1Element = document.getElementById("current--0");
const currentScoreP2Element = document.getElementById("current--1");
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1Element = document.querySelector('.player--0');
const player2Element = document.querySelector('.player--1');

let score, currentScore;
let isPlaying;
let currentPlayer = 0;
let scores = [0, 0];

const init = function(){
    score = 0;
    currentScore = 0;
    isPlaying = true;
    currentPlayer = 0;
    scores = [0, 0];

    scoreP1Element.textContent = score;
    scoreP2Element.textContent = score;
    currentScoreP1Element.textContent = currentScore;
    currentScoreP2Element.textContent = currentScore;

    dice.classList.add('hidden');
    player1Element.classList.remove('player--winner');
    player2Element.classList.remove('player--winner');

};
init();

const switchPlayer = function(){
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    currentScore = 0;
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    player1Element.classList.toggle('player--active');
    player2Element.classList.toggle('player--active');

};

btnRoll.addEventListener('click', function(){
    if(isPlaying){
        let diceNumber = Math.trunc((Math.random()*6))+1;
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNumber}.png`;
        if(diceNumber!==1){
            currentScore+=diceNumber;
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
        }
        else{
            //switch player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    scores[currentPlayer] += currentScore;
    currentScore = 0;
    document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];
    if(scores[currentPlayer]>=20){
        document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
        isPlaying = false;
        document.querySelector('.modal').classList.remove('hidden');
        document.querySelector('.overlay').classList.remove('hidden');
        document.querySelector('.modalText').textContent = `Player ${currentPlayer+1} has won the match 🏆🏆🏆. (Click on New Game)`
    }
    else{
        switchPlayer();
    }
    console.log(scores);
});

btnNew.addEventListener('click', function(){
    init();
});


// script for modal
const openModalButtons = document.querySelectorAll('.openModal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.closeButton');

const openModal = function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

for(let i=0; i<openModalButtons.length; i++)
{
    openModalButtons[i].addEventListener('click', openModal);
}

closeButton.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e){
    if(e.keyCode===27 && !modal.classList.contains('hidden'))
    {
        closeModal();
    }
});