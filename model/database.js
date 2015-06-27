/**
 * Created by alex on 20.06.15.
 */

var MongoClient = require('mongodb').MongoClient;
var log = require('./log')(module);
var db;
var connected = false;

module.exports = {
    connect: function(url, callback) {
        MongoClient.connect(url, function(err, _db) {
            if(err) {
                log.error('connection error: ', err.message);
            }

            db = _db;
            connected = true;

            callback(db);
        });
    },
    collection: function(name) {
        if(!connected) {
            throw new Error ('Must connect to Mongo before calling "collection"');
        }

        return db.collection(name);
    }
};