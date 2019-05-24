const levels = {
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
        next_level: "preBoss",
        hud: "HUD",
    },

    "preBoss": {
        next_level: "bossLevel",
        hud: "HUD",
    },

    "boosLevel": {
        next_level: "level",
        hud: "HUD",
        isDynamic: true
    }
};