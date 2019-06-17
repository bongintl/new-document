var m = require('mithril');

var Image = ( className, src ) => ({
    src,
    visible: false,
    loaded: false,
    view: ({ loaded }) => {
        return m('div', { className, style: {
            backgroundImage: loaded ? `url(${ src })` : 'none',
        }})
    }
});

var HTML = content => ({ visible: false, view: () => m.trust( content ) });
var Nothing = () => HTML('');

var imgSrc = ( i, size = 'large') => `./assets/${ size }/${ i }.jpg`;
var licenseSrc = i => `./assets/license_${ i }.svg`;
var LICENSE_LEFT = 'y50 w100vm h100vm md-w80vm md-h80vm center contain';
var LICENSE_RIGHT = 'x100 y50 w100vm h100vm md-w80vm md-h80vm center contain';

var TITLE = `
    <h1 class="w100 x50 y50 center text-center">
        CC<span class="dash">-</span><span class="zero">0</span>
    </h1>
`;

var colophon = `
    <a href='http://new-document.net'>
        <img src="./assets/logo.svg">
    </a>
    <p>
        <a href='http://img.modem.studio/'>img.modem.studio</a>
    </p>
    <!--<p>
        <a href='http://new-document.net'>New Document</a>
    </p>-->
`;

module.exports = [
    
    HTML( `
        <h2 class="x50 y50 center text-center">
            New Document 2
        </h2>
    `),
    Image( 'h100 cover', imgSrc( 1 ) ),
    
    HTML( `<div class="w200 h100">${ TITLE }</div>` ),
    HTML( `<div class="w200 h100 x-100">${ TITLE }</div>` ),
    
    HTML( `
        <h2 class="x50 y50 center text-center">
            Copyright-free images<br>curated by<br>Pieterjan Grandry
        </h2>
    `),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 2 ) ),
    
    Nothing(),
    Image( 'y50 h50 cover', imgSrc( 79 ) ),
    
    Image( 'h50 cover', imgSrc( 78 ) ),
    Nothing(),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 5 ) ),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 6 ) ),
    
    Image( 'w200 h100 cover', imgSrc( 161 ) ),
    Nothing(),
    
    Nothing(),
    Image( 'w200 h100 x-100 cover', imgSrc( 161 ) ),
    
    Nothing(),
    Image( 'y50 h50 cover', imgSrc( 8 ) ),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 9 ) ),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 113 ) ),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 11 ) ),
    Image( 'w200 h100 x-100 cover', imgSrc( 12 ) ),
    
    Image( 'w200 h100 cover', imgSrc( 12 ) ),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 143 ) ),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 93 ) ),
    Nothing(),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 85 ) ),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 30 ) ),
    
    Nothing(),
    Image( 'x-60 y20 w120 h60 contain', imgSrc( 92 ) ),
    
    Image( 'x40 y20 w120 h60 contain', imgSrc( 92 ) ),
    Nothing(),
    
    Nothing(),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 77 ) ),
    
    Nothing(),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 142 ) ),
    
    Image( 'w200 h100 cover', imgSrc( 88 ) ),
    Image( 'x-100 w200 h100 cover', imgSrc( 88 ) ),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 89 ) ),
    Nothing(),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 47 ) ),
    Nothing(),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 131 ) ),
    Nothing(),
    
    Image( 'x40 y20 w120 h60 contain', imgSrc( 31 ) ),
    Image( 'x-60 y20 w120 h60 contain', imgSrc( 31 ) ),
    
    Image( 'y50 h50 cover', imgSrc( 113 ) ),
    Image( 'h50 cover', imgSrc( 108 ) ),
    
    Nothing(),
    Image( 'x-60 y20 w120 h60 contain', imgSrc( 44 ) ),
    
    Image( 'x40 y20 w120 h60 contain', imgSrc( 44 ) ),
    Nothing(),
    
    Nothing(),
    Image( 'x-100 w200 h100 cover', imgSrc( 166 ) ),
    
    Image( 'w200 h100 cover', imgSrc( 166 ) ),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 36 ) ),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 19 ) ),
    Image( 'x-100 w200 h100 cover', imgSrc( 166 ) ),
    
    Image( 'w200 h100 cover', imgSrc( 90 ) ),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 84 ) ),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 126 ) ),
    Image( 'x-100 w200 h100 cover', imgSrc( 90 ) ),
    
    Image( 'x40 y20 w120 h60 contain', imgSrc( 25 ) ),
    Nothing(),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 24 ) ),
    Image( 'x-60 y20 w120 h60 contain', imgSrc( 25 ) ),
    
    Image( 'x20 y20 w60 h60 contain', imgSrc( 34 ) ),
    Image( 'x-100 w200 h100 cover', imgSrc( 10 ) ),
    
    Image( 'w200 h100 cover', imgSrc( 10 ) ),
    Image( 'h50 cover', imgSrc( 29 ) ),
    
    Nothing(),
    Image( LICENSE_LEFT, licenseSrc( 1 ) ),
    
    Image( LICENSE_RIGHT, licenseSrc( 2 ) ),
    Nothing(),
    
    Nothing(),
    Image( LICENSE_LEFT, licenseSrc( 3 ) ),
    
    Image( LICENSE_RIGHT, licenseSrc( 4 ) ),
    Nothing(),
    
    Nothing(),
    Image( LICENSE_LEFT, licenseSrc( 5 ) ),
    
    Image( LICENSE_RIGHT, licenseSrc( 6 ) ),
    Nothing(),
    
    HTML( 'New Doco' ),
    Image( 'x20 y20 w60 h60 contain', imgSrc( 151 ) ),
    
]