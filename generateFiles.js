const fs = require('fs');
const crypto = require('crypto');

const dataPath = 'C:/tmp/data';  // Use a valid path for Windows

// Create the data directory if it doesn't exist
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
}

for (let i = 1; i <= 30; i++) {
    const lines = [];
    for (let j = 0; j < 1000; j++) {  // Number of lines 
        const lineContent = crypto.randomBytes(100).toString('hex');
        lines.push(lineContent);
    }
    const content = lines.join('\n');
    fs.writeFileSync(`${dataPath}/${i}.txt`, content);
}

console.log('Random text files generated successfully.');
