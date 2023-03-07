const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const url = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(__dirname, 'public', url);
    const extname = path.extname(filePath);
    const contentType = getContentType(extname);
    if (extname === '.py') {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${filePath}: ${err}`);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.write('Internal server error');
          res.end();
        } else {
          const formattedData = formatCode(data);
          printSlowly(res, formattedData);
        }
      });
    } else {
      fs.readFile(filePath, (err, content) => {
        if (err) {
          console.error(`Error reading file ${filePath}: ${err}`);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.write('Internal server error');
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.write(content);
          res.end();
        }
      });
    }
  }
});

function getContentType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'application/octet-stream';
  }
}

function formatCode(code) {
  const formattedCode = code.replace(/^(.*)$/gm, '<span class="console-python">$1</span>');
  return ['Reading file...'].concat(formattedCode.split('\n'));
}

function printSlowly(res, messages) {
  let messageIndex = 0;
  let characterIndex = 0;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<pre>');
  const intervalId = setInterval(() => {
    res.write(`> ${messages[messageIndex][characterIndex]}`);
    characterIndex++;
    if (characterIndex === messages[messageIndex].length) {
      res.write('\n');
      messageIndex++;
      characterIndex = 0;
      if (messageIndex === messages.length) {
        clearInterval(intervalId);
        res.write('</pre>');
        res.end();
      }
    }
  }, 20);
}

server.listen(3000, () => {
  console.log('Server running on port 3000');
});