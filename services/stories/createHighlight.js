import { db } from "../../models";

const Account = db.account;
const Stories = db.stories;
const Highlight = db.highlight;

const createHighlight = async (req, res) => {
  try {
    let { user_id, storyIds, highlightName, highlightUrl } = req.body;
    storyIds.forEach(async (story_id) => {
      await Highlight.create({
        user_id: user_id,
        highlight_name: highlightName,
        story_id: story_id,
        highlight_url: highlightUrl,
      });
    });
    await res.status(200).send("Highlighted created successfully");
  } catch (err) {
    console.log(err);
    await res.status(500).send(err.message);
  }
};
export default createHighlight;
