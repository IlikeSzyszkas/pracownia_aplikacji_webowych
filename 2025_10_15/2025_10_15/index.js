let http = require('http');
const fs = require("node:fs");
const url = require('url');
const path = require('path');
const mime = require('mime-types');

http.createServer(function (req, res) {

    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

            res.write('Strona Główna');

            res.end();
            break;
        case '/json':
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

            }

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

            res.write(JSON.stringify(json));

            res.end();
            break;
        case '/inside_html':
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
            break;
        case '/outside_html':
            fs.readFile('./index.html', 'utf8', function (err, kod_html) {

                if (err) {

                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

                    res.write('Błąd odczytu pliku.');

                    res.end();

                }else {

                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

                    res.write(kod_html);

                    res.end();

                }

            })
            break;
        case '/get_params':
            const parsedUrl = url.parse(req.url, true);

            const query = parsedUrl.query;

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
            break;
        default:
            const filePath = path.join(__dirname, 'assets', decodeURIComponent(req.url));
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ error: "Plik nie został znaleziony", code: 404 }));
                } else {
                    const mimeType = mime.lookup(filePath) || 'application/octet-stream';
                    res.writeHead(200, { 'Content-Type': mimeType });
                    res.end(data);
                }
            });
            break;
    }
}).listen(8080);