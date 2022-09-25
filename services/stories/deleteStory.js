import { db } from "../../models";
const Stories = db.stories;

const deleteStory = async (req, res) => {
  let { story_id } = req.body;
  await Stories.destroy({
    where: {
      story_id: story_id,
    },
  });
  res.status(200).send("deleted successfully");
};
export default deleteStory;
