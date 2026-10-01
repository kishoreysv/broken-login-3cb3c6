const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT || 4173);
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
};

const server = http.createServer((request, response) => {
    const requestPath = request.url === '/' ? '/index.html' : request.url;
    const safePath = path.normalize(requestPath).replace(/^([.][.][\/\\])+/, '');
    const filePath = path.join(__dirname, safePath);

    fs.readFile(filePath, (error, content) => {
        if (error) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end('Not found');
            return;
        }

        const ext = path.extname(filePath);
        response.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        response.end(content);
    });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Static server running at http://127.0.0.1:${PORT}`);
});
