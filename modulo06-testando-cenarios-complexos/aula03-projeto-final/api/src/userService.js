import { getDb } from './db.js'
const { dbClient, collections: { dbUsers } } = await getDb()

class UserService {
    constructor() {
        this.dbUsers = dbUsers;
    }
    async createUser(body) {
        const user = {
            id: 1,
            name: body.name,
            age: body.age,
            email: body.email,
            phone: body.phone,
            vehicle: body.vehicle,
        }
        return await dbUsers.insertOne(user);
    }

    async getUsers() {
        return await dbUsers
            .find()
            .project({ _id: 0 })
            .sort({ name: 1 })
            .toArray()
    }
}

export default UserService;
