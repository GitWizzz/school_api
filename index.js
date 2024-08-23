const express = require('express');
const connectDB = require('./config/db'); // Import the database connection
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); // Connect to MongoDB

app.use(express.json()); // Middleware to parse JSON

// Use the school routes
app.use('/api', schoolRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
