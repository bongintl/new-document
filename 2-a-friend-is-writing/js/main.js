require('babel-polyfill');

var m = require('mithril');

var data = require('./data');
var State = require('./State');
var View = require('./View');
var controller = require('./controller');

var state = State( data );
var view = View( state );
m.mount( document.querySelector('.app'), view );

setTimeout(() => {
    document.body.classList.add('loaded');
    controller( state );
}, 500 )
