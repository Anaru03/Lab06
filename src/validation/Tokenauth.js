import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const KEY = process.env.JWT_HASH_SECRET;

export const generateToken = (user) => {
    try {
        return jwt.sign({ user }, KEY, { expiresIn: '20m' });
    } catch (error) {
        console.error(error);
    }
};

const tokenAuth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Prohibido el acceso' });
    }

    jwt.verify(token, KEY, (error, user) => {
        if (error) {
            return res.status(401).json({ error: 'Token inválido' });
        } else {
            req.user = user; 
            next();
        }
    });
};

export default tokenAuth;
