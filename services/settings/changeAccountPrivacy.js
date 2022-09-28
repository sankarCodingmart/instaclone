import { db } from "../../models";
const User = db.user;
const AccountPrivacy = db.accountPrivacy;
const changeAccountPrivacy = async (req, res) => {
  const { userId, targetId, privacyType, privacyValue } = req.body;
  await AccountPrivacy.create({
    user_id: userId,
    target_id: targetId,
    privacy_type: privacyType,
    privacy_value: privacyValue,
  });
  res.status(200).send("Privacy changed successfully");
};
export default changeAccountPrivacy;
