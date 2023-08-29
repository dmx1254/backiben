const CodeModel = require("../modals/code.models");
const UserModel = require("../modals/user.model");
const bcrypt = require("bcrypt");

module.exports.getAllCodes = async (req, res) => {
  try {
    const codes = await CodeModel.find();
    res.status(200).send(codes);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.removeCode = async (req, res) => {
  const { id } = req.params;
  try {
    const codeDeleted = await CodeModel.findByIdAndDelete(id);
    return res.status(200).json(codeDeleted);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.createCode = async (req, res) => {
  const { code } = req.body;

  try {
    const codeCreated = await CodeModel.create({ code });
    res.status(200).json(codeCreated);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.createNewPass = async (req, res) => {
  const { email, code, password } = req.body;
  const codeFinder = await CodeModel.findOne({ code: code });
  const userVerifiedByEmail = await UserModel.findOne({ email: email });
  if (!userVerifiedByEmail)
    return res.status(500).json({ message: "Adresse email invalide" });

  if (!codeFinder)
    return res.status(500).json({ message: "Le code saisi est incorrect" });

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
    res.status(500).json({ message: error.message });
  }
};
