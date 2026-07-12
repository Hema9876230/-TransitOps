import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {genToken} from "../utils/authToken.js"

export const UserRegister = async (req, res, next) => {
  try {
    //accept data from fronted
    const { name, email, password,role } = req.body;

    //verify that all data exist
    if (!name || !email || !password || !role) {
      const error = new Error("All Field Required");
      error.statusCode = 400;
      return next(error);
    }

console.log(name,email,password,role);

    //check for duplicate user before refistration
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      let message = "Email already registered";

      const error = new Error(message);
      error.statusCode = 409;
      return next(error);
    }

    console.log("Sending Data to DB");

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //use placeholder image for profile photo
    const photoURL = `https://placehold.co/600x400?text=${name.charAt(0).toUpperCase()}`;
    const photo = {
      url: photoURL,
    };

    //save data to database
    const newUser = await User.create({
      name,
      name,
      email: email.toLowerCase(),
      password: hashPassword,
      role,
    });

    console.log(newUser);
    res.status(201).json({ message: "Registration Successfull !" });
  } catch (error) {
    next(error);
  }
};


export const UserLogin = async (req, res, next) => {
  try {
    //fetch data from fronted
    const { identifier, email, password } = req.body;
    const loginIdentifier = identifier || email;

    console.log(req.body);

    //verify that all data exist
    if (!loginIdentifier || !password) {
      const error = new Error("All Field Required");
      error.statusCode = 400;
      return next(error);
    }

    //check for if user is registered or not
    const existingUser = await User.findOne({
      $or: [{ email: loginIdentifier }, { mobileNumber: loginIdentifier }],
    });
    if (!existingUser) {
      const error = new Error("User not registered");
      error.statusCode = 401;
      return next(error);
    }

    //verify password
    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Password didn't match");
      error.statusCode = 401;
      return next(error);
    }

    //Token Genration will be done here
    const token = generateToken(existingUser);
    const user = {
      id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      mobileNumber: existingUser.mobileNumber,
      role: existingUser.role,
    };

    //send message to fronted
    res.status(200).json({ message: "Login Successfull !", token, user });
  } catch (error) {
    next(error);
  }
};

export const UserLogout = async (req, res, next) => {
  try {
    // send mesage to frontend
    res.clearCookie("parle");

    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};
