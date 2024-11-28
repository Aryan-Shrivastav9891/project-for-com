const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/category');
const route = require('./routes/auth');
const authenticateToken = require('./middleware/authenticateToken');
const router = require('./routes/auth');
// const authenticateToken = require('./middleware/authenticateToken');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use("/auth" , router)
app.use("/auth" , authRoutes)
// app.use("/" , )


// Routes
// app.use('/auth', authRoutes);

// Protected API Example
app.get('/protected', authenticateToken, (req, res) => {
    console.log("we are hear");
    res.json({ message: 'Welcome to the protected route!', user: req.user });
});

const PORT = process.env.POR || 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
