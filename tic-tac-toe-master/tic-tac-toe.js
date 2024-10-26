document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#game-board div");
    const statusDiv = document.getElementById("status");
    let isXTurn = true;
    const gameState = Array(9).fill(null);

    // Define winning combinations (indices of squares in each possible win)
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

    squares.forEach((square, index) => {
        square.classList.add("square");

        square.addEventListener("click", function() {
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
});
