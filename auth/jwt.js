const jwt = require('jsonwebtoken');
const sendErrorResponse = require('../utils/error');

const verifyToken = (req, res, next) => {
    const accessToken = req.headers['authorization'];
  
    if (!accessToken) {
      return sendErrorResponse(res, 401, "Access token is missing");
    }
  
    try {
      const tokenWithoutBearer = accessToken.replace("Bearer ", "");
  
      const decoded = jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET);
  
      req.studentData = decoded;
  
      next(); 
    } catch (error) {
      return sendErrorResponse(res, 403, "Invalid access token");
    }
  };
  

module.exports = verifyToken;
