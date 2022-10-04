import { db } from "../../models";

const Notes = db.notes;

const createNotes = async (req, res) => {
  try {
    let { userId, noteContent, onlyCloseFriends } = req.body;

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
