import { db } from "../../models";

const Account = db.account;

const verifySignUp = async (req, res, next) => {
  try {
    let user = await Account.findOne({
      where: {
        user_name: req.body.userName,
      },
    });
    if (user) {
      res.status(400).send({
        message: "Failed! This username is already in use!",
      });
      return;
    }
    user = await Account.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(400).send({
        message: "Failed! This email is already in use!",
      });
      return;
    }

    user = await Account.findOne({
      where: {
        phone_number: req.body.phoneNumber,
      },
    });
    if (user) {
      res.status(400).send({
        message: "Failed! This phonenumber is already in use!",
      });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export default verifySignUp;
