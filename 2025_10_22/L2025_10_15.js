const express = require('express');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const app = express();

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.write('Strona Główna');
    res.end();
});

app.get('/json', (req, res) => {
    const json = {
        "title": "Tajemniczy Ogród",
        "author": "Frances Hodgson Burnett",
        "year": 1911,
        "genres": ["literatura dziecięca", "powieść przygodowa"],
        "available": true,
        "ratings": {
            "average": 4.7,
            "reviews": 1523
        }
    };
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.write(JSON.stringify(json));
    res.end();
});

app.get('/inside_html', (req, res) => {
    const html = "" +
        "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        "<meta charset='UTF-8'>" +
        "</head>" +
        "<body>" +
        "<p>Kod html wygenerowany w node.js</p>" +
        "</body>" +
        "</html>";
    res.end(html);
});

app.get('/outside_html', (req, res) => {
    fs.readFile('./index.html', 'utf8', function (err, kod_html) {
        if (err) {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.write('Błąd odczytu pliku.');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(kod_html);
            res.end();
        }
    });
});

app.get('/get_params', (req, res) => {
    const query = req.query;
    const queryArr = Object.entries(query);

    console.log("Otrzymane parametry:", queryArr);

    const timestamp = Date.now();
    const filename = `params_${timestamp}.json`;

    fs.writeFile(filename, JSON.stringify(queryArr, null, 2), (err) => {
        if (err) {
            console.error('Błąd zapisu pliku:', err);
        } else {
            console.log(`Zapisano dane do pliku ${filename}`);
        }
    });

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.write(JSON.stringify({ ok: 'ok' }));
    res.end();
});

app.use((req, res) => {
    const filePath = path.join(__dirname, 'assets', decodeURIComponent(req.path));
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).json({ error: "Plik nie został znaleziony", code: 404 });
        } else {
            const mimeType = mime.lookup(filePath) || 'application/octet-stream';
            res.type(mimeType);
            res.send(data);
        }
    });
});

app.listen(8080, () => {
    console.log(`Serwer działa na http://localhost:8080`);
});
