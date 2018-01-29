var fs = require('fs');
var formidable = require('formidable');


exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploader/";
    form.parse(request, function(error, fields, files) {

        var title = fields.title;
        var fileTitle;
        if (title == undefined || title.length == 0) {
            fileTitle = "text.png";
          } else {
            fileTitle = title + ".png";
          }

        console.log(fields.title);
        console.log(fileTitle);

        fs.renameSync(files.upload.path, fileTitle);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
};

exports.show = function(request, response) {
    fs.readFile(this.fileTitle, "binary", function(error, file) { //tutaj zamiast "text.png" chcę podać nową nazwę która mi się generuje ale wyrzuca błędem...
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
};

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
};

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
};
