/**
 * Created by alex on 30.06.15.
 */

var helperFunction = {
    getID3Data: function(file, cb) {
        ID3.loadTags(file.name, function() {
                var tags = ID3.getAllTags(file.name),
                    base64String = '',
                    i = 0,
                    len,
                    base64,
                    cover = tags.picture;

                if(cover) {
                     len = cover.data.length;
                     while(i < len) {
                        base64String = base64String + String.fromCharCode(cover.data[i]);
                        i++;
                     }
                     base64 = 'data:' + cover.format + ';base64,'
                     + btoa(base64String);
                 }

                cb({
                    artist: tags.artist,
                    title: tags.title,
                    cover: base64
                });
            },
            {
                tags: ["title","artist","album","picture"],
                dataReader: FileAPIReader(file)
            });
    },
    loadMusic: function(file, cb) {
        var reader = new FileReader();

        reader.onload = function(event) {
            /*new Howl({
                buffer: true,
                urls: [event.target.result]
            });*/

            cb({file: event.target.result});
        };

        reader.readAsDataURL(file);

    },

    extendObject: function(obj1, obj2){
    var obj3 = {}, key;
    for (key in obj1) { obj3[key] = obj1[key]; }
    for (key in obj2) { obj3[key] = obj2[key]; }
    return obj3;
}
};