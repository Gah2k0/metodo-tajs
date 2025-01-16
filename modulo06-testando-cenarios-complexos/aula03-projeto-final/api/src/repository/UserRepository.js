import { getDb } from '../repository/db.js'
const { dbClient, collections: { dbUsers } } = await getDb();

class UserRepository {
    constructor() {
        this.dbUsers = dbUsers;
    }

    async insertOne(user) {
        return await dbUsers.insertOne(user);
    }

    async updateOne(query, user) {
        return await dbUsers.replaceOne(query, user);
    }

    async deleteOne(query) {
        return await dbUsers.deleteOne(query);
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