import mongoose from 'mongoose'


const mongoose_connect = async () => {
    // mongoose connection parameters
    const connectionParams = {
        // useCreateIndex: true,
        // useFindAndModify: false
    }

    mongoose.set('strictQuery', true)

    try {
        await mongoose.connect(process.env.MONGO_URI, connectionParams)
        console.log("Mongo connection successful")
    }
    catch (err) {
        console.log("Mongo connection failed. exiting now...")
        console.error(err)
        process.exit(1)
    }
}


export default mongoose_connect
