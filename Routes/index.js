// express router 

const userRoute = require("./user");
const contentRoute = require("./content");
const streamRoute = require("./stream");
const videoQueue = require("../Jobs/VideoQueue");
const { Content } = require("../Models");

let router = (app)=>{


    app.get("/job/:id",async function(req,res){
        const id = req.params.id;
        let job = await videoQueue.getJob(id);
        videoQueue.clean("5");
        res.json(job)          
    });
    app.use("/users",userRoute);
    app.use("/content",contentRoute);
    app.use("/stream",streamRoute);

}


module.exports = router