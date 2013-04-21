define(['events'], function(events) {
    var socket = {

        eventFunctions: {},

        on: function(event, fun) {
            this.eventFunctions[event] = fun;
        },

        emit: function(event, inData) {
            var data = {};
            if(event === events.logged_in) {
                data['loggedIn'] = true;
            } else if(event === events.initial_data) {
                data = [
                    {id: 0, name: 'best of'},
                    {id: 1, name: 'Classical'},
                    {id: 2, name: 'Rock'}
                ];
            } else if(event === events.playlist_tracks) {
                var beirut = {'name': 'Beirut'};
                var qotsa = {'name': 'Queens of the Stone Age'}
                if(inData.id === 0) {
                    data['tracks'] = [
                        {'artists': [beirut], name: 'Mount Wroclai (idle days)'},
                        {'artists': [beirut], name: 'Gulag Orkestar'},
                        {'artists': [qotsa], name: 'First It Giveth'}
                    ]
                } else if (inData.id === 1) {
                    data['tracks'] = [
                        {'artists': [{'name': 'Wolfgang Amadeus Mozart'}], name: 'Klarinettenkonzert'},
                        {'artists': [{'name': 'Ludwig van Beethoven'}], name: 'Sinfonie Nr. 6'}
                    ]
                } else {
                    data['tracks'] = [
                        {'artists': [qotsa], name: 'First It Giveth'},
                        {'artists': [{'name': 'Tyler'}], name: 'Yonkers'},
                        {'artists': [{'name': 'Katsumi'}, {'name': 'Ishinawa'}], name: 'Midori'}
                    ]
                }
            }

            this.eventFunctions[event](data);
        }

    };

    return socket;
});