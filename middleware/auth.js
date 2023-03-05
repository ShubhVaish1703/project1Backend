const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    const token = req.header("x-auth-token")

    if(!token){
        return res.status(401).send('Access denied, Not Authenticated');
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY
        const user = jwt.verify(token,secretKey);
        req.user = user

        next();
    } catch (error) {
        console.log(error);
        res.status(400).send('Access denied, Envalid token..')
    }
}

const isAdmin = (req,res,next) => {
    auth(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).send('Access denied, not authorized.')
        }
    })
};

module.exports = {auth,isAdmin}