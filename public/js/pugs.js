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
        console.log("pugs new");
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
        console.log("pugs done");
        var pugID = req.body.id;
        console.log("pugID", pugID);
        var querySend = 'UPDATE petPug set didpet = "1" where id = "' + pugID + '";';
        console.log("query",querySend);
        connection.query(querySend, function (err, data) {
            console.log("data from pet pug mysql",data);
            if (err) { throw err; }
            res.redirect("/");
        });
    });

}
module.exports = showPage;