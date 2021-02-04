const redis = require("redis");
// const util = require("util");
const redis_client = redis.createClient();
// client.get = util.promisify(client.get);
redis_client.on("error", function (error) {
    console.error(error);
});

redis_client.on("connect", function (error) {
    console.log("redis connected");
});
redis_client.on("warning", function (warning) {
    console.log(warning);
});
redis_client.on("reconnecting", function (error) {
    console.log("redis reconnecting");
});

module.exports = redis_client;