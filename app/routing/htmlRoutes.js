var path = require("path");

module.exports = function(app) {
	//link to survey
	app.get("/survey", function(req, res){
		res.sendFile(path.join(__dirname, "../public/survey.html"))
	});

	//wildcard to send everything else home
	app.get("*", function(req, res) {
    	res.sendFile(path.join(__dirname, "../public/home.html"));
  	});
};
