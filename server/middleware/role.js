const jwt = require('jsonwebtoken')
const User = require('../models/user');
const role = async (req, res, next) => {
    const token = req.header('Authorization').replace("Bearer ", '');
    const decoded = jwt.verify(token, 'demoapp');
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
    if (user.role_id === '2') {console.log(user.role_id)
        return  res.status(401).send({
            errors: 'Access denied'
        })
    }
    next();
}

module.exports = role;