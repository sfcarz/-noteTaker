const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ***** HTML *****
app.get('/', function (_req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (_req, res) {
    // console.log('route to note working');
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// ****** API *******

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), (err, notes) => {
        if (err) throw err;
        res.json(JSON.parse(notes));
        // console.log('api notes is working');
    })
});

app.post('/api/notes', (req, res) => {
    const requestData = req.body;
    const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")));

    rawData.push(requestData);

    const strings = JSON.stringify(rawData);

    fs.writeFile('./db/db.json', strings, (err) => {
        if (err) throw err;
    });

    res.send(strings);
});


// app.delete('/api/notes/', + 'id', function (req, res) {

// })

app.listen(3000, () => {
    console.log('Server started listening on PORT http://localhost:3000');
});

// syntax read and write file in post routes
