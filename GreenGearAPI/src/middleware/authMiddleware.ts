import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../service/jwtService';

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    try {
        const decodedToken = await verifyToken(token);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
