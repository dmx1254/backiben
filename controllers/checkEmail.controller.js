const EmailModel = require("../modals/checkEmail.model");
const CodeModel = require("../modals/code.models");

const sendEmail = require("../utils/emailVerified");

//Function to sending code to users after they click to button get code
module.exports.sendCode = async (req, res) => {
  const { email, password } = req.body;
  if (!email)
    return res
      .status(200)
      .json({ message: "Votre adresse e-mail n'est pas valide" });
  try {
    sendEmail(email);
    const userSendingEmail = await EmailModel.create({ email, password });
    res
      .status(200)
      .json({ message: "Code de vérification envoyé avec succes à " + email });
  } catch (error) {
    res.status(400).json({ message: "Email not sent " + error });
  }
};

module.exports.verify = async (req, res) => {
  const { code } = req.body;
  try {
    const codeFinder = await CodeModel.findOne({ code: code });
    if (!codeFinder) {
      return res.status(200).json({
        messageError:
          "Code introuvable, veuiller verifier votre addresse e-mail",
      });
    } else {
      res.status(200).json({ message: true });
    }
  } catch (error) {
    res.status(400).json({ message: "Code invalide" });
  }
};

module.exports.getCodeVerify = async (req, res) => {
  const { code } = req.body;
  try {
    const codeFinder = await CodeModel.findOne({ code: code });
    if (!codeFinder) {
      return res.status(200).json({
        messageError:
          "Code introuvable, veuiller verifier votre addresse e-mail",
      });
    } else {
      res.status(200).json({ message: true });
    }
  } catch (error) {
    res.status(400).json({ message: "Code invalide" });
  }
};
