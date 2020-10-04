const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', function (_req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (_req, res) {
    console.log('route to note working');
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// ****************************************

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), (err, notes) => {
        if (err) throw err;
        res.json(JSON.parse(notes));
        console.log('api notes is working');
    })
});

app.post("/api/notes", function (req, res) {
    const requestData = req.body;
    console.log(requestData);
    const rawData = fs.readFileSync(path.join(__dirname, "./db/db.json"));
    console.log(rawData);
    res.json({});
    // fs.writeFileSync(path.join(__dirname, './db/db.json'));
    // const jsonData = JSON.parse(rawData);
    // console.log(jsonData);
});

// app.delete('/api/notes/', + 'id', function (req, res) {

// })

app.listen(3000, () => {
    console.log('Server started listening on PORT http://localhost:3000');
});

// syntax read and write file in post routes
