/**
 * Created by alex on 25.07.15.
 */
var Player = React.createClass({
    getInitialState: function () {
        return { songs: [] };
    },

    componentDidMount: function () {
        stream.read(function(err, data) {
            var len = data.length, i = 0;
            while(i < len) {
                if(!data[i].cover) {
                    data[i].cover = './resources/empty-cover.jpg';
                }
                i++;
            }
            this.setState({songs: data});
        }.bind(this));
    },

    render: function() {
        return <div className = 'player-container'>
                    <ControlPanel />
                    <MusicBox songs = {this.state.songs}/>
               </div>

}
});

var MusicBox = React.createClass({
    render: function() {
        var createItem = this.props.songs.map(function(item) {
            return <Music song={item}/>;
        });
        return <div className = 'music-container'>{createItem}</div>;
    }
});

var Music = React.createClass({
    hover: function() {
        $(this.getDOMNode()).find('.control-blackout.play').fadeIn(200);
    },
    noHover: function() {
        $(this.getDOMNode()).find('.control-blackout.play').fadeOut(200);
    },
    playSong: function() {
        $(this.getDOMNode()).find('.control-blackout.play').hide();
        $(this.getDOMNode()).find('.control-blackout.pause').show();

        this.plaingSong = new Howl({
            buffer: true,
            urls: [this.props.song.file]
        }).play();
    },

    pauseSong: function() {
        this.plaingSong.pause();
        $(this.getDOMNode()).find('.control-blackout.play').show();
        $(this.getDOMNode()).find('.control-blackout.pause').hide();
    },
    render: function () {
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

var ControlPanel = React.createClass({
    assembleFiles: function(event) {
    var files = event.target.files[0];

        helperFunction.getID3Data(files, function(ID3Res) {
            stream.write(helperFunction.extendObject({file: files.path}, ID3Res));
        });
},
render: function() {
    return <div className = 'controllers'>
                <div className = "add-song">
                    <div>+</div>
                    <input id="input-container" type="file" className="pointer" onChange = {this.assembleFiles}/>
                </div>
                <div className="player-control">
                    <img src = "./resources/control.svg" className = 'back'/>
                    <img src = "./resources/play_c.svg" />
                    <img src = "./resources/control.svg" />
                </div>
            </div>
    }
});


React.render(
<Player />,
    document.getElementById('player')
);