const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 8000;
const FILE = "tasks.json";

/* Create file if not exists */
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
}

/* Read tasks */
function readTasks() {
    return JSON.parse(fs.readFileSync(FILE));
}

/* Save tasks */
function saveTasks(tasks) {
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // HOME
    if (path === "/" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
        <h2>Node.js To-Do App</h2>
        <form action="/
