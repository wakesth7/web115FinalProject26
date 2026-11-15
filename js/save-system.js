function saveGame(gameState) {
    try {
        const savedData = JSON.stringify(gameState);
        console.log("Game saved:", savedData);

        document.cookie = "savedGame=" + encodeURIComponent(savedData) + "; path=/";
    } catch (error) {
        console.error("Unable to save game:", error);
    }
}

function loadGame() {
    try {
        const cookies = document.cookie.split("; ");

        for (let cookie of cookies) {
            const parts = cookie.split("=");

            if (parts[0] === "savedGame") {
                const savedData = decodeURIComponent(parts[1]);
                return JSON.parse(savedData);
            }
        }

        return null;
    } catch (error) {
        console.error("Unable to load game:", error);
        return null;
    }
}