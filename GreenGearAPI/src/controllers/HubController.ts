import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Sensor } from '../models/Sensor';
import { Garden } from '../models/Garden';
import { User } from '../models/User';
import { Hub } from '../models';
import { exit } from 'process';
import { verifyToken } from '../service/jwtService';
import { randomBytes } from 'crypto';

interface AuthenticatedRequest extends Request {
    userId?: number;
}
class HubController {
    async createHub(req: Request, res: Response) {
        const userRepository = getRepository(User);
        const currentUser = await userRepository.findOne({ where: { id: req.userId }})
    
        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(403).json({ error: "Unauthorized or user not found" });
        }
    
        const { hub_name, hub_version } = req.body;

        const hub_token = randomBytes(16).toString('hex');
    
        const hubRepository = getRepository(Hub);
    
        const hub = hubRepository.create({ hub_name, hub_version, hub_token });
    
        await hubRepository.save(hub);
    
        return res.status(201).json(hub);
    }

    async getAllHubsForUser(req: Request, res: Response) {
        const userId = req.userId;

        const hubRepository = getRepository(Hub);
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } })
        
        let hubs = await hubRepository.find({ where: { user: { id: userId }}});

        if (user?.role === "admin"){
            hubs = await hubRepository.find();
        }
        if (!hubs) {
            return res.status(404).json({ message: 'Hubs not found' });
        }

        return res.status(200).json(hubs);
    }

    async getHubById(req: Request, res: Response) {
        const userId = req.userId;
        const { id } = req.params;
        const hubRepository = getRepository(Hub);
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } })

        let hub = await hubRepository.findOne({ where: { id: parseInt(id, 10), user: { id: userId } } });

        if (user?.role === "admin"){
            hub = await hubRepository.findOne({ where: { id: parseInt(id, 10) } });
        }
        if (!hub) {
            return res.status(404).json({ message: 'Hub not found' });
        }
        return res.status(200).json(hub);
    }

    async updateHub(req: Request, res: Response) {
        const userId = req.userId;
        const { id } = req.params;
        const { hub_name, hub_version, hub_token } = req.body;
        
        const hubRepository = getRepository(Hub);
        const hub = await hubRepository.findOne({ where: { id: parseInt(id, 10), user: { id: userId } } });

        if (!hub) {
            return res.status(404).json({ message: 'Hub not found' });
        }

        hub.hub_name = hub_name;
        hub.hub_version = hub_version;
        hub.hub_token = hub_token;
        await hubRepository.save(hub);

        return res.status(200).json(hub);
    }

    async deleteHub(req: Request, res: Response) {
        const userId = req.userId;
        const { id } = req.params;
        const hubRepository = getRepository(Hub);

        const hub = await hubRepository.findOne({ where: { id: parseInt(id, 10), user: { id: userId } } });

        if (!hub) {
            return res.status(404).json({ message: 'Hub not found' });
        }

        await hubRepository.remove(hub);
        return res.status(200).json({ message: 'Hub deleted successfully' });
    }

    async linkHubToGarden(req: Request, res: Response) {
        const { hub_token, garden_id } = req.body;
        const userRepository = getRepository(User);
        const currentUser = await userRepository.findOne({ where: { id: req.userId }})

        if (!currentUser) {
            return res.status(403).json({ message: "Unauthorized or user not found" });
        }

        const hubRepository = getRepository(Hub);
        const gardenRepository = getRepository(Garden);
        const hub = await hubRepository.findOne({ where: { hub_token }, relations: ["gardens", "user"] });
        const garden = await gardenRepository.findOne({ where: { id: parseInt(garden_id, 10) } });

        if (!hub) {
            return res.status(404).json({ message: 'Hub not found' });
        }

        if (!garden) {
            return res.status(404).json({ message: 'Garden not found' });
        }

        hub.gardens?.push(garden);
        if (!hub.user) {
            hub.user = currentUser;
        }
        await hubRepository.save(hub);

        return res.status(200).json(hub);
    }

    async getHubSensors(req: Request, res: Response) {
        const hubId = Number(req.params.id);
        const sensorRepository = getRepository(Sensor);
        const sensors = await sensorRepository.find({ where: { hub: { id: hubId } } });
        if (!sensors) {
            return res.status(404).json({ message: 'Sensors not found' });
        }
        return res.status(200).json(sensors);
    }

    async getHubGardens(req: Request, res: Response) {
        const hubId = Number(req.params.id);
        const gardenRepository = getRepository(Garden);
        const gardens = await gardenRepository.find({ where: { hub: { id: hubId } } });
        if (!gardens) {
            return res.status(404).json({ message: 'Gardens not found' });
        }
        return res.status(200).json(gardens);
    }
}
export default new HubController();
