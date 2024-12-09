const { Admin } = require("../models");
const { createJWT } = require("../jwt");
const { hashPassword } = require("../bcrypt");

exports.login = async (req, res) => {
  try {
    // Login
    if (!req.body.pseudo || !req.body.password) {
      return res.status(400).json({ msg: "Impossible de vous authentifier" });
    }
    const hashedPassword = await hashPassword(req.body.password);

    const admin = await Admin.findOne({
      where: {
        pseudo: req.body.pseudo,
        password: hashedPassword,
      },
    });

    if (admin === null) {
      return res.status(400).json({ msg: "Impossible de vous authentifier" });
    }

    //Authentifié, signer et délivrer un jwt
    const jwt = createJWT(admin.pseudo); // Correction de la création du JWT

    //Retourne le jwt au client
    res.status(201).json({
      access_token: jwt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
