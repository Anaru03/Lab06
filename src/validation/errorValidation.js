import { validationResult } from 'express-validator';

const errorManagement = (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      console.log("error",errors.array())
      return res.status(402).json({ errors: errors.array() });
    }

    next();
  } catch (error) {
    console.error('Error en el manejo de errores de validación:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default errorManagement;