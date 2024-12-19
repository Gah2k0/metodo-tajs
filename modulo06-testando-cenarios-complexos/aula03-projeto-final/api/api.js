import { createServer } from 'node:http'
import { faker } from '@faker-js/faker'
import { setTimeout } from 'node:timers/promises'
import { once } from 'node:events'
import { getDb } from './db.js'
createServer(async (req, res) => {
    // Allow CORS for all origins and methods
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    const { dbClient, collections: { dbUsers } } = await getDb()

    // Handling preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
    }

    if(req.url.includes('analytics') && req.method === 'POST') {
        const { appId, ...args } = JSON.parse(await once(req, 'data'))
        console.log(`[app: ${appId}]`, args)

        res.writeHead(200)
        res.end('ok')
        return;
    }

    if(req.method === 'GET') {
        const users = await dbUsers
            .find()
            .project({ _id: 0 })
            .sort({ name: 1 })
            .toArray()

        res.writeHead(200);
        res.write(JSON.stringify(users));
        res.end();
        return;
    }

    if(req.method === 'POST') {
        const { appId, ...args } = JSON.parse(await once(req, 'data'))
        console.log(`[app: ${appId}]`, args)

        const user = {
            id: 1,
            name: args.name,
            age: args.age,
            email: args.email,
            phone: args.phone,
            vehicle: args.vehicle,
        }

        await dbUsers.insertOne(user);
        res.writeHead(201);
        res.write(JSON.stringify(user).concat('\n'));
        res.end();
        return;
    }
    // get limit and skip from query string or set default values
    const params = new URLSearchParams(req.url.split('?')[1])
    const limit = parseInt(params.get('limit')) || 10 // Default limit is 10
    const skip = parseInt(params.get('skip')) || 0   // Default skip is 0
    const search = params.get('search') || ''        // Default search is an empty string

    // Generate objects as an array with faker library
    res.writeHead(200, { 'Content-Type': 'application/json' })
    // Set the response headers and send the data as JSON
    return res.end()

}).listen(3000, () => console.log('Server is running at http://localhost:3000/'))
