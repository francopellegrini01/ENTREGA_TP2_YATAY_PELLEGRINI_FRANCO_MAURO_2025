import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/configuration.js';

export const validateTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.json({
      status: 401,
      OK: false,
      message: 'No se proporciono un token de autorizacion',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, CONFIG.SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    res.json({
      status: 401,
      OK: false,
      message: 'Token invalido o expirado',
    });
    return;
  }
};
