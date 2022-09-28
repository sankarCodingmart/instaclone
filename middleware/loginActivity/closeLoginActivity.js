import { db } from "../../models";
const LoginActivity = db.loginActivity;
const closeLoginActivity = async (req, res, next) => {
  try {
    let token = req.cookies.jwt || req.headers["x-access-token"];
    await LoginActivity.update(
      {
        active_now: false,
      },
      {
        where: {
          token: token,
        },
      }
    );
    next();
  } catch (err) {
    res.status(200).send(err.message);
  }
};
export default closeLoginActivity;
