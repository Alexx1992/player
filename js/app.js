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
                    data[i].cover = './resources/empty-cover.jpg'
                }
                i++;
            }
            this.setState({songs: data});
        }.bind(this));
    },

    renderNewSong: function(newSong) {
        if(!newSong.cover) {
            newSong.cover = './resources/empty-cover.jpg';
        }
        var songs = this.state.songs;
        songs.push(newSong);
        this.setState({songs: songs});
    },

    render: function() {
        return <div className = 'player-container'>
                    <ControlPanel newSong = {this.renderNewSong}/>
                    <MusicList songs = {this.state.songs}/>
               </div>
}
});

React.render(
<Player />,
    document.getElementById('player')
);
