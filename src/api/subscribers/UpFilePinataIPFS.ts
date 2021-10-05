import fs from 'fs';
import pinataSDK, { PinataPinOptions } from '@pinata/sdk';

interface PinataSuccessRes {
    IpfsHash: string,
    PinSize: number,
    Timestamp: string
}

export default class UpFilePinataIPFS {

    public async upload({name, file}):Promise<PinataSuccessRes> {

        const stream = fs.createReadStream(file.path);

        const options: PinataPinOptions = {
            pinataMetadata: {
                name
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API);

        const result = await pinata.testAuthentication();

        if(!result.authenticated){
            throw new Error('Problem to connect with pinata');
        }

        try{
            const pinataRes = await pinata.pinFileToIPFS(stream, options)
    
            return pinataRes;

        } catch (err) {
            throw new Error('Pinata error: ' + err);
        }
        
    }
}