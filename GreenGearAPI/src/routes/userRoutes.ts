import express from 'express';
import UserController from '../controllers/UserController';
import { authenticateToken } from '../middleware/authMiddleware';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
router.post('/users', upload.single('image'), UserController.createUser);
router.post('/login', UserController.login);
router.get('/users', authenticateToken, UserController.getAllUsers);
router.get('/users/:id',authenticateToken,  UserController.getUserById);
router.put('/users/:id',authenticateToken,  UserController.updateUser);
router.delete('/users/:id',authenticateToken,  UserController.deleteUser);

export default router;
