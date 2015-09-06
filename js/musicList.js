/**
 * Created by alex on 03.08.15.
 */

var MusicList = React.createClass({
    render: function() {
        var createItem = this.props.songs.map(function(item, index) {
            return <Music song={item} key = {index}/>;
        });
        return <div className = 'music-container'>{createItem}</div>;
    }
});

var Music = React.createClass({
    /*getInitialState: function () {
        return { loadedSong: player.loadSong(this.props.song.file) };
    },*/

    play: function() {
        var cover = React.findDOMNode(this.refs.cover),
            className = cover.className;
        if(className.indexOf('playing') === -1) {
            className += ' playing';
            //player.playSong();
        } else {
            className = className.slice(0, 5);
            //player.pauseSong();
        }

        cover.className = className;
    },

    endSong: function() {
        this.state.loadedSong.onend(function() {
            $(this.getDOMNode()).find('.control-blackout.pause').hide();
        }.bind(this));
    },

    render: function () {
        console.log(this);
        return <div className = 'song-container'>
            <div className = "cover" onClick = {this.play} ref = "cover">
                <div className = "control-blackout"></div>
                <img src = {this.props.song.cover}  />
            </div>
            <div className = 'title'>{this.props.song.title}</div>
            <div className = 'artist'>{this.props.song.artist}</div>
        </div>
    }
});