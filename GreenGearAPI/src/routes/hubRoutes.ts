import express from 'express';
import HubController from '../controllers/HubController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/hub', authenticateToken, HubController.createHub);
router.get('/hub/all', authenticateToken, HubController.getAllHubsForUser);
router.get('/hub/:id', authenticateToken, HubController.getHubById);
router.put('/hub/link-garden', authenticateToken, HubController.linkHubToGarden);
router.put('/hub/:id', authenticateToken, HubController.updateHub);
router.delete('/hub/:id', authenticateToken, HubController.deleteHub);
router.get('/hub/:id/sensors', authenticateToken, HubController.getHubSensors);
router.get('/hub/:id/gardens', authenticateToken, HubController.getHubGardens);

export default router;