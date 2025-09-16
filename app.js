// Express application setup
const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Custom logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

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

app.get('/features', (req, res) => {
    res.render('features', { title: 'Features Demo' });
});

// POST route for contact form
app.post('/contact', (req, res) => {
    console.log('Form submitted with data:', req.body);
    res.send('Thank you for contacting us! We will get back to you soon.');
});

// Download route
app.get('/download', (req, res) => {
    const filePath = __dirname + '/public/downloads/sample.txt';
    res.download(filePath, 'sample-file.txt', (err) => {
        if (err) {
            console.error('Download error:', err);
            res.status(404).send('File not found');
        }
    });
});

// API route for getting current time
app.get('/api/time', (req, res) => {
    res.json({ 
        currentTime: new Date().toISOString(),
        message: 'Current server time'
    });
});

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).send('Page not found - 404 Error');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
