require('dotenv').config()

const config = {
    JWT_EXPIRY: 60 * 60 * 6,
    JWT_SECRET_KEY: "qwerty123456" ||  process.env.JWT_SECRET_KEY
}

module.exports = config;