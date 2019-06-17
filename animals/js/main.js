var { Noise } = require('noisejs');

var range = n => {
    var ret = [];
    while ( ret.length < n ) ret.push( ret.length );
    return ret;
}

var div = classname => {
    var el = document.createElement('div');
    el.className = classname;
    return el;
}

var animals = range( 20 ).map( i => {
    
    return {
        position: [
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        ],
        velocity: [ 0, 0 ],
        element: div('animal'),
        noise: new Noise( Math.random() ),
        fear: Math.random()
    }
    
})

var mount = animals => {
    
    animals.forEach( animal => {
        document.body.appendChild( animal.element );
    })
    
}

var add = ( v1, v2 ) => [ v1[ 0 ] + v2[ 0 ], v1[ 1 ] + v2[ 1 ] ];
var subtract = ( v1, v2 ) => [ v1[ 0 ] - v2[ 0 ], v1[ 1 ] - v2[ 1 ] ];
var multiply = ( v1, v2 ) => [ v1[ 0 ] * v2[ 0 ], v1[ 1 ] * v2[ 1 ] ];
var divide = ( v1, v2 ) => [ v1[ 0 ] / v2[ 0 ], v1[ 1 ] / v2[ 1 ] ];
var length = v => Math.sqrt( Math.pow( v[ 0 ], 2 ) + Math.pow( v[ 1 ], 2 ) );
var wrap = ( x, min, max ) => {
    var range = max - min;
    while ( x < min ) x += range;
    while ( x > max ) x -= range;
    return x;
}
var wrapVector = ( v, min, max ) => [ wrap( v[ 0 ], min[ 0 ], max[ 0 ] ), wrap( v[ 1 ], min[ 1 ], max[ 1 ] ) ];
var clamp = ( x, min, max ) => Math.min( Math.max( x, min ), max );
var clampVector = ( v, min, max ) => [ clamp( v[ 0 ], min[ 0 ], max[ 0 ] ), clamp( v[ 1 ], min[ 1 ], max[ 1 ] ) ];

var update = ( animals, mouse, now, dT ) => {
    
    mouse.velocity = [
        ( mouse.position[ 0 ] - mouse.prevPosition[ 0 ] ) / dT,
        ( mouse.position[ 1 ] - mouse.prevPosition[ 1 ] ) / dT
    ];
    
    var mV = length( mouse.velocity );
    
    var size = [ window.innerWidth, window.innerHeight ];
    var center = divide( size, [ 2, 2 ] );
    var max = length( center );
    
    mouse.prevPosition = mouse.position;
    
    animals.forEach( animal => {
        
        var dM = subtract( mouse.position, animal.position )
        
        animal.fear += ( 1 - ( length( dM ) / max ) ) * .1;
        
        var panic = [
            animal.noise.perlin2( now / 1000 * animal.fear, 0 ) * 40 * Math.pow( animal.fear, 5 ),
            animal.noise.perlin2( now / 1000 * animal.fear, .5 ) * 40 * Math.pow( animal.fear, 5 )
        ];
        
        animal.velocity = add( animal.velocity, panic );
        
        animal.velocity = add( animal.velocity, multiply( dM, [ -.01 * animal.fear, -.01 * animal.fear ] ) );
        
        animal.position = add( animal.position, animal.velocity );
        
        animal.position = clampVector( animal.position, [ 0, 0 ], size )
        
        animal.fear = clamp( animal.fear * ( 1 - dT / 200 ), 0, 1 );
        
        animal.velocity = multiply( animal.velocity, [ animal.fear, animal.fear ] );
        
    })
    
}

var render = animals => {
    
    animals.forEach( animal => {
        
        var [ x, y ] = animal.position;
        
        animal.element.style.transform = `translate( ${ x }px, ${ y }px )`;
        animal.element.style.backgroundColor = `rgb( ${ Math.floor( animal.fear * 255 ) }, 0, 0 )`
        
    })
    
}

var mouse = {
    position: [ 0, 0 ],
    prevPosition: [ 0, 0 ],
    velocity: [ 0, 0 ]
}

window.addEventListener( 'mousemove', e => {
    
    mouse.position = [ e.clientX, e.clientY ];
    
})

mount( animals );

var then = Date.now();

var tick = () => {
    
    var now = Date.now();
    var dT = now - then;
    then = now;
    
    update( animals, mouse, now, dT );
    render( animals );
    
    requestAnimationFrame( tick );
    
}

tick();