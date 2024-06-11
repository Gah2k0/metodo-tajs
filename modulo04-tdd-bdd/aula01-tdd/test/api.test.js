import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { server } from '../src/api.js';

describe('API Users E2E Suite', () => {
    function waitForServerStatus(server) {
        return new Promise((resolve, reject) => {
            server.once('error', (err) => reject(err));
            server.once('listening', () => resolve());
        })
    }

    function createUser(data){
        return fetch(`${_testServerAddress}/users`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    async function findUserById(id){
        const user = await fetch(`${_testServerAddress}/users/${id}`);
        return user.json();
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

    it('should register a new user with young adult category', async () => {
        jest.useFakeTimers({
            now: new Date('2024-06-10T00:00')
        })
        const expectedCategory = 'young-adult';
        const response = await createUser({
            name: 'Xuxa da Silva',
            birthday: '2000-01-01' // 23 anos
        })
        expect(response.status).toBe(201) // created
        const result = await response.json();
        expect(result.id).not.toBeUndefined();

        const user = await findUserById(result.id);
        expect(user.category).toBe(expectedCategory);
    })
    it.todo('should register a new user with adult category')
    it.todo('should register a new user with senior category')
    it('should throw an error when registering a under-age user', async () => {
        const response = await createUser({
            name: 'gabriel f',
            birthday: '2020-01-01'
        })
        expect(response.status).toBe(400);
        const result = await response.json();
        expect(result).toEqual({
            message: 'User must be 18yo or older'
        })
    })

})