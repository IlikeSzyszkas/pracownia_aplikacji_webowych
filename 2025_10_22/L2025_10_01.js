const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    res.type('text/plain; charset=utf-8');
    res.send('Strona Główna');
});

app.get('/json', (req, res) => {
    const json = {
        title: "Tajemniczy Ogród",
        author: "Frances Hodgson Burnett",
        year: 1911,
        genres: ["literatura dziecięca", "powieść przygodowa"],
        available: true,
        ratings: {
            average: 4.7,
            reviews: 1523
        }
    };
    res.type('application/json; charset=utf-8');
    res.json(json);
});

app.get('/inside_html', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <title>HTML z Node.js</title>
        </head>
        <body>
            <p>Kod html wygenerowany w node.js</p>
        </body>
        </html>
    `;
    res.type('text/html; charset=utf-8');
    res.send(html);
});

app.get('/outside_html', (req, res) => {
    fs.readFile('./index.html', 'utf8', (err, kod_html) => {
        if (err) {
            res.type('text/plain; charset=utf-8');
            res.send('Błąd odczytu pliku.');
        } else {
            res.type('text/html; charset=utf-8');
            res.send(kod_html);
        }
    });
});

app.listen(8080, () => {
    console.log(`Serwer działa na http://localhost:8080`);
});
