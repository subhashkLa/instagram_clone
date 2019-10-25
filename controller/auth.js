const User = require('../model/auth'); 
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

const jwt_token = "KLJSDKJLKFSLKJDF";

exports.signup = async (req, res) => {
    const userExist = await User.findOne({ email: req.body.email });
        if(userExist) return res.status(400).json({ error: "Email is Taken" });

    const user = await User(req.body);
    await user.save((err, data) => {
        if(err) return res.status(200).json({ error: "Something is wrong"});
        res.status(200).json({ data });
    });    
}

exports.signin =(req, res) => {

    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res.status(403).json({ error: "Email I'd not found" });
        }

        if(!user.authenciate(password)) {
           return res.status(403).json({ error: "Email I'd and password not found" });
        }

        const token = jwt.sign({ id: user._id }, jwt_token);

        res.cookie("t", token, { expire: new Date() + 999 });

        const { _id, name, email } = user;

        res.status(200).json({token, user: { _id, name, email }});
    })
}

exports.requireSignin = expressjwt({
    // if the token is valid, express jwt appends the verified user id
    // in an auth key to the request object
    secret: jwt_token,
    userProperty: "auth"
});