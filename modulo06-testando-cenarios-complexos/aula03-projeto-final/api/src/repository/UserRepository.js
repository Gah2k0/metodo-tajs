import { getDb } from '../repository/db.js'
const { dbClient, collections: { dbUsers } } = await getDb();

class UserRepository {
    constructor() {
        this.dbUsers = dbUsers;
    }

    async insertOne(user) {
        return await dbUsers.insertOne(user);
    }

    async get(query) {
        return await dbUsers
            .find()
            .project({ _id: 0 })
            .sort({ name: 1 })
            .toArray()
    }

}

export default UserRepository;