const {tempPath} = require('./config.json');
const fs = require("fs");

async function waitUntilEmptySync() {
    while (true) {
        try {
            const data = fs.readFileSync(tempPath);
            const temp = data ? JSON.parse(data) : [];
            if (temp.length === 0) break;
        } catch (err) {
            console.error("Error 202:", err);
            break; 
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function write(name, args) {
    let command = { name, args };

    await waitUntilEmptySync();

    try {
        let temp = [];
        
        if (fs.existsSync(tempPath)) {
            const data = fs.readFileSync(tempPath);
            temp = data ? JSON.parse(data) : [];
        }
        
        temp.push(command);

        fs.writeFile(tempPath, JSON.stringify(temp), (err) => {
            if (err) throw err;
            console.log(`${JSON.stringify(command)} - Send to server`);
        });
    } catch (err) {
        console.error("Error 101:", err);
    }
}

module.exports = { write }