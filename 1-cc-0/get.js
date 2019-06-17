var fs = require('fs');
var http = require('http');

function get ( i ) {
    
    var url = "http://img.modem.studio/CC0-big/CC0-img-" + i + ".jpg";
    
    http.get( url, function(response) {
        
        console.log( response.statusCode );
        
        var stream = fs.createWriteStream( '1-cc-0/assets/original/' + i + ".jpg");
        
        response.pipe( stream );
        
        stream.on( 'finish', () => {
            
            console.log( 'Saved ' + url )
            
            if ( i > 1 ) get( i - 1 );
            
        })
      
    });
    
}

get( 166 );