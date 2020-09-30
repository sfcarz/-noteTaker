const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

app.get('/api/notes', function (req, res) {
    const rawData = fs.readFileSync('model/db.json');
    res.send(JSON.parse(rawData));
});

app.post('/api/notes', function (req, res) {
    const requestData = req.data;
    console.log(requestData);
    const rawData = fs.readFileSync('model/db.json');
    const jsonData = JSON.parse(rawData);
    console.log(rawData, jsonData);
});

// app.delete('/api/notes/:id', function (req, res) {
    
// })





app.listen(PORT, function () {
    console.log('Im listening');
})
