import { db } from "../../models";

const Message = db.message;
const deleteMessage = async (req, res) => {
  const { messageId } = req.body;
  await Message.create({
    message_id: messageId,
  });
  await res.status(200).send("Deleted successfully");
};
export default deleteMessage;
