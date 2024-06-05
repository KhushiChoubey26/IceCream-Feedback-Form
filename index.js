const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Open the database connection
const db = new sqlite3.Database('website.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// GET handler for the default route
app.get('/', (req, res) => {
    res.render('index', { title: 'Ice Cream Feedback Form', user: req.session.user });
});

// GET handler for the signup page
app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Create an Account' });
});

// POST handler for creating a new account
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
            return res.status(500).render('error', { title: 'Error', message: 'Database error', error: err });
        }
        req.session.user = { id: this.lastID, username: username };
        res.redirect('/');
    });
});

// POST handler for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err) {
            return res.status(500).render('error', { title: 'Error', message: 'Database error', error: err });
        }
        if (row && await bcrypt.compare(password, row.password)) {
            req.session.user = row;
            res.redirect('/');
        } else {
            const error = new Error('Invalid username or password');
            error.status = 401;
            res.status(401).render('error', { title: 'Error', message: error.message, error: error });
        }
    });
});

// POST handler for the form submission with validation
app.post('/feedback', (req, res) => {
    if (!req.session.user) {
        const error = new Error('You must be logged in to submit feedback');
        error.status = 401;
        return res.status(401).render('error', { title: 'Error', message: error.message, error: error });
    }

    const { name, icecreamtype, rating, feedback } = req.body;

    // Check if all required fields exist
    if (!name || !icecreamtype || !rating) {
        const error = new Error('All fields are required');
        error.status = 400;
        return res.status(400).render('error', { title: 'Error', message: error.message, error: error });
    }

    const ratingValue = parseInt(rating, 10);
    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
        const error = new Error('Invalid rating value');
        error.status = 400;
        return res.status(400).render('error', { title: 'Error', message: error.message, error: error });
    }

    const stmt = db.prepare("INSERT INTO feedback (name, icecreamtype, rating, feedback, user_id) VALUES (?, ?, ?, ?, ?)");
    stmt.run(name, icecreamtype, rating, feedback, req.session.user.id, function(err) {
        if (err) {
            console.error('Database insert error: ', err.message);
            return res.status(500).render('error', { title: 'Error', message: 'Database error', error: err });
        }
        res.render('thankyou', {
            title: 'Thank You!',
            name: name,
            flavor: icecreamtype,
            rating: ratingValue,
            feedback: feedback
        });
    });
    stmt.finalize();
});

// GET handler to retrieve feedback from the database
app.get('/feedback', (req, res) => {
    db.all("SELECT * FROM feedback", (err, rows) => {
        if (err) {
            return res.status(500).render('error', { title: 'Error', message: 'Database error', error: err });
        }
        res.render('feedback', { title: 'Feedback List', feedbackList: rows });
    });
});

// POST handler for searching feedback by ice cream type
app.post('/search', (req, res) => {
    const searchType = req.body.icecreamtype;
    const query = `SELECT * FROM feedback WHERE icecreamtype LIKE ?`;

    db.all(query, [`%${searchType}%`], (err, rows) => {
        if (err) {
            console.error('Database query error: ', err.message);
            return res.status(500).render('error', { title: 'Error', message: 'Database error', error: err });
        }

        res.render('search', { title: 'Search Results', searchTerm: searchType, rows: rows });
    });
});

// GET handler for the documentation page
app.get('/doc', (req, res) => {
    res.render('doc', { title: 'Secure Authentication with bcrypt' });
});

// 404 handler
app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    res.status(404).render('error', { title: 'Page Not Found', message: error.message, error: error });
});

// 500 handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const error = new Error('Internal Server Error');
    error.status = 500;
    res.status(500).render('error', { title: 'Internal Server Error', message: error.message, error: err });
});

// Start the server
app.listen(port, () => {
    console.log(`Web server running at: http://localhost:${port}`);
    console.log(`Type Ctrl+C to shut down the web server`);
});
