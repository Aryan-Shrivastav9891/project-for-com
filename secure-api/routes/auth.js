const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();
const {execute} = require("../db")
const tb = require("../constant")

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const newPass =await bcrypt.compare(password , "$2b$10$5uQVxRpMiM6OLWoPVP63VeYX8uTYOQzHaxdjtqQufqaXPSF.fYaO.")
    const hpass = await bcrypt.hash(password , 10 )
    // console.log(hpass)

    

    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

    try {
        const user = await execute( `SELECT * FROM users WHERE email = '${email}'`);
        
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user[0].id, email: user[0].email }, "anyKey", {
            expiresIn: '1h',
        });
        console.log("this is my token" , token)

        res.json({ token });
    } catch (err) {
        console.log("err : " , err)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
