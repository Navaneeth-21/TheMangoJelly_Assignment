const {MongoClient} = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGOURI;
const dbName = 'TheMangoJelly_Assignment';
const collectionName = 'comicBooks';

const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log('Database connected successfully');
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        return {db,collection};
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {main}