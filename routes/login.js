const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const { User } = require('../models/userModel');
const genAuthToken = require('../utils/genAuthToken');

const router = express.Router();

router.post('/',async(req,res) => {
    //validate the data
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required()
    });

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    //finding the user by email
    let user = await User.findOne({ email: req.body.email });
    if (!user) { //if user does not exist
        return res.status(400).send("Invalid email or password..")
    }
    //checking the password
    const isValid = await bcrypt.compare(req.body.password , user.password);
    if(!isValid){
        return res.status(400).send("Invalid email or password..");
    }

    //email and password is valid, so we are generating the auth token
    const token = genAuthToken(user)

    res.send(token);
});

module.exports = router;