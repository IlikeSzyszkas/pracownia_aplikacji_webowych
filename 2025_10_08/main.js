let http = require('http');
const fs = require("node:fs");
const url = require('url');
http.createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write('Strona Główna');
        res.end();
    }else if (req.url === '/json') {
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
    }else if (req.url === '/inside_html') {
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
    }else if (req.url === '/outside_html') {

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
    } else if (req.url.startsWith('/get_params')) {
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
    }


}).listen(8080);