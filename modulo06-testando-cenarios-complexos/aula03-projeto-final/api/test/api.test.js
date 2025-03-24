import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { runSeed } from '../config/seed.js'
import { app } from '../src/api.js';

describe('API Test suite', () => {
    function waitForServerStatus(app) {
        return new Promise((resolve, reject) => {
            app.once('error', (err) => reject(err));
            app.once('listening', () => resolve());
        })
    }

    async function createUser(data){
        return await fetch(`${_testServerAddress}/users/`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    async function getUsers(){
        const response = await fetch(`${_testServerAddress}/users`);
        return { body: await response.json(), status: response.status};
    }

    async function updateUser(userId, data){
        return await fetch(`${_testServerAddress}/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    }

    async function deleteUser(userId){
        return await fetch(`${_testServerAddress}/users/${userId}`, {
            method: 'DELETE'
        })
    }

    let _testServer;
    let _testServerAddress;

    beforeEach(async () => {
        process.env.NODE_ENV = 'test';
        _testServer = app.listen();

        await waitForServerStatus(_testServer);

        const appInfo = _testServer.address();
        _testServerAddress = `http://localhost:${appInfo.port}`;
        return runSeed()
    })

    afterEach(async () => {
        _testServer.close()
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
        expect(response.body.length).toEqual(1);
    })

    it('Should update a user and return 200', async () => {
        const data = {
            "name": "Paula Francisco",
            "age": 23,
            "email": "p.alessandra.n.s@hotmail.com",
            "phone": "51 98021-0293",
            "vehicle": "Peguete"
        };
        const createdUser = await createUser(data);
        const createdUserJson = await createdUser.json();
        const response = await updateUser(createdUserJson.id, data);
        const updatedUser = await getUsers(data);
        expect(response.status).toEqual(200);
        expect(updatedUser.body[0].name).toEqual(data.name);
        expect(updatedUser.body[0].email).toEqual(data.email);
        expect(updatedUser.body.length).toEqual(1);
    })

    it('Should delete a user and return 200', async () => {
        const data = {
            "name": "Paula",
            "age": 23,
            "email": "p.alessandra.n.s@hotmail.com",
            "phone": "51 98021-0293",
            "vehicle": "Peguete"
        };
        const createdUser = await createUser(data);
        const createdUserJson = await createdUser.json();
        const response = await deleteUser(createdUserJson.id);
        const usersSearch = await getUsers(data);
        expect(response.status).toEqual(200);
        expect(usersSearch.body.length).toEqual(0);
    })
})