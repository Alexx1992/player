/**
 * Created by alex on 27.06.15.
 */
var socket = (function(){
    var socket = io();

    return {
        getData: function(cb) {
            socket.on('getSongs', cb);
            socket.emit('fetchSongs');
        },

        sendData: function(data) {
            socket.emit('saveSong', data);
        }
    }
})();