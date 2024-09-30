import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { generateToken, verifyToken } from '../service/jwtService';
import * as util from 'util';


async function authenticateAndGenerateToken(user: User) {
    const token = generateToken(user.id);
    return { token, userId: user.id };
}
interface AuthenticatedRequest extends Request {
    userId?: number;
}
class UserController {
    async getAllUsers(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId;
            const userRepository = getRepository(User);
            const decodedToken = await userRepository.findOne({ where: { id: userId }});
            if (decodedToken?.role == "admin"){
                const users = await userRepository.find({
                    select: ["id", "username", "first_name", "last_name", "email", "imagePath", "role", "created_at", "updated_at"]
                }); 
                res.json(users);
            }
            else {
                res.json(decodedToken)
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUserById(req: Request, res: Response) {
        const userId = parseInt(req.params.id, 10);
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId },select: ["id", "username", "first_name", "last_name", "email", "imagePath", "role", "created_at", "updated_at"] });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createUser(req: Request, res: Response) {
        var path = ''
        if (req.file) {
            path = req.file.path;
        }
        else{
            path = "public/default_user.png"
        }
        try {
            const userRepository = getRepository(User);
            const userData = {
                username : req.body.username,
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                email : req.body.email,
                password : req.body.password,
                role : "user",
                imagePath : path
            }
            const newUser = userRepository.create(userData);
            const result = await userRepository.save(newUser);
            const loginResponse = await authenticateAndGenerateToken(newUser);
            res.status(201).json(loginResponse);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id, 10);

        try {
            const userRepository = getRepository(User);
            const userToUpdate = await userRepository.findOne({ where: { id: userId } });

            if (!userToUpdate) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            userRepository.merge(userToUpdate, req.body);
            const result = await userRepository.save(userToUpdate);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id, 10);

        try {
            const userRepository = getRepository(User);
            const userToDelete = await userRepository.findOne({ where: { id: userId } });

            if (!userToDelete) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            await userRepository.remove(userToDelete);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async login(req: Request, res: Response) {
        try {
          const { username, password } = req.body;

          const userRepository = getRepository(User);
          const user = await userRepository.findOne({ where: { username, password } });
    
          if (user) {
            const loginResponse = await authenticateAndGenerateToken(user);
            res.json(loginResponse);
          } else {
            res.status(401).json({ error: 'Invalid username or password' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}

export default new UserController();

