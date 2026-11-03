const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/html") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Backend Development</h1><p>HTTP Server using Node.js</p>");

    } else if (req.url === "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });

        const data = {
            course: "Backend Development",
            topic: "HTTP Server"
        };

        res.end(JSON.stringify(data));

    } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Node.js HTTP Server");
    }
});

server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});