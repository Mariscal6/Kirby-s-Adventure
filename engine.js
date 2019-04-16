// ---------------- Engine
const unroll = (e) => [].concat.apply([], e.map(a => Object.values(a)));

const compiling = {
  audio: new Array(),
  sheet: new Array(),
  level: new Array()
};


const Q = window.Q = Quintus().include("Sprites, Scenes, Anim, 2D, TMX, Input, Audio, Touch, UI").setup({
    width: 800, // Set the default width to 800 pixels
    height: 600, // Set the default height to 600 pixels
}).controls().touch();



Q.load(unroll(unroll(Object.values(compiling)).map(e => Object.values(e))).join(","), function() {

    // Compile Sprite Sheets
    compiling.sheet.forEach(sheet => { Q.compileSheets(sheet.png_path, sheet.json_path); });

    // Compile Levels
    Q.loadTMX(unroll(Object.values(compiling.level)));

    // Compile Sound
    const assets = Object.assign({}, ...compiling.audio);
    Q.load(assets);

    // is Audio
    if(Q.hasWebAudio){
        Q.audio.enableWebAudioSound();
    }else{
        Q.audio.enableHTML5Sound();
    }


});