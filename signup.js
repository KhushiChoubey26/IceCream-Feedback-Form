const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('feedback.db');

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    stmt.run(username, hashedPassword, function(err) {
        if (err) {
            return res.status(500).send('Database error: ' + err.message);
        }
        res.redirect('/login');
    });
    stmt.finalize();
});

module.exports = router;
