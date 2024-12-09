const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

//Paramètres JWT
const expires = "5 day";

const secret = fs.readFileSync(path.resolve(__dirname, "private.key"));

function createJWT(pseudo) {
  //La lib nous génère le token
  //On définit notre payload
  return jwt.sign(
    {
      pseudo,
    },
    secret,
    {
      expiresIn: expires,
    }
  );
}

//Fonction qui extrait le token du header
function extractBearerToken(header) {
  if (typeof header !== "string") return false;

  const matches = header.match(/(bearer)\s+(\S+)/i);

  return matches && matches[2];
}

//Middleware : authentification via jwt

function checkTokenMiddleware(req, res, next) {
  //Vérifier si il y a un JWT ?
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  if (!token) {
    return res
      .sendStatus(401)
  }
  //Vérifier le token
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res
        .sendStatus(401)
    } else {
      //On utilise la propriété res.locals pour passer des valeurs entre fonctions middleware
      //Voir https://expressjs.com/en/api.html#res.locals
      res.locals.decodedToken = decodedToken;
      next(); //appeler la fonction middleware suivante (enregistrée dans le routeur)
    }
  });
}

module.exports = { createJWT, checkTokenMiddleware };
