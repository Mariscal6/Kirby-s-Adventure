const levels = {
    "level": { // Level 1
        next_level: "level1",
        hud: "BOSS",
        isDynamic: true
    },

    "level1": {
        next_level: "level2",
        hud: "BOSS",
    },

    "level2": {
        next_level: "level",
        hud: "HUD",
    }
};