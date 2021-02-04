const jwt = require('jsonwebtoken');
const { User } = require("../Models");
const authenticate  = async (req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'];
        const token =  authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401)  
        let decode = await jwt.verify(token,"MY_JWT_SECRET");
        // console.log(decode)
        req.user = await User.findById(decode.user_id);
        next();
    } catch (error) {
        return res.sendStatus(403)
    }
}
module.exports = authenticate;