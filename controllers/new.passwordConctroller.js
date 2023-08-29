// const UserModel = require("../modals/user.model");
// const bcrypt = require("bcrypt");

// module.exports.createNewPass = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   const userVerifiedByEmail = await UserModel.findOne({ email: email });
//   if (!userVerifiedByEmail)
//     return res.status(400).json({ message: "Utilisateur inconnu" });

//   res.status(200).json(userVerifiedByEmail);

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
