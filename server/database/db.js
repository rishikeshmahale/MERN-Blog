
import mongoose from "mongoose";

const Connection = async (username , password) => {

    const database = `mongodb://${username}:${password}@ac-bxlu7sc-shard-00-00.a8qe7fk.mongodb.net:27017,ac-bxlu7sc-shard-00-01.a8qe7fk.mongodb.net:27017,ac-bxlu7sc-shard-00-02.a8qe7fk.mongodb.net:27017/?ssl=true&replicaSet=atlas-howuv6-shard-0&authSource=admin&retryWrites=true&w=majority`

    try {
        const connection = await mongoose.connect(database, {
          useUnifiedTopology: true,
          useNewurlParser: true,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export default Connection;
