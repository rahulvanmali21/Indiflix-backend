const jwt = require('jsonwebtoken')
const {
    User
} = require("../Models")


let UserControler = {
    signUp:  async (req, res) => {
        let {
            username,
            email,
            phone,
            password,
            password_confirmation,
        } = req.body;
        try {
            let user = await User.findOne({
                email
            })
            if (user) {
                return res.status(422).json({
                    errors: [{
                        users: "email id exist"
                    }]
                })
            }
            user = new User({
                username,
                email,
                password,
                phone,
            });
            let result = await user.save();
            res.status(200).json({
                success: true,
                result: result
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errors: [{
                    message: error
                }]
            })
        }
    },
    signIn :async (req, res) => {
        const {
            email,
            password
        } = req.body;
        
        try {
            let user = await User.findOne({
                email: email
            }).exec();
            console.log(req.body)
            if (!user) {
                return res.status(404).json({
                    errors: [{
                        user: "invalid credentials"
                    }],
                });
            }
            let password_match = await user.comparePassword(password);
            if (!password_match) {
                return res.status(404).json({
                    errors: [{
                        user: "invalid credentials"
                    }],
                });
            }
            let payload = {
                email: user.email,
                user_id: user.id,
            }
            //  
            let token = await jwt.sign(payload, "MY_JWT_SECRET", {
                expiresIn: 60 * 60 * 5,
            });
            res.status(200).json({
                token
            });
    
    
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errors: "server error"
            });
        }
    
    }
}




module.exports = UserControler;