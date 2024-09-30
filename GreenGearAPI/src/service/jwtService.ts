import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
};

export const verifyToken = (token: string): Promise<{ userId: number }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as { userId: number });
      }
    });
  });
};
