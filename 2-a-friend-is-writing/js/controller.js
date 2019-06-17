var playSound = require('./sound');

var range = require('lodash/range');
var random = require('lodash/random');
var wait = delay => new Promise( r => setTimeout( r, delay ) );

var TYPING_SPEED_FOREGROUND = 40;
var TYPING_SPEED_BACKGROUND = 80;

var MIN_DELAY_FOREGROUND = 50;
var MAX_DELAY_FOREGROUND = 150;
var foregroundDelay = () => random( MIN_DELAY_FOREGROUND, MAX_DELAY_FOREGROUND )

var MIN_DELAY_BACKGROUND = 750;
var MAX_DELAY_BACKGROUND = 3500;
var backgroundDelay = () => random( MIN_DELAY_BACKGROUND, MAX_DELAY_BACKGROUND )

var FIRST_TAB_DELAY = 5000;
var MIN_TAB_DELAY = 10000;
var MAX_TAB_DELAY = 20000;
var tabDelay = () => random( MIN_TAB_DELAY, MAX_TAB_DELAY );

window.addEventListener('keydown', e => {
    
    if ( e.keyCode === 65 ) {
        TYPING_SPEED_FOREGROUND /= 10;
        TYPING_SPEED_BACKGROUND /= 10;
        MIN_DELAY_FOREGROUND /= 10;
        MAX_DELAY_FOREGROUND /= 10;
        MIN_DELAY_BACKGROUND /= 10;
        MAX_DELAY_BACKGROUND /= 10;
        MIN_TAB_DELAY /= 10;
        MAX_TAB_DELAY /= 10;
    }
    
})

var sendAll = ( state, tabIndex ) => {
    
    if ( !state.isDone( tabIndex ) ) {
        
        var typingSpeed = TYPING_SPEED_BACKGROUND;
        
        // if ( tabIndex === 0 ) typingSpeed = TYPING_SPEED_FOREGROUND * 2;
        
        if ( tabIndex !== 0 && tabIndex === state.activeTab ) typingSpeed = TYPING_SPEED_FOREGROUND;
        
        state
            .send( tabIndex, typingSpeed )
            .then( () => {
                
                if ( tabIndex === 0 ) playSound( 0 );
                
                return wait(
                    tabIndex === state.activeTab ?
                        foregroundDelay()
                    :
                        backgroundDelay()
                )
                
            })
            .then( () => sendAll( state, tabIndex ) );
        
    }
    
}

module.exports = state => {
    
    var delay = 0;
    
    state.tabs.forEach( ( tab, i ) => {
        
        setTimeout( () => {
            sendAll( state, i )
            if ( i > 0 ) playSound( i )
        }, delay );
        
        delay += i === 0 ? FIRST_TAB_DELAY : tabDelay();
        
    })
    
}