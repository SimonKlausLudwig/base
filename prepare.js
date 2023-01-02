var glob = require("glob")

// options is optional
glob("./**/loesung.*", {}, function (er, files) {
  console.log(files);
})