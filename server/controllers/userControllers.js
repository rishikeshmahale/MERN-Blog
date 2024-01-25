
const User =  require("../models/userModel.js");
const bcrypt =  require("bcryptjs");
const validator =  require("validator");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.js"); 



// Register controller
 const userRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return createError(400, "All fields are mandatory");
    }

    const exists = await User.findOne({ username: username });
    if (exists) {
      return createError(400 , "user already exist")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userDoc = await User.create({ username, password : hashedPassword });

    return res.status(201).json(userDoc);

  } catch (err) {

    next(err);
  }
}

// login controller
 const userLogin = async (req, res, next) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const userDoc = await User.findOne({ username : username});
  
    if (!userDoc) {
      return createError(400 , "user does not exist")
    }

    const match = await bcrypt.compare(password, userDoc.password);


    if (match) {
      jwt.sign({ username, id: userDoc._id }, process.env.secret, {}, (err, token) => {

        if (err) {
          return createError(500, "Something went wrong");
        }

        return res.cookie('token', token).json({
          id: userDoc._id,
          username
        });
        
      })
    } else {

      return res.status(400).json({ message: "Invalid Credentials" });
    }


  } catch (err) {
    next(err);
  }

}


// get profile
const userProfile = async (req, res, next) => {

  try {
    const {token} = req.cookies;
  
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) {
      return createError(401 , "You are not authenticated");
    }

    return res.status(200).json(info);

  });
  } catch (err) {
    next(err)
  }

};

// logout
const userLogout = async (req, res, next) => {
  
  try {
    
    return res.cookie('token', '').json('ok');

  } catch (err) {
    next(err)
  }

};


module.exports = { userLogin , userLogout , userRegister , userProfile}

