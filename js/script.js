'use strict';
(function () {
    var pointsToWin;
    var button1 = document.getElementById('newGame-btn');
    var buttonRock = document.getElementById('rock-btn');
    var buttonPaper = document.getElementById('paper-btn');
    var buttonScissors = document.getElementById('scissors-btn');
    var userScore = 0;
    var computerScore = 0;


    var isInputValid = function (pointsToWin) {
        if (!pointsToWin || isNaN(pointsToWin) || pointsToWin < 1 || pointsToWin > 10) {
            return alert('Please enter a number between 1 and 10.');
        }

        return true;
    }

    var isGameFinished = function(Score) {
        if (Score >= pointsToWin) {
            return true;
        }
        
        return false;
    }

    var playerMove = function (playerPick) {
        var userScoreSpan = document.getElementById('user-score');
        var computerScoreSpan = document.getElementById("computer-score");
        var output = document.getElementById('output');
        var opponentPick = function (){
            switch (Math.floor(Math.random() * 3) + 1) {
                case 1:
                    return 'rock';
                case 2:
                    return 'paper';
                case 3:
                    return 'scissors';
            };
        }

        var win = function() {
            userScore++;
            userScoreSpan.innerHTML = userScore;
            if (isGameFinished(userScore)) {
                return alert('dd');
            }
        }

        var lose = function() {
            computerScore++;
            computerScoreSpan.innerHTML = computerScore;
        }

        var draw = function() {
            userScoreSpan.innerHTML = userScore;
            computerScoreSpan.innerHTML = computerScore;
        }

        switch (playerPick + opponentPick()) {
            case "rockrock":
                draw();
                return output.innerHTML = ('You both chose ROCK. It is a tie.');
            case "paperpaper":
                draw();
                return output.innerHTML = ('You both chose PAPER. It is a tie.');
            case "scissorsscissors":
                draw();
                return output.innerHTML = ('You both chose SCISSORS. It is a tie.');
            case "rockpaper":
                lose();
                return output.innerHTML = ('You played ROCK, opponent played PAPER. You lost.');
            case "rockscissors":
                win();
                return output.innerHTML = ('You played ROCK, opponent played SCISSORS. You won.');
            case "paperscissors":
                lose();
                return output.innerHTML = ('You played PAPER, opponent played SCISSORS. You lost.');
            case "paperrock":
                win();
                return output.innerHTML = ('You played PAPER, opponent played ROCK. You won.');
            case "scissorsrock":
                lose();
                return output.innerHTML = ('You played SCISSORS, opponent played ROCK. You lost.');
            case "scissorspaper":
                win();
                return output.innerHTML = ('You played SCISSORS, opponent played PAPER. You won.');
        }
    }

    button1.addEventListener('click', function() {
        pointsToWin = window.prompt ('Amount of points needed to win the game? Max-10');
        if (isInputValid(pointsToWin)) {
            document.getElementById('newGame-btn').style.display = "none";
            document.getElementById('scoreboard').style.display = "block";
            document.getElementById('memo').style.display = "block";
            var buttons = document.getElementsByClassName('game-btn');
            for (var i=0; i < buttons.length; i++) {
                buttons[i].style.display = "inline-block";
            }
        }
    });

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