// ---------------- Engine
const unroll = (e) => [].concat.apply([], e.map(a => Object.values(a)));

const compiling = {
  audio: new Array(),
  sheet: new Array(),
  level: new Array()
};

const Q = window.Q = Quintus({audioSupporter:["mp3", "ogg"]})
// Include Quintus Library
.include("Sprites, Scenes, Anim, 2D, TMX, Input, Audio, Touch, UI")
// SetUp
.setup("quintus-kirby",{
    development: true,
    width: 256 * 2, // Set the default width to 512 pixels
    height: 240 * 2, // Set the default height to 480 pixels
})
.enableSound().controls();

const load = (callback) => {
    Q.load(unroll(unroll(Object.values(compiling)).map(e => Object.values(e))).join(","), function() {
        // Loading Threads
        const promises = new Array(
            // Compile Sprite Sheets
            new Promise(function(ok){
                compiling.sheet.forEach(sheet => Q.compileSheets(sheet.png_path, sheet.json_path));
                ok();
            }),
            // Compile Levels
            new Promise(function(ok){
                const all_levels = unroll(Object.values(compiling.level));
                if(all_levels.length === 0) ok();

                const init_global_entities = function(stage){
                    stage.insert(new Q.AbsorbMissile());
                    stage.insert(new Q.BlowMissile());
                    stage.insert(new Q.StarMissile());

                    for(let i = 0; i <= 5; ++i){
                        stage.insert(new Q.StarParticle());
                    }
                    
                    stage.insert(new Q.CloudParticle());
                };

                Q.loadTMX(all_levels.join(","), function(){
                    compiling.level.forEach(key => {
                        const level_name = Object.keys(key)[0];

                        Q.scene(level_name, function(stage) {
                            const level = levels[level_name];

                            Q.stageScene(level.hud, 1);
                            Q.stageTMX(`${level_name}.tmx`, stage);
                            init_global_entities(stage);
                            stage.add("viewport").follow(Q('Kirby').first(), {x: level.isDynamic || true, y: true},{
                                minX: 32,
                                maxX: Q("TileLayer").first().c.w - 32,
                                minY: 32,
                                maxY: 0,
                            });

                            //stage.items.forEach(entity => { console.log(entity.className); });
                        });
                    });

                    ok();
                });
            }),
            // Compile Sound
            new Promise(function(ok){
                if(Object.keys(compiling.audio).length === 0) ok();

                // TODO: NO FUNCIONA
                const assets = unroll(Object.values(compiling.audio));
                //const assets = Object.assign({}, ...compiling.audio);
                Q.load(assets, function(){
                    ok();
                });
            })
        );

        
        Promise.all(promises).then(callback);
    });
}