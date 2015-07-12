var express = require('express'),
    app = express(),

    http = require('http').Server(app),
    io = require('socket.io')(http),
    //log = require('./model/log')(module),

    mongoUrl = 'mongodb://127.0.0.1:27017/player',
    db = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;

var fs = require('fs');

app.use(express.static('public'));
app.use(express.static(__dirname + '/../musicStorage/'));

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\d\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

var sendData = function(socket) {
    db.connect(mongoUrl, function (err, db) {
        console.log('Connected to mongo at: ' + mongoUrl);
        var collection = db.collection('song');
        collection.find().toArray(function(err, data) {
            socket.emit('getSongs', data);
        });
    });
};

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('fetchSongs', function () {
       sendData(socket);
    });

    socket.on('saveSong', function(song) {
        var buffer = decodeBase64Image(song.file),
            link =  __dirname + '/../musicStorage/' + song.artist + ' - ' + song.title + '.mp3';
        fs.writeFile(link, buffer.data, function(err) {
            db.connect(mongoUrl, function (err, db) {
                var collection = db.collection('song');
                collection.insert({
                    artist: song.artist,
                    title: song.title,
                    cover: song.cover,
                    link: '/' + song.artist + ' - ' + song.title + '.mp3'
                }, function (err) {
                    if(err) { console.warn(err.message); }
                });
            });
        });
    });
});

http.listen(3000);
