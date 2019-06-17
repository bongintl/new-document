var callback = () => {};

var { sin, cos, atan, sqrt, PI } = Math;

var DEG_TO_RAD = PI / 180;
	
var fire = data => {
    
    var { fb, lr } = data;
    
    var y = sin( fb * DEG_TO_RAD ) * cos( lr * DEG_TO_RAD );
    
    var x = sin( lr * DEG_TO_RAD );
    
    var angle = -atan( x / y ) + ( y < 0 ? PI : 0 ) + PI / 2;
    
    callback( angle );
    
}

module.exports = {
    
    isSupported: !!(window.DeviceOrientationEvent || window.OrientationEvent),
    
    init: () => {
        
        // setup
		if ( window.DeviceOrientationEvent ) {
			
			// Listen for the deviceorientation event and handle the raw data
			window.addEventListener( 'deviceorientation', function( eventData ) {
				
				var data = {
					lr: eventData.gamma, // gamma is the left-to-right tilt in degrees, where right is positive
					fb: eventData.beta, // beta is the front-to-back tilt in degrees, where front is positive
					dir: eventData.alpha, // alpha is the compass direction the device is facing in degrees
					grav: null
				};
				
				fire( data );
				
			}, false);
			
		} else if ( window.OrientationEvent ) {
			
			window.addEventListener('MozOrientation', function( eventData ) {
				
				var data = {
					lr: eventData.x * 90, // x is the left-to-right tilt from -1 to +1, so we need to convert to degrees
					fb: eventData.y * -90, // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
							    // We also need to invert the value so tilting the device towards us (forward) 
							    // results in a positive value. 
					dir: null, 
					grav: eventData.z // z is the vertical acceleration of the device
				};
				
				fire( data );
				
			}, false);
		}
        
    },
    
    on: cb => callback = cb
    
}