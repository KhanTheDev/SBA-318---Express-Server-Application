// Express application setup
const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Welcome to My Express App' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

app.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    res.render('user', { title: 'User Page', userName: userName });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// POST route for contact form
app.post('/contact', (req, res) => {
    console.log('Form submitted with data:', req.body);
    res.send('Thank you for contacting us! We will get back to you soon.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
