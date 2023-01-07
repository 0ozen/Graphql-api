const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    const verified = jwt.verify(req.headers.authorization.split(' ')[1],'93f4h9')
    req.authorizedUser = verified._id
    next()
  } catch (error) {
    console.log("user no authorized");
    next()
  }
  
}

module.exports = authorization