const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const token = authorization.replace('Bearer ', ''); // Remove 'Bearer ' from the token string
    const decodedToken = jwt.verify(token, process.env.SECRET); 

    const userId = decodedToken._id;

    // You can now use the extracted userId for further authentication or authorization checks
    req.user = await UserModel.findOne({ _id: userId }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
