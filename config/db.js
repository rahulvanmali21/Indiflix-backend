require('dotenv').config()

const config = {
    USER: "root" ||  process.env.MONGODB_USER,
    password: "toor" ||  process.env.MONGODB_PASSWORD,
    MONGODB_HOST: "mongodb://localhost:27017/Indiflix" ||  process.env.MONGODB_HOST
}

module.exports = config;