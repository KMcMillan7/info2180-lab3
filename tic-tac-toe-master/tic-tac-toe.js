document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#board div");
    const statusDiv = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");
    let isXTurn = true;
    const gameState = Array(9).fill(null);
    let gameOver = false; // Flag to track if the game is over

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function checkForWinner(player) {
        return winningCombinations.some(combination => 
            combination.every(index => gameState[index] === player)
        );
    }

    function handleWin(player) {
        statusDiv.textContent = `Congratulations! ${player} is the Winner!`;
        statusDiv.classList.add("you-won");
        gameOver = true; // Set gameOver to true when a player wins

        // Delay reset to allow the player to see the winning message
        setTimeout(resetGame, 10000); // Adjust the delay time as desired (2000ms = 2 seconds)
    }

    function resetGame() {
        squares.forEach((square, index) => {
            square.textContent = "";
            square.classList.remove("X", "O");
            gameState[index] = null;
        });

        statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
        statusDiv.classList.remove("you-won");
        isXTurn = true;
        gameOver = false; // Reset gameOver flag for the new game
    }

    squares.forEach((square, index) => {
        square.classList.add("square");

        square.addEventListener("click", function() {
            // Prevent changing a square that already has a value or if the game is over
            if (gameState[index] || gameOver) return;

            const playerSymbol = isXTurn ? "X" : "O";
            square.textContent = playerSymbol;
            square.classList.add(playerSymbol);
            gameState[index] = playerSymbol;

            if (checkForWinner(playerSymbol)) {
                handleWin(playerSymbol);
            } else {
                isXTurn = !isXTurn;
            }
        });

        square.addEventListener("mouseenter", function() {
            if (!gameState[index]) square.classList.add("hover");
        });

        square.addEventListener("mouseleave", function() {
            square.classList.remove("hover");
        });
    });

    if (newGameButton) {
        newGameButton.addEventListener("click", resetGame);
    } else {
        console.error("New Game Button not found!");
    }
});
