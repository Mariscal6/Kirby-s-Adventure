compiling.level.push(
    {"level": "level.tmx"},
    {"level1": "level1.tmx"},
    {"level2" : "level2.tmx"},
    {"level3": "level3.tmx"},
    {"levelBoss": "levelBoss.tmx"}
);

Q.state.set({ score: 0, lifes:6, bar: 6, power: "normal", sceneState: "HUD",  bossHEALTH: 12, current_level: "level"});
