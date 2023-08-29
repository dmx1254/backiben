const UserModel = require("../modals/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const commentModel = require("../modals/comment.model");

//Get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find().select("-password");
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Update single user
module.exports.getOneUser = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu " + id });

  try {
    const userInfo = await UserModel.findById(id).select("-password");
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).send(error);
  }
};

//Get user info by this e-mail
module.exports.getMail = async (req, res) => {
  const { mail } = req.params;

  try {
    const userInfo = await UserModel.findOne({ email: mail }).select(
      "-password"
    );
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).send(error);
  }
};

//Update a specific user
module.exports.updateUser = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu " + id });

  const userFind = await UserModel.findById(id);
  const profi = userFind.profil;
  const lastnam = userFind.lastname;
  const firstnam = userFind.firstname;
  const phon = userFind.phone;
  const addres = userFind.address;
  const countr = userFind.country;
  const cit = userFind.city;

  try {
    const userUpdating = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          profil: req.body.profil ? req.body.profil : profi,
          lastname: req.body.lastname ? req.body.lastname : lastnam,
          firstname: req.body.firstname ? req.body.firstname : firstnam,
          phone: req.body.phone ? req.body.phone : phon,
          address: req.body.address ? req.body.address : addres,
          country: req.body.country ? req.body.country : countr,
          city: req.body.city ? req.body.city : cit,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json(userUpdating);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//Delete a specific user
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu " + id });

  try {
    const userDeleted = await UserModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "User with ID: " + userDeleted._id + " is successfully deleted",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

//Get all users stats
module.exports.getStats = async (req, res) => {
  const months_array = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  try {
    await UserModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]).exec(function (error, result) {
      if (error) {
        res.status(500).send(error);
      } else {
        let tabMonth = [];
        result
          .sort((a, b) => b._id - a._id)
          .map((item) => {
            if (item._id === 1) {
              item._id = "Janvier";
              tabMonth.push(item);
            } else if (item._id === 2) {
              item._id = "Février";
              tabMonth.push(item);
            } else if (item._id === 3) {
              item._id = "Mars";
              tabMonth.push(item);
            } else if (item._id === 4) {
              item._id = "Avril";
              tabMonth.push(item);
            } else if (item._id === 5) {
              item._id = "Mai";
              tabMonth.push(item);
            } else if (item._id === 6) {
              item._id = "Juin";
              tabMonth.push(item);
            } else if (item._id === 7) {
              item._id = "Juillet";
              tabMonth.push(item);
            } else if (item._id === 8) {
              item._id = "Août";
              tabMonth.push(item);
            } else if (item._id === 9) {
              item._id = "Septembre";
              tabMonth.push(item);
            } else if (item._id === 10) {
              item._id = "0ctobre";
              tabMonth.push(item);
            } else if (item._id === 11) {
              item._id = "Novembre";
              tabMonth.push(item);
            } else if (item._id === 12) {
              item._id = "Décembre";
              tabMonth.push(item);
            } else {
              console.log(item);
            }
          });
        res.json(tabMonth);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.createComment = async (req, res) => {
  const {
    commentEmail,
    commentLastname,
    commentFirstname,
    comment,
    isCommentValid,
    image,
  } = req.body;

  try {
    const commentUser = await commentModel.create({
      commentEmail,
      commentLastname,
      commentFirstname,
      comment,
      isCommentValid,
      image,
    });
    res.status(200).json(commentUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getAllComments = async (req, res) => {
  try {
    const allComments = await commentModel.find();
    res.status(200).json(allComments);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.updateComment = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu " + id });

  try {
    const commentUpdated = await commentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          isCommentValid: req.body.isCommentValid,
        },
      },
      { new: true }
    );
    res.status(200).json(commentUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu " + id });

  try {
    const commentDeleted = await commentModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Commentaire supprimé avec succés" });
  } catch (error) {
    res.status(400).json(error);
  }
};
