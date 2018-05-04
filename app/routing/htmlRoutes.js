//Sets up a dependency on the "path" npm package so that html files can be rendered by the server
var path = require("path");

//Exports the various server functions so that they can be used in the "server.js" file
module.exports = function (app) {

    //Ensures that when a user enters the "/survey" url in their browser, the survey page is displayed
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    //If the user enters any other url besides "/survey", the home page is displayed by default
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};