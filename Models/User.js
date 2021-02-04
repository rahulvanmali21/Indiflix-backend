const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

// const userSubscriptionSchema = require("./UserSubscription");
const bcrypt = require('bcryptjs');

// schema
const userSubscriptionSchema = new Schema({
    subscription_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscription',
        required: true
    },
    subscriptionDate: {
        type: Date,
    },
    subscriptionExpr: {
        type: Date,
    },
}, {
    timestamps: true,
});



let userSchema = new Schema({
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        phone: Number,
        remember_token: {
            type: String
        },
        email: {
            type: String,
            unique:true
        },
        subscription:userSubscriptionSchema,
        devices: Array,
    }, {
        timestamps: true
    }
)

// pre save methods
userSchema.pre("save",async function(next){
    let user  = this;
    if(user &&  !user.isModified("password")) return next();
    try {
        let salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(user.password,salt);
        next();
    } catch (err) {
        next(err);
    }
})


// user define mongoose method
userSchema.methods.comparePassword = async function(candidatePassword){
     return bcrypt.compare(candidatePassword,this.password)
}





module.exports = mongoose.model('user', userSchema);