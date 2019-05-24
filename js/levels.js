const levels = {
    "intro": {

    },

    "level_selector": {

    },

    "level": { // Level 1
        next_level: "level1",
        hud: "HUD",
        keys: [],
        isDynamic: true
    },

    "level1": {
        next_level: "level2",
        hud: "BOSS",
        keys: [],
        isDynamic: true
    },

    "level2": {
        next_level: "level",
        hud: "HUD",
    }
};