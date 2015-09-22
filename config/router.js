var Index = require("../application/controllers/index.js");
module.exports = function(app) {
	app.get("/", Index.index);
}