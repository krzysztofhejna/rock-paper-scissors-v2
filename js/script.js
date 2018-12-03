'use strict';
(function () {
    var params = {
            pointsToWin: null,
            buttonNewGame: document.getElementById("newGame-btn"),
            buttons: document.querySelectorAll('.game-btn'),
            userScore: 0,
            computerScore: 0,
            userScoreSpan: document.getElementById("user-score"),
            computerScoreSpan: document.getElementById("computer-score"),
            output: document.getElementById("output")
    }

    var isInputValid = function (pointsToWin) {
        if (!params.pointsToWin || isNaN(params.pointsToWin) || params.pointsToWin < 1 || params.pointsToWin > 10) {
            return alert('Please enter a number between 1 and 10.');
        }
        return true;
    }

    var newGame = function () {
        params.pointsToWin = window.prompt ('Amount of points needed to win the game? Max-10');
        if (isInputValid(params.pointsToWin)) {
            document.getElementById('newGame-btn').style.display = "none";
            document.getElementById('scoreboard').style.display = "block";
            document.getElementById('memo').style.display = "block";
            for (var i=0; i < params.buttons.length; i++) {
                params.buttons[i].style.display = "inline-block";
            }
            activateButtons();
            params.userScore = 0;
            params.userScoreSpan.innerHTML = params.userScore;
            params.computerScore = 0;
            params.computerScoreSpan.innerHTML = params.computerScore;
            while (params.output.hasChildNodes ()) {
                params.output.removeChild(params.output.firstChild);
            }
        }
    }
    
    var isGameFinished = function(score) {
        if (score >= params.pointsToWin) {
            return true;
        }
        return false;
    }

    var disableButtons = function() {
    	for (i = 0; i < params.buttons.length; i++) {
            params.buttons[i].disabled = true;
        }
    }
    
    var activateButtons = function() {
        for (i = 0; i < params.buttons.length; i++) {
            params.buttons[i].disabled = false;
        }
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
        params.userScore++;
        params.userScoreSpan.innerHTML = params.userScore;
        document.getElementById(playerPick).classList.add('green-border');
        setTimeout(function() {document.getElementById(playerPick).classList.remove('green-border')}, 500);
        if (isGameFinished(params.userScore)) {
            params.output.innerHTML = ('You WON. Press "Start a New Game" to play again!');
            document.getElementById("newGame-btn").style.display = "block";
            disableButtons();
        }
    }

    var lose = function(playerPick) {
        params.computerScore++;
        params.computerScoreSpan.innerHTML = params.computerScore;
        document.getElementById(playerPick).classList.add('red-border');
        setTimeout(function() {document.getElementById(playerPick).classList.remove('red-border')}, 500);
        if (isGameFinished(params.computerScore)) {
            params.output.innerHTML = ('You LOST. Press "Start a New Game" to play again!');
            document.getElementById("newGame-btn").style.display = "block";
            disableButtons();
        }
    }

    var draw = function(playerPick) {
        params.userScoreSpan.innerHTML = params.userScore;
        params.computerScoreSpan.innerHTML = params.computerScore;
        document.getElementById(playerPick).classList.add('gray-border');
        setTimeout(function() {document.getElementById(playerPick).classList.remove('gray-border')}, 500);
    }

    var playerMove = function(playerPick) {
        switch (playerPick + opponentPick()) {
            case "rockrock":
                params.output.innerHTML = ('You both chose ROCK. It is a tie.');
                draw(playerPick);
                break;
            case "paperpaper":
                params.output.innerHTML = ('You both chose PAPER. It is a tie.');
                draw(playerPick);
                break;
            case "scissorsscissors":
                params.output.innerHTML = ('You both chose SCISSORS. It is a tie.');
                draw(playerPick);
                break;
            case "rockpaper":
                params.output.innerHTML = ('You played ROCK, opponent played PAPER. You lost.');
                lose(playerPick);
                break;
            case "rockscissors":
                params.output.innerHTML = ('You played ROCK, opponent played SCISSORS. You won.');
                win(playerPick);
                break;
            case "paperscissors":
                params.output.innerHTML = ('You played PAPER, opponent played SCISSORS. You lost.');
                lose(playerPick);
                break;
            case "paperrock":
                params.output.innerHTML = ('You played PAPER, opponent played ROCK. You won.');
                win(playerPick);
                break;
            case "scissorsrock":
                params.output.innerHTML = ('You played SCISSORS, opponent played ROCK. You lost.');
                lose(playerPick);
                break;
            case "scissorspaper":
                params.output.innerHTML = ('You played SCISSORS, opponent played PAPER. You won.');
                win(playerPick);
                break;
        }
    }

    params.buttonNewGame.addEventListener('click', newGame);

    for (var i = 0; i < params.buttons.length; i++) {
        params.buttons[i].addEventListener('click', function() {
            playerMove(this.getAttribute("data-move"));
        });
    }
})();