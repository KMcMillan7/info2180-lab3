document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#game-board div");
    let isXTurn = true; // Track whose turn it is
    const gameState = Array(9).fill(null); // Initialize the game state

    // Loop through each square, add the "square" class, and set up click and hover events
    squares.forEach((square, index) => {
        // Add the "square" class for initial styling
        square.classList.add("square");

        // Add click event listener to alternate "X" and "O"
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

        // Add hover effect
        square.addEventListener("mouseenter", function() {
            if (!gameState[index]) {
                square.classList.add("hover"); // Only add hover if square is empty
            }
        });

        // Remove hover effect
        square.addEventListener("mouseleave", function() {
            square.classList.remove("hover"); // Remove hover when mouse leaves
        });
    });
});
