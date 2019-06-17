var { Howl } = require('howler');

var sounds = [];

for ( var i = 0; i < 8; i++ ) {
    
    sounds.push( new Howl( { src: [ `audio/${i}.mp3` ] } ) )
    
}

module.exports = i => {
    
    sounds[ i ].play();
    
}

