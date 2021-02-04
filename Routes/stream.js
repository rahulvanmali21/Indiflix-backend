const {
    Stream,
    Content
} = require("../Models");
const {
    playStream,
    store
} = require("../Controllers/StreamController")
const path = require("path");
const router = require("express").Router();
// route model binding
router.param('stream_id', async (req, res, next, id) => {
    const steam = await Stream.findById(id);
    req.steam = steam;
    next();
});
router.param('content_id', async (req, res, next, id) => {
    const content = await Content.findById(id);
    if (!content) {
        return res.status(403).json({
            errors: [{
                message: "content not found"
            }]
        });
    }
    req.content = content;
    next();

});

router.post("/add/:content_id", store);
router.get('/dash-cdn',(req,res)=>{
    console.log(res);
})
router.route('/:stream_id')
    .get()
    .put()
    .delete();
router.get("/stream/:stream_id", playStream)
module.exports = router;