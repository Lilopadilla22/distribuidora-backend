const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No hay token. Acceso denegado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;
