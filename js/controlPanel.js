/**
 * Created by alex on 03.08.15.
 */

var ControlPanel = React.createClass({
    addSong: function() {
        var inputFile = $(this.getDOMNode()).find('#input-container'),
            self = this;

        inputFile.off('change').on('change', function(event) {
            var files = event.target.files[0];

            helperFunction.getID3Data(files, function(ID3Res) {
                stream.write(helperFunction.extendObject({file: files.path}, ID3Res), function(err, newDoc) {
                    self.props.newSong(newDoc);
                });
            });
        }).click();
    },

    render: function() {
        return <div className = 'controllers'>
            <input id="input-container" type="file" className="pointer" />
            <div className = "add-song" onClick = {this.addSong}>
                <div>+</div>
            </div>
        </div>
    }
});
