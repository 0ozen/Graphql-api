const jwt = require("jsonwebtoken");

const createJWT = (user) => {
  return jwt.sign({user}, process.env.SECRET,{
    expiresIn: '24h',
  })
}

module.exports = createJWT