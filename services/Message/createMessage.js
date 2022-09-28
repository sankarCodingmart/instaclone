import { db } from "../../models";

const Message = db.message;
const createMessage = async (req, res) => {
  const { fromId, toId, postId, messageContent = postId } = req.body;
  await Message.create({
    from_id: fromId,
    to_id: toId,
    message_content: messageContent,
    post_id: postId,
  });
  await res.status(200).send("Message sent successfully");
};
export default createMessage;
