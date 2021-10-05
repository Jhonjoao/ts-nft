import { Connection } from 'typeorm';
import { Asset } from '../../models/Asset';
import { RegisterNftService } from './RegisterNftService';
import CreateAssetsTest from '../../__test__/__data__/create-assets';
import createTestConnection from '../../config/connection-db';


describe('Tests Register NFT Service', () => {

    let connection: Connection;
    let assets: Asset[] = [];

    beforeEach( async () => {

        connection = await createTestConnection();

        const asset = await new CreateAssetsTest().createOneAsset();
        assets.push( asset ); 
        
    });

    afterEach(async () => {
        jest.restoreAllMocks();
        await connection.close();
    });

    test('Test register new NFT', async () => {

        const service = new RegisterNftService();

        const createAsset = { asset: assets[0].id, quantity: 2 };

        const nft = await service.execute(createAsset);
        
        expect(nft.asset).toEqual(createAsset.asset);
        expect(nft.quantity).toEqual(createAsset.quantity);

    })

})