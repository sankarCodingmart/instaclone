import { db } from "../../models";
const LoginActivity = db.loginActivity;
const createLoginActivity = async (details) => {
  try {
    const { userId, location, deviceName, token } = details;
    await LoginActivity.create({
      user_id: userId,
      location: location,
      device_name: deviceName,
      active_now: true,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};
export default createLoginActivity;
