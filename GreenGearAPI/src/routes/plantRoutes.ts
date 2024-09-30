import express from 'express';
import multer from 'multer';
import path from 'path';
import PlantController from '../controllers/PlantController';
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

router.put('/plants/:id', authenticateToken, PlantController.updatePlant);
router.delete('/plants/:id', authenticateToken, PlantController.deletePlant);
router.get('/plants/:id', authenticateToken, PlantController.getPlantById);
router.get('/plants/garden/:gardenId', authenticateToken, PlantController.getAllPlantsInGarden);
router.post('/plants', upload.single('image'), authenticateToken, PlantController.createPlant);


export default router;