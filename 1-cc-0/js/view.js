var m = require('mithril');

var { PI, sqrt } = Math;

var mask = require('./mask');
var state = require('./state');

var TRANSFORM = require('detectcss').prefixed('transform');
var CLIP_PATH = '-webkit-clip-path';

var Line = {
    view: ({ attrs: { angle } }) => {
        var ww = window.innerWidth;
        var wh = window.innerHeight;
        return m('.line', {
            style: {
                [ TRANSFORM ]: `translate(-50%, -50%) rotate(${ angle }rad)`,
                width: sqrt( ww * ww + wh * wh ) + 'px'
            }
        });
    }
}

var Page = {
    view: ({ attrs }) => {
        var style = { visibility: attrs.visible ? 'visible' : 'hidden' };
        return m('.page', { style }, attrs.view( attrs ) );
    }
}

var Layer = {
    view: ({ attrs: { angle, pages: [ left, right ] } }) => {
        var clipPath = mask( angle );
        var style = {
            '-webkit-clip-path': clipPath,
            'clip-path': clipPath
        };
        return m('.layer', { style },
            m('.layer__left', left.map( page => m( Page, page ) ) ),
            m('.layer__right', right.map( page => m( Page, page ) ) )
        )
    }
}

module.exports = {
    
    view: () => {
        
        var {
            angle,
            layers,
            onmousemove,
            ontouchstart,
            ontouchend,
            ontouchmove,
        } = state;
        
        return m('.main', { onmousemove, ontouchstart, ontouchmove, ontouchend },
            m( Line, { angle } ),
            m( Layer, { angle: angle + PI, pages: layers[ 0 ] } ),
            m( Layer, { angle, pages: layers[ 1 ] } )
        )
        
    }
    
}

window.addEventListener( 'resize', m.redraw );