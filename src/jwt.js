import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const KEY = process.env.JWT_SECRET;

export const generateToken = (user) => {
    try{
    return jwt.sign({user}, KEY, {expiresIn: '20m'});
    } catch (error) {
        console.error(error);
    }
};

export const tokeClientvalidate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Prohibido el acceso' });
    }

    jwt.verify(token, KEY, (error, response) => {
        if (error) {
            return res.status(401).json({ error: 'Token inválido' });
        } else {
        next();
        }
    });
};