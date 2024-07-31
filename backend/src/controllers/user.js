const bcrypt = require("bcrypt");
const userModel = require("../schema/user");

// User Login
exports.signIn = async (req, res) => {
  try {
    const { email, password, isGoogleLogin } = req.body;

    let user = null;
    if (isGoogleLogin) {
      user = await userModel.findOne({
        email,
        isGoogleLogin: true,
      });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
    } else {
      user = await userModel.findOne({ email, isGoogleLogin: false });
      if (!user)
        return res.status(404).json({ message: "Invalid Credentials" });

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect)
        return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = user.generateJwtToken();
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Some thing gone wrong" });
  }
};

// For Registration of New User
exports.signUp = async (req, res) => {
  try {
    const { name, email, password, isGoogleLogin } = req.body;
    const doesUserExists = await userModel.findOne({ email });

    if (doesUserExists)
      return res.status(400).json({ message: "User Already Exists" });

    if (isGoogleLogin) {
      const user = await userModel.create({
        name,
        email,
        isGoogleLogin: true,
      });
      const token = user.generateJwtToken();
      return res.status(201).json({ user, token });
    }

    const user = await userModel.create({ name, email, password });

    const token = user.generateJwtToken();
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Some thing gone wrong" });
  }
};

// Getting details of logged in user
exports.getUserDetails = async (req, res) => {
  try {
    if (!req.user) return res.status(400).json({ message: "Invalid request" });
    const user = await userModel.findOne(req.user._id);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Some thing gone wrong" });
  }
};
