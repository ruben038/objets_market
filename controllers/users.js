import User from "../models/users.js";
import bcrypt, { hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
function signup(req, res, next) {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => res.status(201).json({ user }))
      .catch((error) => res.status(400).json({ error: error }));
  });
}
function login(req, res, next) {
  User.findOne(req.body.email)
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Email ou  Mot de passe incorrect" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: "Email ou mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jsonwebtoken.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
}

const functions = { signup, login };
export default functions;
