/**
 * Created by alex on 20.06.15.
 */

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    log = require('./model/log')(module),
    mongoUrl = 'mongodb://127.0.0.1:27017/player',
    db = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;
    /*bodyParser = require('body-parser');*/

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    db.connect(mongoUrl, function (err, db) {
        console.log('Connected to mongo at: ' + mongoUrl);
        var collection = db.collection('song');
        var stream = collection.find();
        stream.on('data', function(data) {
            socket.emit('song', data);
        })
    });

    socket.on('song', function(songInfo) {
        db.connect(mongoUrl, function (err, db) {
            var collection = db.collection('song');
            collection.insert(songInfo, function (err) {
                if(err) {console.warn(err.message); }
                else { console.log(songInfo); }
            });
        });
    });
});

http.listen(3000);
