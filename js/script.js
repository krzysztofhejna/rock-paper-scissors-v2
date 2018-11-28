'use strict';
(function () {
    var pointsToWin;
    var button1 = document.getElementById("newGame-btn");
    var buttonRock = document.getElementById("rock");
    var buttonPaper = document.getElementById("paper");
    var buttonScissors = document.getElementById("scissors");
    var userScore = 0;
    var computerScore = 0;
    var userScoreSpan = document.getElementById("user-score");
    var computerScoreSpan = document.getElementById("computer-score");
    var output = document.getElementById("output");


    var isInputValid = function (pointsToWin) {
        if (!pointsToWin || isNaN(pointsToWin) || pointsToWin < 1 || pointsToWin > 10) {
            return alert('Please enter a number between 1 and 10.');
        }
        return true;
    }

    var newGame = function () {
        pointsToWin = window.prompt ('Amount of points needed to win the game? Max-10');
        if (isInputValid(pointsToWin)) {
            document.getElementById('newGame-btn').style.display = "none";
            document.getElementById('scoreboard').style.display = "block";
            document.getElementById('memo').style.display = "block";
            var buttons = document.getElementsByClassName('game-btn');
            for (var i=0; i < buttons.length; i++) {
                buttons[i].style.display = "inline-block";
            }
            activateButtons();
            userScore = 0;
            userScoreSpan.innerHTML = userScore;
            computerScore = 0;
            computerScoreSpan.innerHTML = computerScore;
            output.innerHTML = ('');
        }
    }
    
    var isGameFinished = function(Score) {
        if (Score >= pointsToWin) {
            return true;
        }
        return false;
    }

    var disableButtons = function() {
    	buttonRock.disabled = true;
    	buttonPaper.disabled = true;
    	buttonScissors.disabled = true;
    }
    
    var activateButtons = function() {
        buttonRock.disabled = false;
    	buttonPaper.disabled = false;
    	buttonScissors.disabled = false;
    }

    var opponentPick = function (){
        switch (Math.floor(Math.random() * 3) + 1) {
            case 1:
                return 'rock';
            case 2:
                return 'paper';
            case 3:
                return 'scissors';
        }
    }

    var win = function(playerPick) {
        userScore++;
        userScoreSpan.innerHTML = userScore;
        document.getElementById(playerPick).classList.add('green-border');
        setTimeout(function() {document.getElementById(playerPick).classList.remove('green-border')}, 500);
        if (isGameFinished(userScore)) {
            output.innerHTML = ('You WON. Press "Start a New Game" to play again!');
            document.getElementById("newGame-btn").style.display = "block";
            disableButtons();
        }
    }

    var lose = function(playerPick) {
        computerScore++;
        computerScoreSpan.innerHTML = computerScore;
        document.getElementById(playerPick).classList.add('red-border');
        setTimeout(function() {document.getElementById(playerPick).classList.remove('red-border')}, 500);
        if (isGameFinished(computerScore)) {
            output.innerHTML = ('You LOST. Press "Start a New Game" to play again!');
            document.getElementById("newGame-btn").style.display = "block";
            disableButtons();
        }
    }

    var draw = function(playerPick) {
        userScoreSpan.innerHTML = userScore;
        computerScoreSpan.innerHTML = computerScore;
        document.getElementById(playerPick).classList.add('gray-border');
        setTimeout(function() {document.getElementById(playerPick).classList.remove('gray-border')}, 500);
    }

    var playerMove = function(playerPick) {
        switch (playerPick + opponentPick()) {
            case "rockrock":
                output.innerHTML = ('You both chose ROCK. It is a tie.');
                draw(playerPick);
                break;
            case "paperpaper":
                output.innerHTML = ('You both chose PAPER. It is a tie.');
                draw(playerPick);
                break;
            case "scissorsscissors":
                output.innerHTML = ('You both chose SCISSORS. It is a tie.');
                draw(playerPick);
                break;
            case "rockpaper":
                output.innerHTML = ('You played ROCK, opponent played PAPER. You lost.');
                lose(playerPick);
                break;
            case "rockscissors":
                output.innerHTML = ('You played ROCK, opponent played SCISSORS. You won.');
                win(playerPick);
                break;
            case "paperscissors":
                output.innerHTML = ('You played PAPER, opponent played SCISSORS. You lost.');
                lose(playerPick);
                break;
            case "paperrock":
                output.innerHTML = ('You played PAPER, opponent played ROCK. You won.');
                win(playerPick);
                break;
            case "scissorsrock":
                output.innerHTML = ('You played SCISSORS, opponent played ROCK. You lost.');
                lose(playerPick);
                break;
            case "scissorspaper":
                output.innerHTML = ('You played SCISSORS, opponent played PAPER. You won.');
                win(playerPick);
                break;
        }
    }

    button1.addEventListener('click', newGame);

    buttonRock.addEventListener('click', function() {
        playerMove("rock");
    });
    
    buttonPaper.addEventListener('click', function() {
        playerMove("paper");
    });

    buttonScissors.addEventListener('click', function() {
        playerMove("scissors");
    });
})();