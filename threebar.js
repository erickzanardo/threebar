#!/usr/bin/env node
var fs = require("fs");
var path = require("path");

var write = process.stdout.write;
function userHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

var pattern = null;
var printers = {}

var ready = false;
var update = (printer, text) => {
  printers[printer] = text;
  if (ready) print();
};

var print = () => {
  var result = pattern;

  for(var i in printers) {
    result = result.replace("{" + i + "}", printers[i]);
  }
  process.stdout.write(result);
};

var basePath = path.join(userHome(), ".threebar");
var patternPath = path.join(basePath, ".pattern");
fs.readFile(patternPath, (err, data) => {
  if (err) throw console.error("Can't read the pattern file", err);
  pattern = data.toString();

  fs.readdir(basePath, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      var filePath = path.join(basePath, file);
      if (file.endsWith(".js")) {
        printers[file] = "";
        var printer = require(filePath);
        if(typeof(printer) != "function") {
          printers[file] = "Error";
        } else {
          printer(update);
        }
      }
    });
    print();
    ready = true;
  });
});

process.stdin.resume();
