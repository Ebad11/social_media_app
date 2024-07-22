import mongoose from "mongoose";

let isConnected =false; //Check connection status

export const connectToDB = async () =>{
    mongoose.set('strictQuery',true);

    if(isConnected)
    {
        console.log("MongoDb is already connected");
        return;
    }

    try
    {
      await  mongoose.connect(process.env.MONGODB_URL, {
            dbName: "VibeZone",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;

        console.log("MongoDb connected successfully");
    }
    catch(error)
    {
        console.error(error);
    }
}