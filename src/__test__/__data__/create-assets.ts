import { getRepository } from "typeorm";
import { Asset } from "../../models/Asset";

export default class createAssetsTest {

    public async createOneAsset(): Promise<Asset> {

        const assetRepository = getRepository(Asset);

        const asset = assetRepository.create({
            id: Math.random().toString(36),
            name: 'Asset test name',
            description: 'Asset add in sqlite for test creation nft'
        });

        await assetRepository.save(asset);

        return asset;

    }

}