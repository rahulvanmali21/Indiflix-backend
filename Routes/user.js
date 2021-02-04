const router = require("express").Router();
const { signUp, signIn } = require("../Controllers/AuthController");
const { getUser } = require("../Controllers/UserController");
const authenticate = require("../Middlewares/auth");

router.route("/")
    .all(authenticate)
    .get(getUser)
    .put((req,res)=>{
        res.send("edited");
    })
    .delete((req,res)=>{
        res.send("deleted");
    })


router.post('/login', signIn);
router.post('/register', signUp);

module.exports = router;