import express from 'express';
import SensorController from '../controllers/SensorController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.put('/sensors/:id', authenticateToken, SensorController.updateSensor);
router.delete('/sensors/:id', authenticateToken, SensorController.deleteSensor);
router.get('/sensors/:id', authenticateToken, SensorController.getSensorById);
router.get('/sensors/hub/:hub_id', authenticateToken, SensorController.getAllSensorsInHub);
router.post('/sensors', authenticateToken, SensorController.createSensor);
router.post('/connect-sensor-to-hub', SensorController.connectSensorToHub);
router.post('/sensorData', SensorController.createSensorData);
router.get('/sensors/:id/data', SensorController.getSensorDataBySensorId);


export default router;