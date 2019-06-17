var m = require('mithril');

var state = require('./state');
var View = require('./view');

state.load( 5 )
    .then( () => {
        m.mount( document.body, View );
    })