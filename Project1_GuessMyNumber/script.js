let number = Math.trunc(Math.random()*20+1);
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function(){
    let userInput = Number(document.querySelector(".inp").value);
    if(!userInput)
    {
        displayMessage("🥱Enter valid number!");
    }
    else if(userInput===number)
    {
        displayMessage("🍾 Correct!");
        document.querySelector('.number').textContent = number;
        document.querySelector('body').style.backgroundColor = "#60b347";
        document.querySelector('.inp').style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.5)';
        if(score>highScore)
        {
            highScore = score;
            document.querySelector('.highScore').  textContent = highScore;
        }
    }
    else if(userInput!==number)
    {
        if(score>1)
        {
            displayMessage(userInput>number ? "📈 Too high!" : "📉 Too low!");
            score--;
            displayScore(score);
        }
        else
        {
            displayMessage("💩 You lost the game.");
            score = 0;
            displayScore(score);
        }
        
    }
});

document.querySelector('.again').addEventListener('click', ()=>{
    score = 20;
    displayScore(score);
    // userInput = '';
    displayMessage("Start guessing...");
    number = Math.trunc(Math.random()*20+1);
    document.querySelector(".inp").value = '';
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.inp').style.boxShadow = '5px 5px 10px rgba(143, 125, 125, 0.5)';
})

function displayMessage(message)
{
    document.querySelector('.message').textContent = message;
}

function displayScore(score)
{
    document.querySelector('.score').textContent = score;
}

