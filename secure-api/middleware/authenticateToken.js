const jwt = require('jsonwebtoken');
require('dotenv').config();


console.log(process.env.JWT_SECRET)
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    console.log(process.env.JWT_SECRET , token ,  "This is token")
    // const tokens = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBjb2Rlc2ZvcnRvbW9ycm93LmNvbSIsImlhdCI6MTczMjc2OTc2NCwiZXhwIjoxNzMyNzczMzY0fQ.wrluPFIS-WMID2_agSY20io_jwZKGXdbD893Tz2osGE"
    jwt.verify(token, "anyKey", (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
