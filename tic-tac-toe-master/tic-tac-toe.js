document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#game-board div");
    const statusDiv = document.getElementById("status");
    const newGameButton = document.getElementById("new-game"); // Assumes a button with id "new-game" exists
    let isXTurn = true;
    const gameState = Array(9).fill(null);

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
    }

    squares.forEach((square, index) => {
        square.classList.add("square");

        square.addEventListener("click", function() {
            // Prevent changing a square that already has a value
            if (gameState[index]) return;

            const playerSymbol = isXTurn ? "X" : "O";
            square.textContent = playerSymbol;
            square.classList.add(playerSymbol);
            gameState[index] = playerSymbol;

            if (checkForWinner(playerSymbol)) {
                handleWin(playerSymbol);
            }

            isXTurn = !isXTurn;
        });

        square.addEventListener("mouseenter", function() {
            if (!gameState[index]) square.classList.add("hover");
        });

        square.addEventListener("mouseleave", function() {
            square.classList.remove("hover");
        });
    });

    newGameButton.addEventListener("click", resetGame);
});
