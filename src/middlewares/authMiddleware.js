const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

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