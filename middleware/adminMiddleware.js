
const jwt = require('jsonwebtoken');

module.exports.adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ msg: "not authorized admin" }); 
    } else {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!verifyToken) {
        return res.status(403).json({ msg: 'you are not authorized as token' }); 
      } else {
        if (verifyToken.role === "admin") {
          req.body.userId = verifyToken.id; 
          next();
        } else {
          return res.status(403).json({ msg: "you are not authorized as role" }); 
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: 'something went wrong in adminMiddleware', error: error.message });
  }
};
