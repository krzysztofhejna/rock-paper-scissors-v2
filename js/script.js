'use strict';
(function () {
    var buttonNewGame = document.getElementById("newGame-btn");
    var startButton = document.getElementById("formButton");
    var roundLimit = document.getElementById("inputRoundLimit");
    var buttons = document.querySelectorAll('.game-btn');
    var userScoreSpan = document.getElementById("user-score");
    var computerScoreSpan = document.getElementById("computer-score");
    var output = document.getElementById("output");

    var modals = document.querySelectorAll('.modal');
    var modalNewGame = document.getElementById("modal-newGame")
    var modalScore = document.getElementById("modal-score");
    var modalOutput = document.getElementById("modal-score__output");
    var closeButtons = document.querySelectorAll('.modal .close');
    var modalTableBody = document.getElementById('game-table__body');

    var params = {
        pointsToWin: null,
        roundCount: 0,
        userScore: 0,
        computerScore: 0,
        playerChoice: undefined,
        computerChoice: undefined,
        roundResult: undefined,
        progress: [],
    }

    var gameData = {
        roundNmbr: undefined,
        playerMv: undefined,
        computerMv: undefined,
        roundRslt: undefined,
        gameScr: undefined,
    }

    var isInputValid = function (pointsToWin) {
        if (!params.pointsToWin || isNaN(params.pointsToWin) || params.pointsToWin < 1 || params.pointsToWin > 10) {
            return alert('Please enter a number between 1 and 10.');
        }
        return true;
    }

    var newGame = function () {
        params.pointsToWin = roundLimit.value;
        if (isInputValid(params.pointsToWin)) {
            document.getElementById('newGame-btn').style.display = "none";
            document.getElementById('scoreboard').style.display = "block";
            document.getElementById('memo').style.display = "block";
            for (var i=0; i < buttons.length; i++) {
                buttons[i].style.display = "inline-block";
            }
            activateButtons();
            params.roundCount = 0;
            params.progress = [];
            params.userScore = 0;
            userScoreSpan.innerHTML = params.userScore;
            params.computerScore = 0;
            computerScoreSpan.innerHTML = params.computerScore;
            while (output.hasChildNodes()) {
                output.removeChild(output.firstChild);
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
    	for (i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
    
    var activateButtons = function() {
        for (i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }
    }

    var playerMove = function(playerPick) {
        params.roundCount = ++params.roundCount;
        params.playerChoice = playerPick;
        var passRoundResult = function (msg, computerChoice, roundResult) {
            output.innerHTML = msg;
            params = Object.assign(params, {
              computerChoice: computerChoice,
              roundResult: roundResult,
            });
          }
        switch (playerPick + opponentPick()) {
            case "rockrock":
                passRoundResult('You both chose ROCK. It is a tie.', 'rock', 'draw');
                draw(playerPick);
                break;
            case "paperpaper":
                passRoundResult('You both chose PAPER. It is a tie.', 'paper', 'draw');
                draw(playerPick);
                break;
            case "scissorsscissors":
                passRoundResult('You both chose SCISSORS. It is a tie.', 'scissors', 'draw');
                draw(playerPick);
                break;
            case "rockpaper":
                passRoundResult('You played ROCK, opponent played PAPER. You lost.', 'paper', 'loss');
                lose(playerPick);
                break;
            case "rockscissors":
                passRoundResult('You played ROCK, opponent played SCISSORS. You won.', 'scissors', 'win');
                win(playerPick);
                break;
            case "paperscissors":
                passRoundResult('You played PAPER, opponent played SCISSORS. You lost.', 'scissors', 'loss');
                lose(playerPick);
                break;
            case "paperrock":
                passRoundResult('You played PAPER, opponent played ROCK. You won.', 'rock', 'win');
                win(playerPick);
                break;
            case "scissorsrock":
                passRoundResult('You played SCISSORS, opponent played ROCK. You lost.', 'rock', 'loss');
                lose(playerPick);
                break;
            case "scissorspaper":
                passRoundResult('You played SCISSORS, opponent played PAPER. You won.', 'paper', 'win');
                win(playerPick);
                break;
        }
        gameData = {
            roundNmbr: params.roundCount,
            playerMv: params.playerChoice,
            computerMv: params.computerChoice,
            roundRslt: params.roundResult,
            gameScr: params.userScore + ':' + params.computerScore,
        }
        params.progress.push(gameData);
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
        userScoreSpan.innerHTML = params.userScore;
        document.getElementById(playerPick).classList.add('green-border');
        setTimeout(function() {document.getElementById(playerPick).classList.remove('green-border')}, 500);
        if (isGameFinished(params.userScore)) {
            setTimeout (function () {
                showModal(modalScore);
            }, 500);
            modalOutput.innerHTML = ('You WON. Press "Start a New Game" to play again!');
            document.getElementById("newGame-btn").style.display = "block";
            disableButtons();
        }
    }

    var lose = function(playerPick) {
        params.computerScore++;
        computerScoreSpan.innerHTML = params.computerScore;
        document.getElementById(playerPick).classList.add('red-border');
        setTimeout(function() {document.getElementById(playerPick).classList.remove('red-border')}, 500);
        if (isGameFinished(params.computerScore)) {
            setTimeout (function () {
                showModal(modalScore);
            }, 500);
            modalOutput.innerHTML = ('You LOST. Press "Start a New Game" to play again!');
            document.getElementById("newGame-btn").style.display = "block";
            disableButtons();
        }
    }

    var draw = function(playerPick) {
        userScoreSpan.innerHTML = params.userScore;
        computerScoreSpan.innerHTML = params.computerScore;
        document.getElementById(playerPick).classList.add('gray-border');
        setTimeout(function() {document.getElementById(playerPick).classList.remove('gray-border')}, 500);
    }
    
    var showModal = function(modal){
		modal.classList.add('show');
        document.querySelector('#modal-overlay').classList.add('show');
        createGameTable(params.progress);
	};

    var createGameTable = function(results) {
        var createCells = function (newRow, obj) {
            var index = 0;
            for (var property in obj) {
                newRow.insertCell(index).innerHTML = obj[property];
                index++;
            }
        }

        while (modalTableBody.hasChildNodes ()) {
            modalTableBody.removeChild(modalTableBody.firstChild);
        }

        for (var i = 0; i < results.length; i++) {
            var newRow = modalTableBody.insertRow(i);
            modalTableBody.insertBefore(newRow, modalTableBody.firstChild);
            var obj = results[i];
            createCells(newRow, obj);

            // var cell1 = newRow.insertCell(0);
            // var cell2 = newRow.insertCell(1);
            // var cell3 = newRow.insertCell(2);
            // var cell4 = newRow.insertCell(3);
            // var cell5 = newRow.insertCell(4);
            // cell1.innerHTML = obj.roundNmbr;
            // cell2.innerHTML = obj.playerMv;
            // cell3.innerHTML = obj.computerMv;
            // cell4.innerHTML = obj.roundRslt;
            // cell5.innerHTML = obj.gameScr;
        }
    }

    var closeModal = function(){
        for (var i = 0; i < modals.length; i++) {
            modals[i].classList.remove('show');
        }
        document.querySelector('#modal-overlay').classList.remove('show');
    }

    buttonNewGame.addEventListener('click', function() {
        showModal(modalNewGame);
    });

    startButton.addEventListener('click', function(){
        event.preventDefault();
        newGame();
        closeModal();
    });

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            playerMove(this.getAttribute("data-move"));
        });
    }

    for(var i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', closeModal);
    }

    document.querySelector('#modal-overlay').addEventListener('click', closeModal);

	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}
})();