import { Request, Response } from 'express';
import FakeExpress from '../../__test__/__mocks__/fake-express';
import { Nft } from '../../models/Nft';
import NftController from './nft-controller';
import { RegisterNftService } from '../services/RegisterNftService';
import createTestConnection from '../../config/connection-db';
import { Connection } from 'typeorm';
import createNftsTest from '../../__test__/__data__/create-nfts';

describe('Tests Nft Controller' , () => {

    let connection: Connection;
    let controller: NftController;

    beforeEach(async () => {

        connection = await createTestConnection();

        jest.spyOn(RegisterNftService.prototype, 'execute').mockImplementation(async () => new Nft());

        controller = new NftController();

    });

    afterEach(async () => {
        jest.restoreAllMocks();
        await connection.close();
    });

    test('Create nft with service mocked and send all infos then return success', async () => {

        const fakeExpress = new FakeExpress({
            body: { asset:'assetId', quantity:1 }
        });
    
        await controller.create(fakeExpress.req as Request, fakeExpress.res as Response);

        expect(fakeExpress.responseData).toStrictEqual(new Nft());

    });

    test('Create nft with service mocked and not send all infos then generate error', async () => {

        const fakeExpress = new FakeExpress( { 
            body: { asset: 'Test' } 
        });

        await controller.create(fakeExpress.req as Request, fakeExpress.res as Response);

        expect(fakeExpress.res.status).toEqual(false);
        expect(fakeExpress.res.statusMessage).toStrictEqual('Missing fields');

    });

    test('List all nfts created', async () => {

        const dataNft = new createNftsTest()
        await dataNft.clearNfts();
        await dataNft.createOneNft();
    
        const fakeExpress = new FakeExpress( { 
            body: { asset: 'Test' } 
        });

        await controller.list(fakeExpress.req as Request, fakeExpress.res as Response);

        expect(fakeExpress.responseData.length).toEqual(1);

    });

});