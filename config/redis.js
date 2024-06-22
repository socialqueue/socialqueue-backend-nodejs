import { createClient } from 'redis'


const redis_connect = async () => {
    const client = createClient({
        url: process.env.REDIS_URI
    })

    client.on('error', (err) => {
        console.log("Redis connection failed. exiting now...")
        console.error(err)
        process.exit(1)
    })

    try {
        await client.connect()
        console.log("Redis connection successful")
    }
    catch (err) {
        console.log("Redis connection failed. exiting now...")
        console.error(err)
        process.exit(1)
    }
}


export default redis_connect
