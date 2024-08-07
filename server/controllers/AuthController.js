import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const RegisterUser = async (request, response, next) => {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
    response.status(400).json({
      success: false,
      message: "Please Fill All Required Fields",
    });
  }
  const exisitngUser = await User.findOne({ email });
  if (exisitngUser) {
    return response.status(200).json({
      success: false,
      message: "User Already Exists",
    });
  }

  const user = await User.create({ name, email, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const userData = {
      name: user.name,
      email: user.email,
      token,
    };
    return response.status(200).json({
      success: true,
      message: "User Created Successfully",
      user: userData,
    });
  }
  return response.status(500).json({
    success: false,
    message: "An Error Occured",
  });
};

export const LoginUser = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (user) {
    const passwordMatch = await user.comparePassword(password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      });
      const userData = {
        name: user.name,
        email: user.email,
        token,
      };
      return response.status(200).json({
        success: true,
        message: "Logged In Successfully",
        user: userData,
      });
    }
  }
  return response.status(404).json({
    success: false,
    message: "Invalid Email Or Password"
  });
};
