import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';

const app: express.Application = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message, err);
    return res.status(400).json({
        error: err.message
    });
})

export default app;