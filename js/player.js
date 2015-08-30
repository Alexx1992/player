/**
 * Created by alex on 04.08.15.
 */

var player = (function() {
    var currentSong;

    return {
        loadSong : function(url) {
            currentSong = new Howl({
                buffer: true,
                urls: [url]
            });

            return currentSong;
        },

        playSong: function() {
            currentSong.play();
        },

        pauseSong: function() {
            currentSong.pause();
        }
    };
})();