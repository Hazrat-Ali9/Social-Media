import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // generate new password

    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await new User({
      username,
      email,
      password,
    });

    // save user and respond
    await user.save();
    res.json({
      status: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(404);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(404).json({
        status: false,
        message: "Email and password are required!",
      });
    }

    const isUserExists = await User.findOne({ email });
    console.log(isUserExists);

    if (isUserExists) {
      const validPassword = await bcrypt.compare(
        password,
        isUserExists.password
      );

      if (isUserExists.password === password) {
        res.status(200);
        res.json({
          status: true,
          message: "login Sucessfully!",
          data: isUserExists,
        });
      } else {
        res.status(400);
        res.json({
          status: false,
          message: "Invalid Password",
        });
      }
    } else {
      res.status(400);
      res.json({
        status: false,
        message: "Invalid Email",
      });
    }
  } catch (error) {
    res.status(404);
  }
};
