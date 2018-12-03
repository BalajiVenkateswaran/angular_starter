function getConfig() {
  var config = require("./gulp-config.js");
  config.url = config.url.replace("{{version}}", config.version);
  return config;
}

var fs = require("fs"),
  config = getConfig(),
  gulp = require("gulp"),
  unzip = require("unzip"),
  clean = require("gulp-clean"),
  download = require("download");

gulp.task("default", function (done) {
  var zipFile = config.temp + "/archive.zip";

  function fileExists(file, exists, doesNotExist) {
    return fs.access(file, fs.constants.F_OK, function (error) {
      return error ? doesNotExist() : exists();
    });
  }

  function processZipFile() {
    fs.createReadStream(zipFile).pipe(unzip.Extract({
      path: config.dest
    })).on("close", function () {
      console.log("Unzip complete!");
      done();
    });
  }

  function downloadSuccess () {
    console.log("download complete!");
    processZipFile();
  }

  function downloadError(msg) {
    console.log("download failed!", msg);
  }

  function downloadZipFile() {
    download(config.url, config.temp).then(downloadSuccess, downloadError);
  }

  fileExists(zipFile, processZipFile, downloadZipFile);
});

gulp.task("clean", function (done) {
  var src = [config.temp, config.dest],
    options = {read: false, allowEmpty: true};
  return gulp.src(src, options).pipe(clean());
});
