const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

const app = express();
var connection = require("./../../config/connection.js");

function showPage(app, __dirname) {

    // Get list of pugs from db and send to handlebars index page
    app.get("/", function (req, res) {
        connection.query("SELECT * FROM petPug;", function (err, data) {
            if (err) { throw err; }
            res.render("index", { pugs: data });
        });
    });


    // Add a new pug to the list
    app.post("/pugs/new", function (req, res) {
        // pick a random number from 1-20 to associate with image
        var imgNum = Math.floor(Math.random() * 20) + 1;
        var pug = req.body.pug;
        connection.query('INSERT INTO petPug (pugName,didpet,imgID) VALUES ("' + pug + '","0","' + imgNum + '")', function (err, result) {
            if (err) { throw err; }
            res.redirect("/");
        });
    });

    
    // Walk the pug
    app.post("/pugs/done", function (req, res) {
        var pugID = req.body.id;
        var querySend = 'UPDATE petPug set didpet = "1" where id = "' + pugID + '";';
        connection.query(querySend, function (err, data) {
            if (err) { throw err; }
            res.redirect("/");
        });
    });

    // Clear out the list of all pugs
    app.get("/pugs/clear", function (req, res) {
        connection.query('DELETE FROM petPug;', function (err, data) {
            if (err) { throw err; }
            res.redirect("/");
        });
    });

}
module.exports = showPage;