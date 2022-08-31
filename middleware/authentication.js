const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try{
        const decode = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.JWT_KEY)
        req.token = decode
        next()
    }catch (error) {
        return res.status(401).send({
            mensagem: "Token Invalido"
        })
    }
    
}