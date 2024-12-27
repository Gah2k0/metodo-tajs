import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { server } from '../src/api.js';

describe('API Test suite', () => {
    function waitForServerStatus(server) {
        return new Promise((resolve, reject) => {
            server.once('error', (err) => reject(err));
            server.once('listening', () => resolve());
        })
    }

    async function createUser(data){
        return await fetch(`${_testServerAddress}/users`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    async function getUsers(){
        const response = await fetch(`${_testServerAddress}/users`);
        return { body: await response.json(), status: response.status};
    }

    let _testServer;
    let _testServerAddress;

    beforeAll(async () => {
        // process.env.NODE_ENV = 'test';
        _testServer = server.listen();

        await waitForServerStatus(_testServer);

        const serverInfo = _testServer.address();
        _testServerAddress = `http://localhost:${serverInfo.port}`;
    })

    afterAll(done => {
        server.closeAllConnections()
        _testServer.close(done)
    });

    it('Should create a new user and return 200', async () => {
        const data = {
            "name": "Paula",
            "age": 23,
            "email": "p.alessandra.n.s@hotmail.com",
            "phone": "51 98021-0293",
            "vehicle": "Peguete"
        };
        const response = await createUser(data);
        expect(response.status).toEqual(201);
    })
    it('Should get a user and return 200', async () => {
        const data = {
            "name": "Paula",
            "age": 23,
            "email": "p.alessandra.n.s@hotmail.com",
            "phone": "51 98021-0293",
            "vehicle": "Peguete"
        };
        await createUser(data);
        const response = await getUsers();
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual(data.name);
        expect(response.body[0].email).toEqual(data.email);
    })
})