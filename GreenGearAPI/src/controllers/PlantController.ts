import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Plant } from '../models/Plant';
import { Garden } from '../models/Garden';

interface AuthenticatedRequest extends Request {
    userId?: number;
}
class PlantController {
    async getAllPlantsInGarden(req: AuthenticatedRequest, res: Response) {
        const gardenId = parseInt(req.params.gardenId, 10);
        try {
            const gardenRepository = getRepository(Garden);
            const garden = await gardenRepository.findOne({ 
                where: { id: gardenId },
                relations: ["plants"]
              });

            if (!garden) {
                res.status(404).json({ error: 'Garden not found' });
                return;
            }
            const plants = await garden.plants;
            res.json(plants);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getPlantById(req: Request, res: Response) {
        const plantId = parseInt(req.params.id, 10);

        try {
            const plantRepository = getRepository(Plant);
            const plant = await plantRepository.findOne({ where: { id: plantId } });

            if (!plant) {
                res.status(404).json({ error: 'Plant not found' });
            } else {
                res.json(plant);
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createPlant(req: Request, res: Response) {
        var path = ''
        if (req.file) {
            path = req.file.path;
        }
        else{
            path = "public/default_plant.jpg"
        }

        try {
            const gardenId = req.body.gardenId;
            const plantRepository = getRepository(Plant);

            const newPlant = plantRepository.create([{
                plant_name: req.body.plant_name,
                plant_description: req.body.plant_description,
                garden: { id: Number(gardenId) },
                imagePath : path,
            }]);
            
            const result = await plantRepository.save(newPlant);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updatePlant(req: Request, res: Response) {
        const plantId = parseInt(req.params.id, 10);

        try {
            const plantRepository = getRepository(Plant);
            const plantToUpdate = await plantRepository.findOne({ where: { id: plantId } });

            if (!plantToUpdate) {
                res.status(404).json({ error: 'Plant not found' });
                return;
            }

            plantRepository.merge(plantToUpdate, req.body);
            const result = await plantRepository.save(plantToUpdate);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deletePlant(req: Request, res: Response) {
        const plantId = parseInt(req.params.id, 10);

        try {
            const plantRepository = getRepository(Plant);
            const plantToDelete = await plantRepository.findOne({ where: { id: plantId } });

            if (!plantToDelete) {
                res.status(404).json({ error: 'Plant not found' });
                return;
            }

            await plantRepository.remove(plantToDelete);
            res.json({ message: 'Plant deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new PlantController();
