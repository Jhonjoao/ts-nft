import NftController from '../api/controllers/nft-controller';
import { Router } from 'express';

const nftRoutes = Router();

const nftController:NftController = new NftController();

nftRoutes.get('/', nftController.list);
nftRoutes.post('/', nftController.create);

export default nftRoutes;