var fs = require('fs');
var http = require('https');

function get ( prefix, i ) {
    
    var url = `https://randomuser.me/api/portraits/${ prefix }/${ i }.jpg`;
    
    http.get( url, function(response) {
        
        var stream = fs.createWriteStream( `2-a-friend-is-writing/assets/${ prefix }-${ i }.jpg`);
        
        response.pipe( stream );
        
        stream.on( 'finish', () => {
            
            console.log( 'Saved ' + url )
            
            if ( i > 0 ) get( prefix, i - 1 );
            
        })
      
    });
    
}

get( 'men', 100 );
get( 'women', 100 );