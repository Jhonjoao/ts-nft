import { getRepository } from "typeorm";
import { Asset } from "../../models/Asset";
import UpFilePinataIPFS from "../subscribers/UpFilePinataIPFS";

export class CreateAssetService {

    public async execute({name, description, file}):Promise<Asset> {

        const sub = new UpFilePinataIPFS();

        try{
            const pinata = await sub.upload({name, file});

            const assetRepository = getRepository(Asset);
    
            const asset = assetRepository.create({
                id: pinata.IpfsHash,
                name,
                description
            });
    
            await assetRepository.save(asset);
    
            return asset;
        } catch(err) {
            new Error('Error: ' + err);
        }
        

    }    

    

}