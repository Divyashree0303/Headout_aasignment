
const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.get('/data', (req, res) => {
    const n = req.query.n;
    const m = req.query.m;

    if (n) {
        const filePath = `/tmp/data/${n}.txt`;

        if (m) {
            const lines = fs.readFileSync(filePath, 'utf8').split('\n');
            console.log(`Total lines in file: ${lines.length}, Requested line number: ${m}`);
            return res.send(lines[m - 1] || "Invalid line number");
        } else {
            const content = fs.readFileSync(filePath, 'utf8');
            return res.send(content);
        }
    } else {
        return res.send("File name (n) is required.");
    }
    
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});