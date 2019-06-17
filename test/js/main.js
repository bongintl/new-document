var gravity = require('./lib/gravity');

var div = document.querySelector('.test');

if ( gravity.isSupported ) {
    
    gravity.init();
    
    gravity.on( angle => {
        
        div.style.transform = `rotate( ${ angle }rad )`;
        
    })
    
}