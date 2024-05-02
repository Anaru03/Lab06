import { validationResult } from 'express-validator';

const errorManagement = (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  } catch (error) {
    console.error('Error en el manejo de errores de validación:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default errorManagement;