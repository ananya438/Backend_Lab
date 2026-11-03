const https = require("https");
const fs = require("fs");

const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};

const server = https.createServer(options, (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from HTTPS Server");
});

server.listen(3443, () => {
    console.log("HTTPS Server running at https://localhost:3443");
});