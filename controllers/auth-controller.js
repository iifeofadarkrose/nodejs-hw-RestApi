import User from "../models/User.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const signup = async(req, res)=> {
    const user = await User.create(req.body);
    res.status(201).json({
        username: user.username,
        email: user.email,
    })
}


export default {
    signup: ctrlWrapper(signup), 
}