const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 7000;

// Middleware for parsing JSON data
app.use(bodyParser.json());



// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rci@12345',
    database: 'adm'
});

// Connect to MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        process.exit(1); // Terminate the application if connection fails
    }
    console.log('Connected to the MySQL server.');
});

// Route for fetching attendance report
app.get('/attendance', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specified HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    console.log(req.query);
    const { ID, fromdate, todate } = req.query;
    const query = `
        SELECT *
        FROM attendance
        WHERE ID = ? AND date BETWEEN ? AND ?
    `;
    connection.query(query, [ID, fromdate, todate], (error, results) => {
        if (error) {
            console.error('Error fetching attendance:', error);
            res.status(500).send('Error fetching attendance');
        } else {
           // console.log(results);
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



