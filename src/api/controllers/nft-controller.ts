import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Nft } from "../../models/Nft";
import { RegisterNftService } from "../services/RegisterNftService";

class NftController {
    
    public async list(req: Request, res: Response): Promise<any> {
        
        const nftRepository = getRepository(Nft);

        const nfts = await nftRepository.find();

        return res.json(nfts);

    }

    public async create(req: Request, res: Response): Promise<any> {
        
        const { asset, quantity } = req.body;

        if(!asset || !quantity) {
            return res.send({
                status: false,
                message: 'Missing fields'
            });
        }

        const registerNftService = new RegisterNftService();

        const nft = await registerNftService.execute({ asset, quantity });

        return res.json(nft);
    
    }

}

export default NftController;