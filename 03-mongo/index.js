const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const PORT = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.json());

// Register routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);

// Root route to check if the server is running
app.use('/', (req, res) => {
    res.status(200).send({ msg: 'Server running successfully' });
});

// Catch undefined routes (404 handler)
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown for releasing the port
const gracefulShutdown = () => {
    console.log('Shutting down server gracefully...');
    server.close(() => {
        console.log('Closed out remaining connections.');
        process.exit(0);
    });

    // Force close the server after 10 seconds
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down.');
        process.exit(1);
    }, 10000);
};

// Handle process termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);  // This handles Ctrl+C
