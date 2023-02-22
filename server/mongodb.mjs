import { MongoClient } from 'mongodb';

const url =
    'mongodb+srv://1sses:MxN1AdLM1PzBewrm@main.54hd2eg.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

let connection;
try {
    connection = await client.connect();
} catch(e) {
    console.error(e);
}

let db = connection.db('main');

export default db
