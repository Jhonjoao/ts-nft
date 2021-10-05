import { getRepository } from "typeorm";
import { Nft } from "../../models/Nft";

export class RegisterNftService {

    public async execute({asset, quantity}): Promise<Nft> {

        const nftRepository = getRepository(Nft);

        const nft = nftRepository.create({
            asset,
            quantity,
        });

        await nftRepository.save(nft);

        return nft;

    }

}