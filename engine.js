// ---------------- Engine
const unroll = (e) => [].concat.apply([], e.map(a => Object.values(a)));

const compiling = {
  audio: new Array(),
  sheet: new Array(),
  level: new Array()
};

const Q = window.Q = Quintus()
// Include Quintus Library
.include("Sprites, Scenes, Anim, 2D, TMX, Input, Audio, Touch, UI")
// SetUp
.setup("#quintus-kirby",{
    width: 800, // Set the default width to 800 pixels
    height: 600, // Set the default height to 600 pixels
})
.enableSound().controls();


function load(callback){
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

                Q.loadTMX(all_levels.join(","), function(){
                    ok();
                });
            }),
            // Compile Sound
            new Promise(function(ok){
                if(Object.keys(compiling.audio).length === 0) ok();

                // TODO: NO FUNCIONA
                const assets = Object.assign({}, ...compiling.audio);
                Q.load(assets, function(){
                    ok();
                });
            })
        );

        
        Promise.all(promises).then(callback);
    });
}