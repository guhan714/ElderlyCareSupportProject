const fs = require('fs');
const path = require('path');

function serveFile(req, res) {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const filename = path.join(__dirname, pathname);

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Not Found');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}

module.exports = serveFile;
