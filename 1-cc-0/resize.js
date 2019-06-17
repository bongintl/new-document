var fs = require('fs');
var sharp = require('sharp');
var sizeOf = require('image-size');

var base = '1-cc-0/assets/';
var original = base + 'original/'

var dest = process.argv[ 2 ];
var size = Number( process.argv[ 3 ] );
var quality = Number( process.argv[ 4 ] );

var files = fs.readdirSync( original );

if ( !fs.existsSync( base + dest ) ) fs.mkdirSync( base + dest );

files.forEach( file => {
    
    try {
    
        var path = original + file;
        var file = base + dest + '/' + file;
        
        var w = sizeOf( path ).width
        
        sharp( path )
            .resize( Math.min( w, size ) )
            .jpeg( { quality } )
            .toFile( file, e => console.log( e || 'Resized ' + file ) );
            
    } catch ( e ) {
        
        console.log( file + ' failed', e );
        
    }
    
})