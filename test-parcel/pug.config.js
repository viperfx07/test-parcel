const fs = require('fs');
const foldero = require("foldero");
const pugIncludeGlob = require("pug-incldude-glob");

// console.log(pugIncludeGlob);

let siteData = {};
const dataPath = "./src/data/";
if (fs.existsSync(dataPath)) {
  // Convert directory to JS Object
  siteData = foldero(dataPath, {
    recurse: true,
    whitelist: "(.*/)*.+.(json|ya?ml)$",
    loader: function loadAsString(file) {
      let json = {};
      try {
        json = JSON.parse(fs.readFileSync(file, "utf8"));
      } catch (e) {
        console.log("Error Parsing JSON file: " + file);
        console.log("==== Details Below ====");
        console.log(e);
      }
      return json;
    }
  }
}

module.exports = {
  locals: {
    hello: "worlddyg",
    site: {
      data: siteData
    }
  },
  plugins: [pugIncludeGlob({})]
}
