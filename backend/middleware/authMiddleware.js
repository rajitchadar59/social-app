const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization; // Frontend se 'token' bhejenge
    
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData; // Token se user info nikal kar request mein daal di
    
    next(); // Agle step (Controller) par jao
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;