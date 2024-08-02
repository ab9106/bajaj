const express = require('express');
const app = express();
const port = 3000; // You can choose any available port

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to handle /bfhl requests
app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    // Validate input
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid input' });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

    // Determine the highest alphabet
    const highestAlphabet = alphabets.length > 0 
        ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] 
        : [];

    // Respond with the required format
    res.json({
        is_success: true,
        user_id: 'john_doe_17091999',
        email: 'john@xyz.com',
        roll_number: 'ABCD123',
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

// GET endpoint to handle /bfhl requests
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
