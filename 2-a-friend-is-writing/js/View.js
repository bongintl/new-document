var m = require('mithril');
var flatten = require('lodash/flatten');
var PREFIXED_TRANSFORM = require('detectcss').prefixed('transform');
var portrait = require('./portrait');

var wait = delay => new Promise( r => setTimeout( r, delay ) );

var classList = ( ...classes ) => classes.filter( x => x ).join(' ')

var NOTIFICATION_HEIGHT = 90;

var Tab = {
    
    view: vnode => {
        
        var { onclick, active, typing, unread, title } = vnode.attrs;
        
        return m('.tab',
            {
                onclick,
                class: active ? 'tab_active' : ''
            },
            
            title,
            
            !active && typing
                ? m( Throbber )
                : '',
                
            m( Bubble, { count: unread } )
            
        )
        
    }
    
}

var Bubble = {
    
    view: vnode => {
        
        return vnode.attrs.count === 0
            ? ''
            : m( '.bubble', vnode.attrs.count )
        
    }
    
}

var Throbber = {
    
    view: vnode => m('.throbber',
        m('span', '.'),
        m('span', '.'),
        m('span', '.')
    )
    
}

var Notification = {
    
    oninit: vnode => {
        
        vnode.state.portrait = portrait();
        
    },
    
    onbeforeremove: vnode => {
        
        vnode.dom.classList.add('notification_fade-out');
        
        return wait( 750 );
        
    },
    
    view: ({
        attrs: { title, text, tab, onclick, i },
        state: { portrait }
    }) => {
        
        return m( '.notification',
            {
                onclick,
                class: 'notification_tab-' + ( tab + 1 ),
                style: {
                    [ PREFIXED_TRANSFORM ]: `translateY(${ i * NOTIFICATION_HEIGHT }px)`
                }
            },
            m( '.notification__image', { style: { backgroundImage: `url(${ portrait })` } } ),
            m( '.notification__title', title ),
            m( '.notification__text', text )
        )
        
    }
    
}

var Article = {
    
    view: ({
        attrs: { active, typing, title, paragraphs }
    }) => {
        
        return m( '.article',
            {
                style: {
                    visibility: active ? 'visible' : 'hidden'
                },
                
            },
            
            title ? m('p', m('h1', title ) ) : '',
            
            paragraphs
            .filter( paragraph => paragraph.some( sentence => sentence.sent ) )
            .map( paragraph => {
                
                return m('p',
                    paragraph
                    .filter( sentence => sentence.sent )
                    .map( sentence => m('span', { class: sentence.seen ? '' : 'unseen' }, m.trust(sentence.text) ) )
                )
                
            }),
            
            typing
                ? m('p', m( Throbber ) )
                : ''
        )
        
    }
    
}

module.exports = state => {
    
    return {
        
        oninit: vnode => {
            
            vnode.state.menuOpen = false;
            
            vnode.state.setMenu = value => e => {
                e.stopPropagation();
                vnode.state.menuOpen = value;
            }

        },
        
        onupdate: vnode => {
            
            var title = 'A Friend Is Writing';
                
            var unread = state.tabs.reduce( ( acc, tab ) => acc + tab.unread, 0 );
            
            if ( unread > 0 ) title = '(' + unread + ') ' + title;
            
            document.title = title;
            
        },
        
        view: vnode => {
            
            var totalUnread = state.tabs.reduce( ( acc, tab ) => acc + tab.unread, 0 );
            
            return [
                
                m('.tabs',
                    
                    state.tabs
                    .filter( tab => tab.typing || flatten( tab.paragraphs ).some( sentence => sentence.sent ) )
                    .map( ( tab, i ) => {
                        
                        var active = i === state.activeTab;
                        
                        var { tabTitle, unread, typing } = tab;
                        
                        return m( Tab, {
                            title: tabTitle,
                            typing,
                            unread,
                            active,
                            onclick: () => {
                                vnode.state.menuOpen = false;
                                state.setTab( i );
                            }
                        })
                        
                    })
                    
                ),
                
                m('.main',
                    {
                        class: vnode.state.menuOpen ? 'main_menu-open' : '',
                        onclick: vnode.state.setMenu( false )
                    },
                
                    m('.header',
                        {
                            class: 'header_tab-' + ( state.activeTab + 1 )
                        },
                            
                        state.tabs[ state.activeTab ].title,
                        
                        m('.burger',
                            { onclick: vnode.state.setMenu( true ) },
                            m( Bubble, { count: totalUnread } )
                        )
                        
                    ),
                    
                    state.tabs.map( ( tab, i ) => {
                        
                        return m( Article, {
                            active: i === state.activeTab,
                            title: tab.title,
                            paragraphs: tab.paragraphs,
                            typing: tab.typing
                        })
                        
                    })
                
                ),
                
                m( '.notifications',
                    
                    state.notifications.map( ( notification, i ) => {
                        
                        return m( Notification, {
                            onclick: () => {
                                vnode.state.menuOpen = false;
                                state.setTab( notification.tab )
                            },
                            title: notification.title,
                            text: notification.text,
                            tab: notification.tab,
                            key: notification.id,
                            i
                        });
                        
                    })
                    
                )
                
            ]
            
        }
        
    }
    
}