document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#game-board div");
    let isXTurn = true; // Track whose turn it is
    const gameState = Array(9).fill(null); // Initialize the game state

    // Loop through each square and add a click event listener
    squares.forEach((square, index) => {
        square.addEventListener("click", function() {
            // Prevent clicking an already filled square
            if (gameState[index]) return;

            // Place "X" or "O" based on the current turn
            const playerSymbol = isXTurn ? "X" : "O";
            square.textContent = playerSymbol;
            square.classList.add(playerSymbol); // Add the "X" or "O" class for styling
            gameState[index] = playerSymbol; // Update game state for this square

            // Toggle turn
            isXTurn = !isXTurn;
        });
    });
});
