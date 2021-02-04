const router = require("express").Router();

const mongoose = require("mongoose");
const {
    store,
    genre,
    show,
    index,
} = require("../Controllers/ContentController");
const {
    Content, RawStream
} = require("../Models");

// route model binding
router.param('content_id', async (req, res, next, id) => {
    const content = await Content.findById(id).populate("raw_stream").populate("stream_id");
    // const content =  mongoose.model("Content").findById(id)
    req.content = content;
    next();
});


router.post('/', store)
router.get('/genre', genre)
router.get("/all",index)

router.route('/:content_id')
    .get(show)
    .put()
    .delete()

module.exports = router;