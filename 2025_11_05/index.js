const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'static')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact'
});

db.connect(err => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
        return;
    }
    console.log('Połączono z bazą danych.');
});

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

app.get('/api/contact-messages', (req, res) => {
    db.query('SELECT * FROM messages', [], (err, result) => {
        if (err) {
            res.json(err);
            return;
        }
        res.json(result);
    })
});

app.get('/api/contact-messages/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM messages where id=?', [id], (err, results) => {
        if (err) {
            res.json(err);
            return;
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Nie znaleziono wiadomości o podanym ID' });
        }
        res.json(results[0]);
    })
});

app.post('/kontakt', (req, res) => {
    const { imie, nazwisko, email, wiadomosc } = req.body;

    const sql = 'INSERT INTO messages (name, surname, email, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [imie, nazwisko, email, wiadomosc], (err, result) => {
        if (err) {
            console.error('Błąd przy zapisie wiadomości:', err);
            return res.status(500).send('Błąd serwera');
        }
        console.log('Zapisano, id:', result.insertId);
    });

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
