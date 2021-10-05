import fs from 'fs';
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Asset } from "../../models/Asset";
import { CreateAssetService } from "../services/CreateAssetService";

class AssetsController {

    public async list(req: Request, res: Response): Promise<any> {

        const assetRepository = getRepository(Asset);

        const assets = await assetRepository.find();

        return res.json(assets);

    }

    public async create(req: Request, res: Response): Promise<any> {

        const { name, description } = req.body;

        const file = req.file;

        if(!file || !name || !description) {

            if(file) fs.unlinkSync(file.path);

            return res.send({
                status: false,
                message: 'Missing fields'
            });
        }


        const asset = await new CreateAssetService().execute({name, description, file});

        return res.json(asset);

    }

}

export default AssetsController;