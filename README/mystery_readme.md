# 🌲 Snowed In at Blackwood Cabin

An interactive "whodunit" text adventure and mystery game set in a remote mountain cabin during a severe winter blizzard. Stepping into the shoes of a sharp-eyed young woman on her final post-graduation trip—whose name you customize at the start of the game—you investigate rooms, question six college friends, gather clues, and solve text-based puzzles to determine whether one of your own friends stole from the cabin's safe, or if an unseen stranger broke in during the storm.

---

## 📖 Story Overview
To celebrate graduating and mark one last getaway before everyone moves away to start their new jobs and adult lives, you (playing as a customizable female protagonist) and six of your closest college friends rent a remote mountain cabin for the weekend. As the group's natural problem-solver, you help everyone get settled in—and before dinner, all seven of you lock your watches, emergency cash, and graduation gifts inside the cabin's heavy wall safe for safekeeping. Later that night, a sudden blizzard knocks out the power, and when the backup lights flicker on, the safe door is standing wide open and completely empty. With the mountain roads snowed in until dawn, you take the lead to search the cabin, uncover hidden motives, and determine whether one of your friends betrayed the group or if an intruder slipped inside undetected.

---

## 🕵️ The 6 Suspects (The Graduating Friend Group)

| Suspect | Friend Group Role | Alibi & Suspicious Details |
| :--- | :--- | :--- |
| **Mike** | The Roommate | Moving across the country next week; claims he was reading by the fireplace all night, though his boots are wet with fresh snow. |
| **Sophie** | The Art Major | Graduating with heavy student debt and no job lined up yet; she was the one who set up the safe's temporary passcode earlier that evening. |
| **Dustin** | The Pre-Med Grad | Heading to medical school in the fall; spotted near the study door right before the blackout, claiming he was looking for his overnight bag. |
| **Ellie** | The Culinary Grad | Cooked the group's graduation dinner tonight and was seen checking the back mudroom door right before the lights went out. |
| **Will** | The Finance Major | Already landed a high-paying city job and had the most expensive items locked inside the safe—making him either a prime target or an inside-job suspect. |
| **Julie** | The Outdoorsy Friend | Organized the rental, communicated directly with the cabin host, and knows how to operate the basement breaker box. |

---

## 🎮 Gameplay Mechanics & Puzzles
Players progress through the story using clickable navigation choices and text-entry challenges:

* **Character Customization (Text Input):** At the very start of the game, players type in their own name for the main character, which is dynamically used throughout the story and suspect dialogue.
* **Room Exploration (Button/Menu Choices):** Choose which areas of the cabin to search (**The Study**, **The Kitchen**, **The Basement**, or **The Mudroom**). Each room reveals clues pointing toward either an inside job or an outside intruder.
* **The Breaker Box Puzzle (Text Input):** In the basement, players find a jammed fuse panel with a scratched riddle on the metal door. Entering the correct 4-letter password restores power to the cabin's smart-lock and security sensor log.
* **The Safe Override & Audit Log (Text Input):** Players piece together a torn rental manual and receipt to enter a 4-digit diagnostic code into the electronic safe keypad, revealing whether the safe was opened with the passcode or bypassed.
* **The Final Accusation (Text Input):** To trigger the finale, players must type who is responsible (**a specific friend's name** or **"Stranger"**) along with the key piece of evidence proving their theory.

---

## 🗺️ Branching Flowchart & Endings
You can also view or edit the full diagram in [`blackwood_cabin_flowchart.drawio`](./blackwood_cabin_flowchart.drawio) using the **Draw.io Integration** extension in VS Code.

```text
[START: Enter Player Name ──► Power Cuts Out & Wall Safe Found Empty]
       │
       ├──► [Branch A: Basement & Mudroom] ──► Breaker Box Puzzle ──► Reveals Cellar Window Latch & Boot Print
       │
       ├──► [Branch B: The Kitchen] ─────────► Clears Ellie & Mike ──► Finds Rental Manual & Receipt Clues
       │
       └──► [Branch C: The Study] ───────────► Safe Audit Log Puzzle ─► Reveals Passcode vs. Bypass Entry
                     │
                     ▼
        [THE CONFRONTATION NODE: Friend vs. Stranger]
                     │
       ┌─────────────┼─────────────┬─────────────┬─────────────┐
       ▼             ▼             ▼             ▼             ▼
  [Ending 1]    [Ending 2]    [Ending 3]    [Ending 4]    [Ending 5]
  Inside Job    Unseen        False         Trapped in    Cold Case
  (Sophie)      Intruder      Accusation    the Dark
```

### Possible Outcomes (5 Endings)
1. **Ending 1 — The Inside Job (True Detective):** You accuse **Sophie** and present the *safe's electronic passcode log* as evidence. She confesses to cutting the power and emptying the safe using the code she set earlier, desperate to pay off her student loans before moving out.
2. **Ending 2 — The Unseen Intruder (Twist Ending):** You enter **"Stranger"** and present the *pried-open cellar window latch and muddy boot print* as evidence. You prove that a local prowler snuck in during the blackout while the friends were distracted, clearing your friends' names just as the snowplow arrives.
3. **Ending 3 — False Accusation:** You jump to conclusions and accuse **Mike**, **Dustin**, or **Will** without solid proof. Tensions boil over, ruining the final trip while the real thief slips away into the storm.
4. **Ending 4 — Trapped in the Dark:** You fail the basement breaker-box puzzle twice, leaving the cabin without heat, power, or security logs until rescue arrives at dawn.
5. **Ending 5 — Cold Case:** You run out of investigation turns without unlocking the safe's audit log, and the group parts ways the next morning with lingering suspicion and the mystery unsolved.

---

## 🛠️ Project Setup & Tools
* **Flowchart Design:** Mapped out in `blackwood_cabin_flowchart.drawio` using [draw.io](https://diagrams.net).
* **Language / Framework:** `[Insert your language here, e.g., Python / HTML, CSS & JS / Twine]`
* **How to Run:**
  1. Clone or download this repository.
  2. Open the project folder in **VS Code**.
  3. `[Insert run instructions here, e.g., Run python main.py in the terminal / Open index.html with Live Server]`