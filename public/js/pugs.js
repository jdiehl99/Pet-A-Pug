const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Get list of pugs from db and send to handlebars index page
app.get("/", function (req, res) {
    connection.query("SELECT * FROM petPug;", function (err, data) {
        if (err) { throw err; }

        res.render("index", { pugs: data });
    });
});


// Create a new todo
app.post("/pugs/new", function (req, res) {
    // pick a random number from 1-20 to associate with image
    var imgNum = Math.floor(Math.random() * 20) + 1;
    var pug = req.body.pug;
    connection.query('INSERT INTO petPug (pugName,didpet,imgID) VALUES ("' + pug + '","0","' + imgNum + '")', function (err, result) {
        if (err) { throw err; }

        // Send back the ID of the new todo
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
    });
});