// DOM element references
const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");
const paragraph3 = document.getElementById("paragraph3");

const storyImage = document.getElementById("story-image");

const choiceOne = document.getElementById("choice-one");
const choiceTwo = document.getElementById("choice-two");

const inventoryList = document.getElementById("inventory-list");
const scoreDisplay = document.getElementById("score");

const journalLog = document.getElementById("journal-log");

const storyInput = document.getElementById("story-input");
const submitAnswer = document.getElementById("submit-answer");

const tooltip = document.getElementById("tooltip");

// Basic game state
let currentScene = 0;
let score = 0;
let inventory = [];
let gameOver = false;

// Change the story image.
function changeImage(filename) {
    storyImage.src = "img/" + filename;
}

// Update the player's score.
function updateScore(amount) {
    score += amount;
    scoreDisplay.textContent = score;
}

// Add an item to the inventory.
function addToInventory(itemName) {
    inventory.push(itemName);

    const listItem = document.createElement("li");
    listItem.textContent = itemName;

    inventoryList.appendChild(listItem);
}

// Add a new entry to the journal.
function addJournalEntry(text) {
    const entry = document.createElement("p");
    entry.textContent = text;

    journalLog.appendChild(entry);
}

// Display story text in the three paragraph areas.
function displayStoryText(text1, text2, text3) {
    paragraph1.textContent = text1;
    paragraph2.textContent = text2;
    paragraph3.textContent = text3;
}
// Handle the first choice button.
choiceOne.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    currentScene = 1;

    // Team will add story-specific logic here.
    addJournalEntry("Choice 1 selected.");
});

// Handle the second choice button.
choiceTwo.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    currentScene = 2;

    // Team will add story-specific logic here.
    addJournalEntry("Choice 2 selected.");
});
// Validate typed user input.
function validateStoryInput(input) {
    const pattern = /^[A-Za-z0-9 ]+$/;

    return pattern.test(input);
}

// Handle submitted text input.
submitAnswer.addEventListener("click", function () {
    const userAnswer = storyInput.value.trim();

    if (userAnswer === "") {
        addJournalEntry("Please enter an answer.");
        return;
    }

    if (!validateStoryInput(userAnswer)) {
        addJournalEntry("Please use only letters, numbers, and spaces.");
        return;
    }

    // Team will add story-specific answer checking here.
    addJournalEntry("Answer submitted.");

    storyInput.value = "";
});
// Keyboard controls.
document.addEventListener("keydown", function (event) {
    if (gameOver) {
        return;
    }

    if (event.key === "ArrowLeft") {
        addJournalEntry("Left arrow pressed.");
    } else if (event.key === "ArrowRight") {
        addJournalEntry("Right arrow pressed.");
    } else if (event.key === " ") {
        addJournalEntry("Spacebar pressed.");
    }
});

// Show a hint when the user hovers over the story image.
storyImage.addEventListener("mouseover", function () {
    tooltip.textContent = "Hint goes here.";
    tooltip.style.display = "block";
});

// Hide the hint when the mouse leaves the story image.
storyImage.addEventListener("mouseout", function () {
    tooltip.style.display = "none";
});
// Delayed story event.
function startDelayedEvent() {
    setTimeout(function () {
        if (!gameOver) {
            addJournalEntry("A delayed event occurred.");
        }
    }, 3000);
}

// Countdown timer framework.
let countdown = 10;
let countdownTimer;

function startCountdown() {
    countdown = 10;

    countdownTimer = setInterval(function () {
        countdown--;

        console.log("Time remaining:", countdown);

        if (countdown <= 0) {
            clearInterval(countdownTimer);

            if (!gameOver) {
                addJournalEntry("Time ran out.");
            }
        }
    }, 1000);
}
function getGameState() {
    return {
        currentScene: currentScene,
        score: score,
        inventory: inventory,
        gameOver: gameOver
    };
}

function saveCurrentGame() {
    const gameState = getGameState();
    saveGame(gameState);
}

function loadSavedGame() {
    const savedState = loadGame();

    if (savedState !== null) {
        currentScene = savedState.currentScene;
        score = savedState.score;
        inventory = savedState.inventory;
        gameOver = savedState.gameOver;

        scoreDisplay.textContent = score;

        inventoryList.innerHTML = "";

        for (let item of inventory) {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            inventoryList.appendChild(listItem);
        }

        addJournalEntry("Saved game loaded.");
    }
}
