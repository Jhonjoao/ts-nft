import { getRepository } from "typeorm";
import { Nft } from "../../models/Nft";
import createAssetsTest from "./create-assets";

export default class createNftsTest {

    private createAssets: createAssetsTest;

    constructor() {
        this.createAssets = new createAssetsTest();
    }

    public async createOneNft(): Promise<Nft> {

        const nftRepository = getRepository(Nft);

        const asset = await this.createAssets.createOneAsset();

        const nft = nftRepository.create({
	        asset,
            quantity: 2,
        });

        await nftRepository.save(nft);

        return nft;

    }

    public async clearNfts(): Promise<any> {

        const nftRepository = getRepository(Nft);

        await nftRepository.clear();

    }

}