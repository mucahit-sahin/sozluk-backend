import Post from "../models/post.js";

export const getLastPosts = async (req, res) => {
  try {
    const LIMIT = 10;
    const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT);

    res.json({
      data: posts,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const { page } = req.query;

  try {
    const LIMIT = 10;
    const post = await Post.find({ title: id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await post.comment.length;

    const comments = post.comment.slice(startIndex, startIndex + LIMIT);

    res.status(200).json({
      ...post,
      comments,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new Post({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
