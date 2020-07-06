const jwt = require('jsonwebtoken');
const User =  require('../models/user');

export const generateAuthToken = async (user) => {
    const token = jwt.sign({_id: user._id.toString()}, 'demoapp')
    await User.updateOne({ _id:user._id }, { tokens: user.tokens.concat({token}) })
    return token;
}