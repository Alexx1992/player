/**
 * Created by alex on 27.07.15.
 */
var stream = (function(){
    var db = new Datastore({ filename: __dirname + '/database.db', autoload: true });

    return {
        read: function(cb) {
            db.find({}, cb);
        },

        write: function(data) {
            db.insert(data, function(err, newDoc) {

            });
        }
    }
})();