// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Store bees data in memory for simplicity
let bees = [];

// Function to simulate bee working with a random duration between 30s to 1min
function workBee(bee) {
    const workDuration = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000; // Random duration between 30s to 1min
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ ...bee, status: 'Worked for ' + workDuration + 'ms' });
        }, workDuration);
    });
}

// Endpoint to receive bees data
app.post('/bees', async (req, res) => {
    const newBees = req.body;
    try {
        const workedBees = [];
        for (const bee of newBees) {
            const workedBee = await workBee(bee);
            workedBees.push(workedBee);
        }
        bees = bees.concat(workedBees);
        res.status(201).json({ message: 'Bees received and worked successfully' });
    } catch (error) {
        console.error('Error while processing bees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to get all bees
app.get('/bees', (req, res) => {
    res.json(bees);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
