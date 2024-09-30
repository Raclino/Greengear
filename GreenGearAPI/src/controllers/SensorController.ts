// Create a template for this controller

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Sensor } from '../models/Sensor';
import { Garden } from '../models/Garden';
import { Hub } from '../models';
import { SensorData } from '../models/SensorData';

class SensorController {
    async getAllSensorsInHub(req: Request, res: Response) {
        try {
            const hubId = parseInt(req.params.hub_id, 10);
            const sensorRepository = getRepository(Sensor);
            const sensors = await sensorRepository.find({ where: { hub: { id: hubId } } });
            res.json(sensors);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getSensorById(req: Request, res: Response) {
        const sensorId = parseInt(req.params.id, 10);

        try {
            const sensorRepository = getRepository(Sensor);
            const sensor = await sensorRepository.findOne({ where: { id: sensorId } });

            if (!sensor) {
                res.status(404).json({ error: 'Sensor not found' });
            } else {
                res.json(sensor);
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createSensor(req: Request, res: Response) {
        try {

            const sensorRepository = getRepository(Sensor);
            const newSensor = sensorRepository.create([{
                sensor_name: req.body.sensor_name,
                sensor_type: req.body.sensor_type,
                sensor_token: req.body.sensor_token
            }]);
    
            const result = await sensorRepository.save(newSensor);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async connectSensorToHub(req: Request, res: Response) {
        try {
            const sensorToken = req.body.sensor_token;
            const hubToken = req.body.hub_token;

            const hubRepository = getRepository(Hub);
            const hub = await hubRepository.findOne({ where: { hub_token: hubToken } });
            if (!hub) {
                return res.status(404).json({ error: 'Hub not found' });
            }
    
            const sensorRepository = getRepository(Sensor);
            const sensor = await sensorRepository.findOne({ where: { sensor_token: sensorToken } });
    
            if (!sensor) {
                return res.status(404).json({ error: 'Sensor not found' });
            }
    
            sensor.hub = hub;
            await sensorRepository.save(sensor);
    
            res.status(200).json({ message: 'Sensor successfully connected to Hub' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateSensor(req: Request, res: Response) {
        try {
            const sensorId = parseInt(req.params.id, 10);
            const sensorRepository = getRepository(Sensor);
            const sensor = await sensorRepository.findOne({ where : {id: sensorId }});
    
            if (!sensor) {
                res.status(404).json({ error: 'Sensor not found' });
                return;
            }
    
            const newHubId = parseInt(req.body.hubId, 10);
            if (!newHubId || isNaN(newHubId)) {
                res.status(400).json({ error: 'Invalid garden ID' });
                return;
            }
    
            const hub = await getRepository(Hub).findOne({ where: { id: newHubId }  });
            if (!hub) {
                res.status(404).json({ error: 'Hub not found' });
                return;
            }
            
            sensor.hub = hub;
            const result = await sensorRepository.save(sensor);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteSensor(req: Request, res: Response) {
        const sensorId = parseInt(req.params.id, 10);

        try {
            const sensorRepository = getRepository(Sensor);
            const sensorToDelete = await sensorRepository.findOne({ where: { id: sensorId } });

            if (!sensorToDelete) {
                res.status(404).json({ error: 'Sensor not found' });
                return;
            }

            await sensorRepository.remove(sensorToDelete);
            res.json({ message: 'Sensor deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }   

    async createSensorData(req: Request, res: Response) {
        try {
            const { data_type, unity, data, sensor_token } = req.body;
    
            const sensorDataRepository = getRepository(SensorData);
    
            const sensorRepository = getRepository(Sensor);
            const sensor = await sensorRepository.findOne({ where: { sensor_token: sensor_token } });
    
            if (!sensor) {
                return res.status(404).json({ error: 'Sensor not found' });
            }
    
            const newSensorData = sensorDataRepository.create({
                data_type,
                unity,
                data,
                sensor
            });
    
            const result = await sensorDataRepository.save(newSensorData);
            
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getSensorDataBySensorId(req: Request, res: Response) {
        try {
            const sensorId = parseInt(req.params.id, 10);
    
            const sensorDataRepository = getRepository(SensorData);
            const sensorData = await sensorDataRepository.find({
                where: { sensor: { id: sensorId } },
                order: { date: 'DESC' },
                take: 100
            });
    
            res.json(sensorData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new SensorController();
