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

    hover: function() {
        $(this.getDOMNode()).find('.control-blackout.play').fadeIn(200);
    },
    noHover: function() {
        $(this.getDOMNode()).find('.control-blackout.play').fadeOut(200);
    },

    playSong: function() {
        $(this.getDOMNode()).find('.control-blackout.play').hide();
        $(this.getDOMNode()).find('.control-blackout.pause').show();
        console.log(this);
        //player.playSong();
    },
    pauseSong: function() {
        player.pauseSong();
        $(this.getDOMNode()).find('.control-blackout.play').show();
        $(this.getDOMNode()).find('.control-blackout.pause').hide();
    },

    endSong: function() {
        this.state.loadedSong.onend(function() {
            $(this.getDOMNode()).find('.control-blackout.pause').hide();
        }.bind(this));
    },

    render: function () {
        console.log(this);
        return <div className = 'song-container'>
            <div className="play-container">
                <div className="control-blackout play" onMouseOut = {this.noHover}
                     onClick = {this.playSong}></div>
                <div className="control-blackout pause"
                     onClick = {this.pauseSong}></div>
                <img src = {this.props.song.cover} onMouseOver = {this.hover}  />
            </div>
            <div className = 'title'>{this.props.song.title}</div>
            <div className = 'artist'>{this.props.song.artist}</div>
        </div>
    }
});