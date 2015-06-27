/**
 * Created by Alex on 14.06.2015.
 */

var Player = React.createClass({
    getInitialState: function () {
        return {songs: []}
    },
    componentDidMount: function () {
        var socket = io(),
            self = this;

        socket.on('song', function (data) {
            self.setState(function(previousState) {
                return previousState.songs.push(data);
            });
        });
    },
    render: function() {
        return <LeftBar data={this.state.songs} />;
    }
});

var LeftBar = React.createClass({
       render: function() {
            return <div className = 'left-bar'>
                        <Search />
                        <MusicBox data = {this.props.data}/>
                    </div>
       }
});

var MusicBox = React.createClass({
    render: function() {
        return <div className = 'songs-block'>
            <AddSection />
            <MusicList song = {this.props.data}/>
            <div className="clear-fix"></div>
        </div>

    }
});

var MusicList = React.createClass({
    render: function() {
        var createItem = function(itemText) {
            return <li><span className = 'atist'>{itemText.artist}</span>
                        <span className = 'title'>{itemText.title}</span></li>;
        };
        return <ul className = 'music-container'>{this.props.song.map(createItem)}</ul>;
    }
});

var AddSection = React.createClass({
    componentDidMount: function() {
        var self = this;
        $(this.getDOMNode()).find('input').on('change', function() {
            var files  = this.files[0];
            //self.loadMusic(files);
            self.getID3Data(files);
        });
    },
    getID3Data: function(file) {
        var self = this;
        ID3.loadTags(file.name, function() {
                var tags = ID3.getAllTags(file.name),
                    base64String = '',
                    i = 0,
                    len,
                    base64,
                    cover = tags.picture;
                socket.emit('song', {
                    artist: tags.artist,
                    title: tags.title
                });

                //self.setState({songs: self.state.songs});

                /*if(cover) {
                 len = cover.data.length;
                 while(i < len) {
                 base64String = base64String + String.fromCharCode(cover.data[i]);
                 i++;
                 }
                 base64 = 'data:' + cover.format + ';base64,'
                 + btoa(base64String);
                 $('.cover').attr('src', base64).show();
                 }*/
            },
            {
                tags: ["title","artist","album","picture"],
                dataReader: FileAPIReader(file)
            });
    },
    loadMusic: function(file) {
        var reader = new FileReader();

        reader.onload = function(event) {
            new Howl({
                buffer: true,
                urls: [event.target.result]
            }).play();
        };

        reader.readAsDataURL(file);
    },
    render: function() {
        return (
            <div className="add-song">
                <i className="fa fa-plus fa-1x"></i>
                <input id="input-container" type="file" className="pointer" />
            </div>
        );
    }
});

var Search = React.createClass({
    render: function() {
        return <div className="search"></div>;
    }
});

React.render(
    <Player />,
    document.getElementById('player')
);
