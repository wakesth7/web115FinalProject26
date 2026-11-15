class Player {
    constructor(name) {
        this.name = name;
        this.inventory = [];
        this.score = 0;
    }
}

class StoryScene {
    constructor(id, image, choices) {
        this.id = id;
        this.image = image;
        this.choices = choices;
    }
}

class StoryItem {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}