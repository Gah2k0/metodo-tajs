import { once } from 'node:events'
import express from 'express';

const analyticsRouter = express.Router();
analyticsRouter.post('/', async (req, res, next) => {
        const { appId, ...args } = JSON.parse(await once(req, 'data'))
        console.log(`[app: ${appId}]`, args)
        res.writeHead(200)
        res.end('ok')
        return;
});

export default analyticsRouter;