var { PI, floor } = Math;
var TAU = PI * 2;

var m = require('mithril');
var pages = require('./pages');

var clamp = ( x, min, max ) => Math.min( Math.max( x, min ), max );

var sequence = fns => fns.reduce( ( promise, fn ) => promise.then( fn ), Promise.resolve() );

var loadImage = src => new Promise( resolve => {
    /* global Image */
    var img = new Image();
    img.onload = () => resolve( img );
    img.src = src;
})

var loadPage = page => loadImage( page.src ).then( () => page.loaded = true );

var minAngle = -PI / 2;
var maxAngle = minAngle + ( pages.length - 2 ) * PI / 2;

var getAngle = ( x, y ) => {
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    return Math.atan2( y - cy, x - cx );
}

var getAngleDistance = ( a1, a2 ) => {
    var dA = a2 - ( a1 % TAU );
    if ( dA > PI ) return dA - TAU;
    if ( dA < -PI ) return dA + TAU;
    return dA;
}

var state =  {
    angle: minAngle,
    layers: pages.reduce( ( layers, page, i ) => {
        var side = i % 2;
        var layer = floor( ( ( i + 1 ) % 4 ) / 2 );
        layers[ layer ][ side ].push( page );
        return layers;
    },
        [
            [ [], [] ],
            [ [], [] ] 
        ]
    ),
    touch: [ 0, 0 ],
    setAngle: a => {
        var dA = getAngleDistance( state.angle, a );
        if ( state.angle === minAngle && dA > PI / 8 ) return;
        if ( state.angle === maxAngle && dA < PI / -8 ) return;
        var angle = clamp( state.angle + dA, minAngle, maxAngle );
        state.setVisibility( state.angle, false );
        state.setVisibility( angle, true );
        state.angle = angle;
    },
    onmousemove: e => {
        state.setAngle( getAngle( e.clientX, e.clientY ) );
    },
    ontouchstart: e => {
        state.touch = [ e.touches[ 0 ].clientX, e.touches[ 0 ].clientY ];
    },
    ontouchmove: e => {
        var touch = [ e.touches[ 0 ].clientX, e.touches[ 0 ].clientY ];
        var prevAngle = getAngle( state.touch[ 0 ], state.touch[ 1 ] );
        var angle = getAngle( touch[ 0 ], touch[ 1 ] );
        state.setAngle( ( state.angle + getAngleDistance( prevAngle, angle ) ) % TAU );
        state.touch = touch;
    },
    setVisibility: ( angle, value ) => {
        var halfTurns = Math.floor( ( angle - minAngle ) / PI );
        for ( var i = halfTurns * 2; i <= halfTurns * 2 + 3; i++ ) {
            var page = pages[ i ];
            if ( !page ) break;
            page.visible = value;
        }
    },
    load: num => {
        var loadFns = pages
            .filter( page => 'src' in page )
            .map( page => () => loadPage( page ) );
        var loadNow = loadFns.slice( 0, num );
        var loadAfter = loadFns.slice( num );
        var ret = sequence( loadNow );
        ret.then( () => sequence( loadAfter ) );
        return ret.then( () => state.setAngle( state.angle ) );
    }
}

module.exports = state;