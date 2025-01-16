import { once } from 'node:events'

class UserController {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
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

    async updateUser(req, res) {
        const { appId, ...body } = JSON.parse(await once(req, 'data'))
        const params = req.params;
        console.log(`[app: ${appId}]`, body)
        const query = { id: Number(params.userId) };
        console.log(`[app: ${appId}]`, query)
        const user = {
            name: body.name,
            age: body.age,
            email: body.email,
            phone: body.phone,
            vehicle: body.vehicle,
        }
        await this.userRepository.updateOne(query, user);
        res.writeHead(201);
        res.write(JSON.stringify(user).concat('\n'));
        res.end();
        return;
    }

    async deleteUser(req, res) {
        const params = req.params;
        const query = { id: Number(params.userId) };
        console.log(`[query: ]`, query)
        await this.userRepository.deleteOne(query);
        res.writeHead(200);
        return res.end();
    }
}

export default UserController;
