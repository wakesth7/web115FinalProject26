# WEB-115 Final Project

## Team Members and Roles

### Ricardo
- Responsibilities: UI structure, styling, and story interface framework

### Sarina
- Responsibilities:

### Shiva
- Responsibilities:

## Application Overview

[Write story/gameplay overview here.]

## Controls and Navigation

- Use the choice buttons to make story decisions.
- Use the text input when a scene requires an answer.
- Keyboard controls may be used during certain scenes.
- Inventory and score update as the player progresses.

## Story Flowchart

```mermaid
flowchart TD
    A[Enter Player Name] --> B[Stop at Gas Station]
    B --> C[Budd Notices the Group]
    C --> D[Arrive at Blackwood Cabin]
    D --> E[Power Goes Out and Safe Is Empty]
    E --> F{Choose Where to Investigate}

    F --> G[Search Basement]
    F --> H[Search Kitchen]
    F --> I[Search Study]

    G --> J[Breaker Box Puzzle]
    J --> K[Find Broken Cellar Latch]
    K --> L[Find Size 12 Boot Print]
    L --> M[Find Tire Tracks and Coolant]

    H --> N[Question Mike and Dustin]
    N --> O[Learn About Old Truck Sound]
    O --> P[Sophie Remembers Sharing Passcode]
    P --> Q[Julie Connects Budd to Cabin History]

    I --> R[Investigate Safe]
    R --> S[Safe Audit Puzzle]
    S --> T[Learn Passcode Was Used at 9:42 PM]

    M --> U[Final Confrontation]
    Q --> U
    T --> U

    U --> V[Accuse Sophie]
    U --> W[Accuse Budd]
    U --> X[Make Another Accusation]

    V --> Y[Ending 1: The Innocent Suspect]
    W --> Z[Ending 2: The True Culprit]
    X --> AA[Ending 3: False Accusation]

    U --> AB[Ending 4: Trapped in the Dark]
    U --> AC[Ending 5: Cold Case]
```

## Technical Features

- Branching story choices
- Dynamic story text
- Changing story images
- Inventory system
- Score tracking
- Journal/log system
- Text input and validation
- Keyboard controls
- Hover hints
- JSON save/load
- Cookies
- Error handling
- Timers and delayed events

## Git Workflow

Each team member works on their own branch and submits changes to `main` through pull requests.

## Testing Notes

[Add testing notes here as the project develops.]