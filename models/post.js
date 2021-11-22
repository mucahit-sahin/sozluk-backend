import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  slug: String,
  creator: String,
  comments: [
    {
      message: String,
      username: String,
      likes: { type: [String], default: [] },
      unLikes: { type: [String], default: [] },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  changedAt: {
    type: Date,
    default: new Date(),
  },
});

var Post = mongoose.model("Post", postSchema);

export default Post;
