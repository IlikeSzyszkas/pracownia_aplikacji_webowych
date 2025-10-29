const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'o-nas.html'));
});

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'oferta.html'));
});

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'kontakt.html'));
});

app.post('/kontakt', (req, res) => {
    console.log('Dane z formularza:');
    console.log(`Imię: ${req.body.imie}`);
    console.log(`Nazwisko: ${req.body.nazwisko}`);
    console.log(`Email: ${req.body.email}`);
    console.log(`Wiadomość: ${req.body.wiadomosc}`);
    res.redirect('/');
});

app.listen(8080, () => {
    console.log(`Serwer działa na http://localhost:8080`);
});
