const {User} = require("../Models");
exports.getUser = (req,res) => {
        const user = req.user;
        res.status(200).json(user);
}
exports.deleteUser = (req,res) => {

}
exports.editUser = (req,res) => {
    
}