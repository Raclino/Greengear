import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Garden } from '../models/Garden';
import { Plant } from '../models/Plant';
import { User } from '../models/User';
import { Sensor } from '../models/Sensor';
import { verifyToken } from '../service/jwtService';
import { Hub } from '../models';

interface AuthenticatedRequest extends Request {
    userId?: number;
}

class GardenController {
    async getAllGardens(req: AuthenticatedRequest, res: Response) {
        try {
            const gardenRepository = getRepository(Garden);
            const userRepository = getRepository(User);
            const currentUser = await userRepository.findOne({ where: { id: req.userId }});
            if (currentUser?.role == "admin"){
                const gardens = await gardenRepository.find();
                res.json(gardens);
            } else {
                const gardens = await gardenRepository.find({ where: { user: { id: currentUser?.id } } });
                res.json(gardens);
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getGardenById(req: AuthenticatedRequest, res: Response) {
        const gardenId = parseInt(req.params.id, 10);

        try {
            const userRepository = getRepository(User);
            const currentUser = await userRepository.findOne({ where: { id: req.userId }});
            const gardenRepository = getRepository(Garden);
            if (currentUser?.role == "admin"){ 
                const garden = await gardenRepository.findOne({ where: { id: gardenId }, relations: ["hub"]});  

                if (!garden) {
                    res.status(404).json({ error: 'Garden not found' });
                } else {
                    res.json(garden);
                }
            } else {
                const garden = await gardenRepository.findOne({ where: { id: gardenId, user: { id: currentUser?.id } }, relations: ["hub"] });

                if (!garden) {
                    res.status(404).json({ error: 'Garden not found' });
                } else {
                    res.json(garden);
                }
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getGardensByUserId(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.userId;
            const gardenRepository = getRepository(Garden);
            const gardens = await gardenRepository.find({ where: { user: { id: userId }} });
            res.json(gardens);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createGarden(req: Request, res: Response) {
        var path = ''
        if (req.file) {
            path = req.file.path;
        }
        else{
            path = "public/default_garden.jpg"
        }
        try {
            const gardenRepository = getRepository(Garden);
            const userRepository = getRepository(User);

            const userId = req.userId;
            const user = await userRepository.findOne({ where: { id: userId } });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            const newGarden = gardenRepository.create({
                garden_name: req.body.garden_name,
                user: user,
                imagePath : path,
            });

            const result = await gardenRepository.save(newGarden);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateGarden(req: AuthenticatedRequest, res: Response) {
        const gardenId = parseInt(req.params.id, 10);

        try {
            const userId = req.userId;
            const gardenRepository = getRepository(Garden);
            const gardenToUpdate = await gardenRepository.findOne({ where: { id: gardenId, user: { id: userId }}});

            if (!gardenToUpdate) {
                res.status(404).json({ error: 'Garden not found' });
                return;
            }

            gardenRepository.merge(gardenToUpdate, req.body);
            const result = await gardenRepository.save(gardenToUpdate);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteGarden(req: AuthenticatedRequest, res: Response) {
        const gardenId = parseInt(req.params.id, 10);

        try {
            const userId = req.userId;
            const gardenRepository = getRepository(Garden);
            const plantRepository = getRepository(Plant);
            const gardenToDelete = await gardenRepository.findOne({ 
                where: { id: gardenId, user: { id: userId }}, 
                relations: ["plants"]
            });

            if (!gardenToDelete) {
                res.status(404).json({ error: 'Garden not found' });
                return;
            }

            const plantsInGarden = await gardenToDelete.plants;
            for (const plant of plantsInGarden) {
                await plantRepository.remove(plant);
            }

            await gardenRepository.remove(gardenToDelete);
            res.json({ message: 'Garden deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getHubInGarden(req: AuthenticatedRequest, res: Response) {
        const gardenId = parseInt(req.params.id, 10);
    
        try {
            const userId = req.userId;
            const gardenRepository = getRepository(Garden);
            const garden = await gardenRepository.findOne({ where: { id: gardenId, user: { id: userId } }, relations: ['hub'] });
            if (!garden) {
                return res.status(404).json({ error: 'Garden not found' });
            } else {
                console.log(garden.hub);
                return res.json(garden.hub);
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    async getSensorInGarden(req: AuthenticatedRequest, res: Response) {
        console.log("qweqweqwe")
        const gardenId = parseInt(req.params.id, 10);
    
        try {
            const userId = req.userId;
            const gardenRepository = getRepository(Garden);
            const garden = await gardenRepository.findOne({ where: { id: gardenId, user: { id: userId } }, relations: ['hub'] });

            if (!garden)
            {
                return res.status(404).json({ error: 'Garden not found' });
            }

            const hub = garden.hub;
            if (!hub) {
                return res.status(404).json({ error: 'Hub not found' });
            }

            const sensorRepository = getRepository(Sensor);
            const sensors = await sensorRepository.find({ where: { hub: { id: hub.id } } });
            if (!sensors) {
                return res.status(404).json({ message: 'Sensors not found' });
            }
            return res.status(200).json(sensors);

        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new GardenController();
