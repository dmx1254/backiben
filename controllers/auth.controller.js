const UserModel = require("../modals/user.model");
const CodeModel = require("../modals/code.models");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

//All my errors functions displaying when sign in or sign up errors
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

//Define duration of the valid token
const maxAge = 3 * 24 * 60 * 60 * 1000;

//Function creating token with json web token
const createToken = (id, admin) => {
  return jwt.sign({ id, admin }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

//Users creating and saving in my database function
module.exports.signUp = async (req, res) => {
  const {
    email,
    password,
    code,
    isAdmin,
    moderator,
    profil,
    lastname,
    firstname,
    phone,
    address,
    country,
    city,
    postalCode,
  } = req.body;
  const clientIp = req.clientIp;
  const existingUser = await UserModel.findOne({ email });

  if (existingUser)
    return res
      .status(500)
      .json({ message: "Votre email existe déjà, veuillez vous connecter" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userCreated = await UserModel.create({
      email,
      password: hashedPassword,
      code,
      isAdmin,
      moderator,
      profil,
      lastname,
      firstname,
      phone,
      address,
      country,
      city,
      clientIp,
      postalCode,
    });
    res.status(200).json(userCreated);
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

//Users login function
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const clientIp = req.clientIp;

  const user = await UserModel.findOne({ email });

  try {
    if (!user)
      return res
        .status(500)
        .json({ message: "Adresse email introuvable, veuillez vous inscrire" });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    await UserModel.findOneAndUpdate(
      { email: email },
      { clientIp: clientIp },
      { new: true }
    );

    if (!isCorrectPassword)
      return res.status(500).json({ message: "Mot de passe incorrecte" });

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });
    const newUser = await UserModel.findOne({ email });

    res.status(200).json({ user: newUser._id, person: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to logout

module.exports.logout = async (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, maxAge: 1 });
  return res
    .status(200)
    .json({ message: "Utilisateur déconnecté avec succès" });
};

// module.exports.getAllStats = async (req, res) => {
//   try {
//     const data = await UserModel.find();
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// module.exports.createNewPassword = async (req, res) => {
//   const { email, password } = req.body;
//   const userVerifiedByEmail = await UserModel.findOne({ email: email });
//   if (!userVerifiedByEmail)
//     return res.status(400).json({ message: "Utilisateur inconnu" });

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const userPasswordUpdated = await UserModel.findOneAndUpdate(
//       { email },
//       { password: hashedPassword },
//       { new: true }
//     );

//     res.status(200).json({
//       message:
//         "Mot de passe réinitialisé avec succès, vous pouvez maintenant vous connecter",
//     });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

module.exports.createPassword = async (req, res) => {
  const { email, password } = req.body;
  const userVerifiedByEmail = await UserModel.findOne({ email: email });
  if (!userVerifiedByEmail)
    return res.status(400).json({ message: "Utilisateur inconnu" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userPasswordUpdated = await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({
      message:
        "Mot de passe réinitialisé avec succès, vous pouvez maintenant vous connecter",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
