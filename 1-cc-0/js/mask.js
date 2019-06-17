var { PI, sqrt, cos, sin } = Math;

var cssMask = ( ...pts ) => `polygon( ${ pts.map( p => p.map( x => x + 'px' ).join(' ') ).join(', ')  } )`;

module.exports = angle => {
    
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    
    var length = sqrt( cx * cx + cy * cy );
    
    var dx = cos( angle ) * length;
    var dy = sin( angle ) * length;
    
    var perpX = cos( angle + PI / 2 );
    var perpY = sin( angle + PI / 2 );
    
    var end1 = [ cx + dx, cy + dy ];
    var end2 = [ cx - dx, cy - dy ];
    
    var ox = perpX * length;
    var oy = perpY * length;
    
    var offset1 = [ end1[ 0 ] + ox, end1[ 1 ] + oy ];
    var offset2 = [ end2[ 0 ] + ox, end2[ 1 ] + oy ];
    
    return cssMask( end1, offset1, offset2, end2 );
    
}