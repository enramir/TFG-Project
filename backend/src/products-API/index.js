const path = require("path");
var api = require(path.join(__dirname,"/v1"));

module.exports = (app, BASE_PATH, products, md_upload) => {
    api(app, BASE_PATH+"/v1", products, md_upload);
}