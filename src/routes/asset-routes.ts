import AssetsController from '../api/controllers/assets-controller';
import { Router } from 'express';
import upload from '../config/multer';

const assetRoutes = Router();

const assetsController:AssetsController = new AssetsController();

assetRoutes.get('/', assetsController.list);
assetRoutes.post('/', upload.single('image'), assetsController.create);

export default assetRoutes;