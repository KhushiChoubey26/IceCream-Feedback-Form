const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('website.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icecreamtype TEXT NOT NULL,
        rating INTEGER NOT NULL,
        feedback TEXT NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
});

db.close((err) => {
    if (err) {
        console.error('Could not close database connection', err);
    } else {
        console.log('Closed database connection');
    }
});
