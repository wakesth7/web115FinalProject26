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
    B --> C[Budd Notices Group and Learns Cabin Location]
    C --> D[Arrive at Blackwood Cabin]
    D --> E[Power Cuts Out and Safe Is Empty]
    E --> F{Choose Investigation Area}

    F --> G[Basement Search]
    F --> L[Kitchen Search]
    F --> P[Study Search]

    G --> H[Breaker Box Puzzle]
    H --> I[Broken Cellar Latch]
    I --> J[Size 12 Boot Print]
    J --> K[Tire Tracks and Coolant]

    L --> M[Mike and Dustin Hear Old Truck]
    M --> N[Sophie Remembers Sharing Passcode]
    N --> O[Julie Connects Budd to Cabin History]

    P --> Q[Safe Audit Puzzle]
    Q --> R[Passcode Used at 9:42 PM]

    K --> S[Final Confrontation]
    O --> S
    R --> S

    S --> T[Ending 1: The Innocent Suspect]
    S --> U[Ending 2: The True Culprit]
    S --> V[Ending 3: False Accusation]
    S --> W[Ending 4: Trapped in the Dark]
    S --> X[Ending 5: Cold Case]
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