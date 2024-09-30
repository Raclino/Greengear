import express from 'express';
import multer from 'multer';
import path from 'path';
import GardenController from '../controllers/GardenController';
import { authenticateToken } from '../middleware/authMiddleware';

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
router.get('/gardens', authenticateToken, GardenController.getAllGardens);
router.get('/gardens/:id', authenticateToken, GardenController.getGardenById);
router.post('/gardens', upload.single('image'), authenticateToken, GardenController.createGarden);
router.put('/gardens/:id', authenticateToken, GardenController.updateGarden);
router.delete('/gardens/:id', authenticateToken, GardenController.deleteGarden);
router.get('/gardens/:id/hub', authenticateToken, GardenController.getHubInGarden);
router.get('/gardens/:id/sensor', authenticateToken, GardenController.getSensorInGarden);

router.get('/gardens/users/', GardenController.getGardensByUserId);

export default router;
