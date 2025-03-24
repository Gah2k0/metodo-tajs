import { MongoClient } from 'mongodb'
import config from './../src/repository/config.js';
const isTestEnv = process.env.NODE_ENV === 'test'
const log = (...args) => {
    if (isTestEnv) return;
    console.log(...args)
}

async function runSeed() {

    const client = new MongoClient(config.dbURL);
    try {
        await client.connect();

        log(`Db connected successfully to ${config.dbName}!`);
        // create index for id
        const db = client.db(config.dbName);

        const collection = db.collection(config.collection);


        await collection.deleteMany({})

        log(await collection.find().toArray())

    } catch (err) {
        log(err.stack);
    } finally {
        await client.close();
    }
}

if (!isTestEnv) runSeed();

export { runSeed }