import UserRepository from "../repository/UserRepository.js";
import { once } from 'node:events'

class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async createUser(req, res) {
        const { appId, ...body } = JSON.parse(await once(req, 'data'))
        console.log(`[app: ${appId}]`, body)

        const user = {
            id: 1,
            name: body.name,
            age: body.age,
            email: body.email,
            phone: body.phone,
            vehicle: body.vehicle,
        }
        await this.userRepository.insertOne(user);
        res.writeHead(201);
        res.write(JSON.stringify(user).concat('\n'));
        res.end();
        return;
    }

    async getUsers(req, res) {
        const users = await this.userRepository.get();
        res.writeHead(200);
        res.write(JSON.stringify(users));
        res.end();
        return
    }
}

export default UserController;
