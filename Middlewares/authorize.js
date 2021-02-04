const authorization  = async (req,res,next)=>{
    try {
        let date = Date.now();
        user =  req.user;
        if(!(user.subscription && user.subscription.subscriptionExpr)){
            return res.sendStatus(401);
        }
        let sub_date = new Date( user.subscription.subscriptionExpr).getTime();
        let current_date  =  new Date().getTime();
        if(sub_date - current_date < 0){
            return res.sendStatus(401);
        }
        next();
    } catch (error) {
        return res.sendStatus(401)
    }
}
module.exports = authorization;