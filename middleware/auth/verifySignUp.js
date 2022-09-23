import { db } from "../../models";

const Account = db.account;

const verifySignUp = async (req, res, next) => {
  try {
    let user = await Account.findOne({
      where: {
        user_name: req.body.user_name,
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
        phone_number: req.body.phone_number,
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
// import { db } from "../models";

// const Account = db.account;

// export default checkDuplicateSignup = (req, res, next) => {
//   Account.findOne({
//     where: {
//       user_name: req.body.user_name,
//     },
//   }).then((user) => {
//     if (user) {
//       res.status(400).send({
//         message: "Failed! This username is already in use!",
//       });
//       return;
//     }

//     Account.findOne({
//       where: {
//         email: req.body.email,
//       },
//     }).then((user) => {
//       if (user) {
//         res.status(400).send({
//           message: "Failed! This email is already in use!",
//         });
//         return;
//       }

//       Account.findOne({
//         where: {
//           phone_number: req.body.phone_number,
//         },
//       }).then((user) => {
//         if (user) {
//           res.status(400).send({
//             message: "Failed! This phonenumber is already in use!",
//           });
//           return;
//         }

//         next();
//       });
//     });
//   });
// };
