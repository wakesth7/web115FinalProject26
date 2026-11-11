const state = {
  playerName: "",
  turns: 6,
  clues: [],
  powerRestored: false,
  breakerAttempts: 0,
  safeUnlocked: false,
  currentMode: "NAME_SETUP"
};

const storyBox = document.getElementById("story-box");
const inputArea = document.getElementById("input-area");
const textInput = document.getElementById("text-input");
const submitBtn = document.getElementById("submit-btn");
const choicesArea = document.getElementById("choices-area");
const cluesList = document.getElementById("clues-list");
const displayName = document.getElementById("display-name");
const turnsLeft = document.getElementById("turns-left");

function addClue(clueText) {
  if (!state.clues.includes(clueText)) {
    state.clues.push(clueText);
    renderClues();
  }
}

function renderClues() {
  cluesList.innerHTML = "";
  state.clues.forEach(clue => {
    const li = document.createElement("li");
    li.textContent = clue;
    cluesList.appendChild(li);
  });
}

function updateStatus() {
  displayName.textContent = state.playerName || "---";
  turnsLeft.textContent = state.turns;
}

function showInput(placeholder, buttonText, mode) {
  state.currentMode = mode;
  textInput.value = "";
  textInput.placeholder = placeholder;
  submitBtn.textContent = buttonText;
  inputArea.classList.remove("hidden");
  textInput.focus();
}

function hideInput() {
  inputArea.classList.add("hidden");
}

function renderHub(message) {
  hideInput();
  updateStatus();

  if (state.turns <= 0 && !state.safeUnlocked) {
    triggerEnding("COLD_CASE");
    return;
  }

  storyBox.innerHTML = `<p>${message}</p><p>Where will you investigate next, <strong>${state.playerName}</strong>?</p>`;
  choicesArea.innerHTML = "";

  const rooms = [
    { label: "🔍 Search The Study", action: exploreStudy },
    { label: "🍳 Search The Kitchen", action: exploreKitchen },
    { label: "⚡ Search Basement & Mudroom", action: exploreBasement },
    { label: "🗣️ Question Friends", action: questionFriends },
    { label: "⚖️ Make Final Accusation", action: startAccusation }
  ];

  rooms.forEach(room => {
    const btn = document.createElement("button");
    btn.textContent = room.label;
    btn.onclick = room.action;
    choicesArea.appendChild(btn);
  });
}

function spendTurn() {
  state.turns -= 1;
  updateStatus();
}

function exploreKitchen() {
  spendTurn();
  addClue("Kitchen Receipt: Ellie was only checking on dinner supplies, clearing her.");
  addClue("Torn Rental Manual: Safe diagnostic override code is '2026'.");
  renderHub("You search the kitchen. You find a grocery receipt clearing <strong>Ellie</strong>, plus a torn cabin rental manual noting the safe's diagnostic code: <strong>2026</strong>.");
}

function exploreBasement() {
  spendTurn();
  if (!state.powerRestored) {
    choicesArea.innerHTML = "";
    storyBox.innerHTML = `
      <p>You head down to the dark basement with Julie's flashlight. The main breaker box is jammed with a scratched riddle on the metal door:</p>
      <p><em>"I fall from the sky without making a sound, and blanket the cabin all over the ground. (4 letters)"</em></p>
    `;
    showInput("Enter 4-letter password...", "Unlock Breaker", "BREAKER_PUZZLE");
  } else {
    addClue("Mudroom & Cellar: Pried-open cellar window latch and a muddy size-12 boot print.");
    renderHub("With the basement lights back on, you spot a <strong>pried-open cellar window latch</strong> and a <strong>muddy boot print</strong> leading toward the mudroom—larger than anyone's shoes in your group.");
  }
}

function exploreStudy() {
  spendTurn();
  if (!state.powerRestored) {
    renderHub("You examine the empty wall safe in the study, but the electronic keypad is completely dead. You need to restore power in the <strong>Basement</strong> first.");
    return;
  }

  if (!state.safeUnlocked) {
    choicesArea.innerHTML = "";
    storyBox.innerHTML = `
      <p>The study's electronic safe keypad is glowing again! Enter the 4-digit diagnostic code from the rental manual to view the audit log:</p>
    `;
    showInput("Enter 4-digit code...", "Check Safe Log", "SAFE_PUZZLE");
  } else {
    renderHub("The safe's audit log is already unlocked on the screen: <em>'OPENED VIA TEMPORARY PASSCODE AT 9:42 PM.'</em>");
  }
}

function questionFriends() {
  spendTurn();
  addClue("Mike & Dustin: Mike went outside to start his car (clearing his wet boots); Dustin was grabbing allergy meds.");
  renderHub("You gather <strong>Mike, Sophie, Dustin, Ellie, Will, and Julie</strong>. Mike proves he only stepped outside to warm up his car engine, and Sophie nervously avoids eye contact when you ask about the safe's passcode.");
}

function startAccusation() {
  choicesArea.innerHTML = "";
  storyBox.innerHTML = `
    <p><strong>The Confrontation:</strong> Everyone gathers in the main hall. Type who stole the valuables—enter a friend's name (<strong>Mike, Sophie, Dustin, Ellie, Will, Julie</strong>) or type <strong>Stranger</strong>:</p>
  `;
  showInput("Type culprit name or 'Stranger'...", "Submit Accusation", "ACCUSATION");
}

function triggerEnding(type, accusedName = "") {
  hideInput();
  choicesArea.innerHTML = "";

  const endings = {
    INSIDE_JOB: `
      <h3>🏆 Ending 1 — The Inside Job (True Detective)</h3>
      <p>You accuse <strong>Sophie</strong> and present the <strong>safe's electronic passcode log</strong>. Under pressure, Sophie breaks down and confesses she used the temporary code she set earlier to take the cash and watches, desperate to pay off her student loans before moving out. The valuables are recovered!</p>
    `,
    INTRUDER: `
      <h3>🕵️‍♀️ Ending 2 — The Unseen Intruder (Twist Ending)</h3>
      <p>You name a <strong>Stranger</strong> and point everyone to the <strong>pried-open cellar window latch and muddy boot print</strong>. You prove a local prowler slipped in during the blackout while everyone was distracted—clearing your friends' names and saving your graduation trip just as the snowplow arrives!</p>
    `,
    FALSE_ACCUSATION: `
      <h3>❌ Ending 3 — False Accusation</h3>
      <p>You accuse <strong>${accusedName}</strong> without solid proof. Arguments erupt across the living room, fracturing the friend group while the real culprit slips away into the storm.</p>
    `,
    DARKNESS: `
      <h3>🌑 Ending 4 — Trapped in the Dark</h3>
      <p>You triggered the breaker box's safety lockout after two failed attempts! The cabin remains without heat, power, or security logs until rescue arrives at dawn.</p>
    `,
    COLD_CASE: `
      <h3>❄️ Ending 5 — Cold Case</h3>
      <p>Dawn breaks and the snowplows clear the road before you could unlock the safe's audit log. Your friend group packs up and parts ways forever with lingering suspicion and the mystery unsolved.</p>
    `
  };

  storyBox.innerHTML = endings[type];

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "🔄 Play Again";
  restartBtn.onclick = () => location.reload();
  choicesArea.appendChild(restartBtn);
}

submitBtn.addEventListener("click", () => {
  const val = textInput.value.trim();
  if (!val) return;

  if (state.currentMode === "NAME_SETUP") {
    state.playerName = val;
    renderHub(`The blizzard knocks out the power at Blackwood Cabin! When the backup lights flicker on, the wall safe is wide open and empty.`);
  } else if (state.currentMode === "BREAKER_PUZZLE") {
    if (val.toLowerCase() === "snow") {
      state.powerRestored = true;
      addClue("Mudroom & Cellar: Pried-open cellar window latch and a muddy size-12 boot print.");
      renderHub("Click! Power surges back into the cabin. Near the basement stairs, you spot a <strong>pried-open cellar window latch</strong> and a <strong>muddy boot print</strong>.");
    } else {
      state.breakerAttempts += 1;
      if (state.breakerAttempts >= 2) {
        triggerEnding("DARKNESS");
      } else {
        storyBox.innerHTML += `<p style="color:#f87171;">Incorrect password! Warning: One more failed attempt will lock the breaker panel.</p>`;
      }
    }
  } else if (state.currentMode === "SAFE_PUZZLE") {
    if (val === "2026") {
      state.safeUnlocked = true;
      addClue("Safe Audit Log: Opened using Sophie's temporary passcode at 9:42 PM.");
      renderHub("Access granted! The safe's audit log reveals it was opened with <strong>Sophie's temporary passcode</strong> at 9:42 PM—not forced open.");
    } else {
      renderHub("Invalid diagnostic code. Check the <strong>Kitchen</strong> for clues to the safe's manual.");
    }
  } else if (state.currentMode === "ACCUSATION") {
    const guess = val.toLowerCase();
    if (guess === "sophie" && state.safeUnlocked) {
      triggerEnding("INSIDE_JOB");
    } else if (guess === "stranger" && state.powerRestored) {
      triggerEnding("INTRUDER");
    } else {
      triggerEnding("FALSE_ACCUSATION", val);
    }
  }
});