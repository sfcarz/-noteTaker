const express = require("express");
const path = require("path");
const fs = require("fs");
const id = require('uniqid');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ***** HTML *****
app.get('*', function (_req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (_req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// ****** API *******

app.get("/api/notes", (_req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), (err, notes) => {
        if (err) throw err;
        res.json(JSON.parse(notes));
    })
});

app.post('/api/notes', (_req, res) => {
    const requestData = req.body;
    const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")));
    requestData.id = id();

    rawData.push(requestData);
    const strings = JSON.stringify(rawData);
    fs.writeFile('./db/db.json', strings, (err) => {
        if (err) throw err;
    });
    res.send(strings);
});


app.delete('/api/notes/:id', function (req, res) {
    const noteId = req.params.id;
    const allNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")));

    const filter = allNotes.filter((note) => note.id !== noteId);
    const filtered = JSON.stringify(filter);
    fs.writeFile('./db/db.json', filtered, (e) => {
        if (e) throw e;
    });

    res.send(filtered)

})

app.listen(PORT, () => {
    console.log('Server started listening on PORT http://localhost:3001');
});

// syntax read and write file in post routes
