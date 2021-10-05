import { Router } from "express";
import assetRoutes from "./asset-routes";
import nftRoutes from "./nft-routes";

const routes = Router();

routes.use('/asset', assetRoutes);
routes.use('/nft', nftRoutes);

export default routes;