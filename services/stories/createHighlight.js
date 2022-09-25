import { db } from "../../models";

const Account = db.account;
const Stories = db.stories;
const Highlight = db.highilght;

const createHighlight = async (req, res) => {
  try {
    let { user_id, storyIds, highlight_name } = req.body;
    storyIds.forEach(async (story_id) => {
      await Highlight.create({
        user_id: user_id,
        highlight_name: highlight_name,
        story_id: story_id,
      });
    });
    await res.status(200).send("Highlighted created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
export default createHighlight;
