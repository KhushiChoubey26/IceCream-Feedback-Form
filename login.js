const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('feedback.db');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
        if (err) {
            return res.status(500).send('Database error: ' + err.message);
        }
        if (!row || !(await bcrypt.compare(password, row.password))) {
            return res.status(401).send('Invalid username or password');
        }
        req.session.user = row;
        res.redirect('/');
    });
});

module.exports = router;

