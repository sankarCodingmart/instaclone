import { db } from "../../models";
import config from "../../config/auth.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Account = db.account;

const signUp = async (req, res) => {
  try {
    const account = await Account.create({
      user_name: req.body.user_name,
      password: bcrypt.hashSync(req.body.password, 8),
      email: req.body.email,
      phone_number: req.body.phone_number,
    });
    if (account) res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const signIn = async (req, res) => {
  try {
    let account = await Account.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });
    account =
      account ??
      (await Account.findOne({
        where: {
          email: req.body.email,
        },
      }));
    account =
      account ??
      (await Account.findOne({
        where: {
          phone_number: req.body.phone_number,
        },
      }));
    const passwordValid = bcrypt.compareSync(
      req.body.password,
      account.password
    );
    if (!passwordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }
    var token = jwt.sign({ id: account.id }, config.secret, {
      expiresIn: 86400,
    });
    return res.status(200).send({
      id: account.id,
      username: account.username,
      email: account.email,
      phone_number: account.phone_number,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export { signUp, signIn };
