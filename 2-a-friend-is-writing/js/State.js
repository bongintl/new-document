var m = require('mithril');
var findLastIndex = require('lodash/findLastIndex');
var flatten = require('lodash/flatten');
var stripTags = require('strip');

var wait = delay => new Promise( r => setTimeout( r, delay ) );

module.exports = data => {
    
    var notificationId = 0;
    
    var state = {
        
        tabs: data.map( ( story, i ) => {
            
            return {
                title: story.title,
                tabTitle: story.tabTitle,
                typing: false,
                unread: 0,
                paragraphs: story.paragraphs.map( paragraph => {
                    
                    return paragraph.map( sentence => {
                        
                        return {
                            text: sentence,
                            sent: false,
                            seen: false
                        }
                        
                    })
                    
                })
            }
            
        }),
        
        notifications: [],
        
        activeTab: 0,
        
        maxTab: () => findLastIndex( state.tabs, tab => {
    
            return tab.paragraphs[ 0 ][ 0 ].sent;
            
        }),
        
        setTab: tabIndex => {
            
            state.activeTab = tabIndex;
            
            state.notifications = state.notifications.filter( n => n.tab !== tabIndex );
            
            var tab = state.tabs[ tabIndex ];
            
            tab.unread = 0;
            
            wait(100)
                .then(() => {
                    
                    flatten( tab.paragraphs ).forEach( sentence => sentence.seen = sentence.sent );
                    
                    m.redraw();
                    
                })
            
        },
        
        isDone: tabIndex => {
            
            var paragraphs = state.tabs[ tabIndex ].paragraphs;
            
            var lastParagraph = paragraphs[ paragraphs.length - 1 ];
            
            var lastSentence = lastParagraph[ lastParagraph.length - 1 ];
            
            return lastSentence.sent;
            
        },
        
        send: ( tabIndex, typingSpeed ) => {
            
            var tab = state.tabs[ tabIndex ];
            
            var nextSentence = flatten( tab.paragraphs ).find( s => !s.sent );
            
            if ( tabIndex !== state.activeTab && nextSentence === tab.paragraphs[ 0 ][ 0 ] ) typingSpeed = 0;
            
            var strippedText = stripTags( nextSentence.text );
            
            var typingDuration = strippedText.length * typingSpeed;
            
            tab.typing = true;
            
            m.redraw();
            
            return wait( typingDuration )
                .then( () => {
                    
                    tab.typing = false;
                    
                    nextSentence.sent = true;
                    
                    if ( state.activeTab === tabIndex ) {
                        
                        wait(100)
                            .then(() => {
                                nextSentence.seen = true;
                                m.redraw();
                            })
                        
                        // nextSentence.seen = true;
                        
                    } else {
                        
                        var notification = {
                            title: tab.tabTitle,
                            text: strippedText,//.replace( /^(-|–|—| |,|;)*/g, '' ),
                            id: notificationId++,
                            tab: tabIndex
                        }
                        
                        state.notifications.unshift( notification );
                        
                        tab.unread++;
                        
                    }
                    
                    m.redraw();
                    
                })
            
        }
        
    }
    
    return state;
    
}