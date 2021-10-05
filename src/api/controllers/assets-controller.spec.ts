import { Request, Response } from 'express';
import { Asset } from '../../models/Asset';
import { CreateAssetService } from '../services/CreateAssetService';
import AssetsController from './assets-controller';
import FakeExpress from '../../__test__/__mocks__/fake-express';
import createTestConnection from '../../config/connection-db';
import { Connection } from 'typeorm';
import createAssetsTest from '../../__test__/__data__/create-assets';

describe('Tests Asset Controller', () => {

    let connection: Connection;
    let assets: Asset[] = [];

    beforeEach(async () => {

        connection = await createTestConnection();

        jest.spyOn(CreateAssetService.prototype, 'execute').mockImplementation(async () => new Asset());

        const asset = await new createAssetsTest().createOneAsset();
        assets.push( asset ); 
    
    });


    afterEach(async () => {
        jest.restoreAllMocks();
        await connection.close();
    })

    test('Create asset with service mocked and send all infos then return success', async () => {

        const controller = new AssetsController();

        const fakeExpress = new FakeExpress({ 
            body: { name: 'Test', description: 'Test description' }, file: {path: 'just a test'} 
        });

        await controller.create(fakeExpress.req as Request, fakeExpress.res as Response);

        expect(fakeExpress.responseData).toStrictEqual(new Asset());

    });

    test('Create asset with service mocked and not send all infos then generate error', async () => {

        const controller = new AssetsController();

        const fakeExpress = new FakeExpress( { 
            body: { name: 'Test' } 
        });

        await controller.create(fakeExpress.req as Request, fakeExpress.res as Response);

        expect(fakeExpress.res.status).toEqual(false);
        expect(fakeExpress.res.statusMessage).toStrictEqual('Missing fields');

    });

    test('List all assets', async () => {

        const controller = new AssetsController();

        const fakeExpress = new FakeExpress({});

        await controller.list(fakeExpress.req as Request, fakeExpress.res as Response);

        expect(fakeExpress.responseData).toEqual(expect.arrayContaining(assets));

    })
})