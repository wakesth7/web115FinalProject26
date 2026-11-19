// DOM element references
const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");
const paragraph3 = document.getElementById("paragraph3");

const storyImage = document.getElementById("story-image");

const choiceOne = document.getElementById("choice-one");
const choiceTwo = document.getElementById("choice-two");
const choiceThree = document.getElementById("choice-three");

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

let basementSearched = false;
let kitchenSearched = false;
let studySearched = false;

let inConfrontation = false;

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

    if (inConfrontation) {
        showInnocentSuspectEnding();
    } else {
        showBasement();
    }
});

choiceTwo.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    if (inConfrontation) {
        showTrueCulpritEnding();
    } else {
        showKitchen();
    }
});

choiceThree.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    if (inConfrontation) {
        showFalseAccusationEnding();
    } else {
        showStudy();
    }
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
function showOpening() {
    displayStoryText(
        "You and six of your closest college friends decide to take one last trip together after graduation.",
        "The group rents Blackwood Cabin for the weekend, even though a pretty bad winter storm is on the way.",
        "Before heading to the cabin, everyone stops at a nearby gas station to grab some last-minute supplies."
    );

    changeImage("");
}

function showGasStation() {
    displayStoryText(
        "At the gas station, the group meets Budd Lynn, one of the local attendants.",
        "While talking with the group, Budd notices some of their expensive jewelry and finds out that they are staying at Blackwood Cabin.",
        "After getting everything they need, the group leaves the gas station and heads to the cabin."
    );

    changeImage("");
}

function showCabinArrival() {
    displayStoryText(
        "Once everyone gets settled in, the group puts their watches, emergency cash, and graduation gifts inside the cabin's wall safe.",
        "Later that night, the storm gets worse and suddenly knocks out the power.",
        "When the backup lights come on, everyone realizes that the safe is wide open and everything inside is gone."
    );

    changeImage("");
}

function showInvestigationChoice() {
    displayStoryText(
        "With the roads covered in snow, nobody is going anywhere until the storm passes.",
        "You decide to look around the cabin and try to figure out what happened to everyone's belongings.",
        "Where do you want to investigate first?"
    );

    choiceOne.textContent = "Search Basement";
    choiceTwo.textContent = "Search Kitchen";
    choiceThree.textContent = "Search Study";
}

function showBasement() {
    displayStoryText(
        "You head down to the basement and quickly notice that something does not look right.",
        "The cellar window has a broken latch, and nearby you find what looks like a size 12 work boot print.",
        "When you look outside, you also notice large tire tracks and leaked coolant in the snow."
    );

    changeImage("");
    if (!basementSearched) {
        addToInventory("Broken Cellar Latch");
        addToInventory("Size 12 Boot Print");
        addToInventory("Tire Tracks and Coolant");

        basementSearched = true;
    }
    checkInvestigationComplete();
}

function showKitchen() {
    displayStoryText(
        "You head back toward the kitchen and start asking everyone what they remember from the night.",
        "Mike and Dustin both remember hearing what sounded like an old truck driving away during the blackout.",
        "Sophie remembers sharing the safe passcode at the gas station, and Julie remembers Budd mentioning that his grandfather once owned the cabin."
    );

    changeImage("");
    if (!kitchenSearched) {
        addToInventory("Old Truck Testimony");
        addToInventory("Shared Passcode Clue");
        addToInventory("Budd Family Connection");

        kitchenSearched = true;
    }
    checkInvestigationComplete();
}

function showStudy() {
    displayStoryText(
        "You search the study where the safe is located and look for anything that might explain how it was opened.",
        "After checking the safe's information, you discover that the temporary passcode was used at 9:42 PM.",
        "That means whoever opened the safe probably knew the code instead of breaking into it."
    );

    changeImage("");
    if (!studySearched) {
        addToInventory("Safe Audit Log");
        
        studySearched = true;
    }
    checkInvestigationComplete();
}
function checkInvestigationComplete() {
    if (basementSearched && kitchenSearched && studySearched) {
        showConfrontation();
    }
}
function showConfrontation() {
    inConfrontation = true;
    
    displayStoryText(
        "After searching the cabin and gathering clues, everyone comes together to talk about what you found.",
        "The evidence points to someone who knew the cabin, knew the safe passcode, and had a way to get inside through the cellar.",
        "Now you have to decide who you think stole everything."
    );

    changeImage("");

    choiceOne.textContent = "Accuse Sophie";
    choiceTwo.textContent = "Accuse Budd";
    choiceThree.textContent = "Make Another Accusation";
}

function showInnocentSuspectEnding() {
    gameOver = true;

    displayStoryText(
        "You decide to accuse Sophie because she knew the safe passcode.",
        "After looking over the evidence again, it becomes clear that Sophie did not steal anything.",
        "By focusing on the wrong person, you gave the real thief a chance to get away."
    );
}

function showTrueCulpritEnding() {
    gameOver = true;

    displayStoryText(
        "You put all of the clues together: the broken cellar latch, the boot print, the truck, the passcode, and Budd's knowledge of the cabin.",
        "Everything points back to Budd as the person who entered the cabin and emptied the safe.",
        "You figured it out and found the true culprit."
    );
}

function showFalseAccusationEnding() {
    gameOver = true;

    displayStoryText(
        "You make your accusation, but you do not have enough evidence to prove it.",
        "Everyone realizes that there are still important clues that were missed during the investigation.",
        "The mystery remains unsolved."
    );
}

function showTrappedInDarkEnding() {
    gameOver = true;

    displayStoryText(
        "You are unable to get the cabin's systems working again before the storm gets even worse.",
        "Without the security information, there is not enough evidence to continue the investigation.",
        "The group has no choice but to wait out the rest of the storm in the dark."
    );
}

function showColdCaseEnding() {
    gameOver = true;

    displayStoryText(
        "Morning finally arrives before you are able to collect enough evidence.",
        "The roads reopen and everyone can finally leave, but the stolen items are never found.",
        "What happened at Blackwood Cabin remains a mystery."
    );
}
showInvestigationChoice();
    choiceOne.textContent = "Search Basement";
    choiceTwo.textContent = "Search Kitchen";
    choiceThree.textContent = "Search Study";