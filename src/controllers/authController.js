// const authService = require("../services/authService");

// const register = async (req, res, next) => {
//   try {
//     const result = await authService.registerUser(req.body);
//     res.status(201).json({
//       success: true,
//       data: result
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const login = async (req, res, next) => {
//   try {
//     const result = await authService.loginUser(req.body);
//     res.status(200).json({
//       success: true,
//       data: result
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { register, login };


const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
