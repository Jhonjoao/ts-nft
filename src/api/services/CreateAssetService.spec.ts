import { Connection } from 'typeorm';
import UpFilePinataIPFS from '../subscribers/UpFilePinataIPFS';
import { CreateAssetService } from "./CreateAssetService"
import createTestConnection from '../../config/connection-db';

describe('Tests Create Asset Service', () => {

    let connection: Connection;

    beforeEach( async () => {
        connection = await createTestConnection();
    });

    afterEach(async () => {
        jest.restoreAllMocks();
        await connection.close();
    });

    test('Test created new Asset', async () => {

        // @ts-ignore
        jest.spyOn(UpFilePinataIPFS.prototype , 'upload').mockImplementation(async () => {
            return { IpfsHash: 'testhash123', PinSize: 2, Timestamp: 'today test' };
        });
        
        const service = new CreateAssetService();

        const params = {name: 'Test', description: 'Just a test', file: ''};
    
        const asset = await service.execute(params);

        expect(params.name).toEqual(asset.name);
        expect(params.description).toEqual(asset.description);

    });

    test('Test created new Asset return error', async () => {

        // @ts-ignore
        jest.spyOn(UpFilePinataIPFS.prototype , 'upload').mockImplementation(async () => {
            throw new Error('Test Problem');
        });
        
        const service = new CreateAssetService();

        const params = {name: 'Test', description: 'Just a test', file: ''};
    
        try{
            await service.execute(params);
        } catch(err) {
            expect(err).toEqual('Error: Test Problem');
        }


    });



})