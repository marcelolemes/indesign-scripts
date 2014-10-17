exportSelectedImages();

function exportSelectedImages() {
    // configure export settings
    app.jpegExportPreferences.exportResolution = 300;
    app.jpegExportPreferences.jpegQuality = JPEGOptionsQuality.MAXIMUM;

    // collect selected objects
    var selected = app.activeDocument.selection;
    $.writeln("Got " + selected.length + " selected objects...");

    // process selected objects
    for (var i = 0; i < selected.length; i++) {
        var cursor = selected[i];
        var img = cursor.images;

        $.writeln("Processing #" + (i+1) + "/" + selected.length);
        $.writeln("\t Type: " + cursor.constructor.name);

        // verify if object contains an image or not
        if (cursor.images.length > 0) {     
            var img = cursor.images[0];
            $.writeln("\t Contains image of type " + img.imageTypeName);
            var imageFileName = cursor.images[0].itemLink.name;
            $.writeln("\t File Name: " + imageFileName);
        } else {
            $.writeln("\t Not an image");
        }

        // save the object to a jpeg in path specified below
        var myFile = new File('N:/temp/' + "crop_" + imageFileName + '.jpg');
        cursor.exportFile(ExportFormat.JPG, myFile);

     }

    $.writeln("Done.");
}