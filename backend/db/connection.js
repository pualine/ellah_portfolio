import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
    serverApi: {
        version:ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const DATABASE_NAME = 'portfolio_DB'

try {
    await client.connect();
    await client.db("admin").command({ping: 1});
} catch(error){
    console.log("SORRY CANNOT GET DATA", error);
}

let db = client.db(DATABASE_NAME);

export default db;