import { db } from "../../models";
import Joi from "joi";

const Notes = db.notes;
const createNotes = async (req, res) => {
  try {
    const Schema = Joi.object().keys({
      noteContent: Joi.string().min(2).max(68).required(),
      onlyCloseFriends: Joi.boolean().required(),
    });
    const result = Schema.validate(req.body);
    if (result.error) {
      console.log(result.error);
      return res.status(500).send({ error: result.error });
    }

    let { noteContent, onlyCloseFriends } = req.body;
    let userId = req.params.userId;
    await Notes.create({
      user_id: userId,
      only_close_friends: onlyCloseFriends,
      note_content: noteContent,
    });
    await res.status(200).send("Note created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
export default createNotes;
