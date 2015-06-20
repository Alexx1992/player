/**
 * Created by alex on 20.06.15.
 */

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    db = require('./model/database'),
    blob = require('./model/blob');

app.get('/', function(req, res) {

});

http.listen(3000);