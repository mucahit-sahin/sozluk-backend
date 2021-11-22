import Post from "../models/post.js";
import User from "../models/user.js";

export const getLastPosts = async (req, res) => {
  try {
    const LIMIT = 10;
    const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT);

    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const isTherePost = async (req, res) => {
  const { title } = req.params;

  const post = await Post.findOne({ title: title });
  if (post) res.status(200).json(post.slug);
  else res.status(200).json();
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  const { page } = req.query;

  try {
    const LIMIT = 10;
    const post = await Post.findOne({ slug: id });
    if (!post) {
      return res.status(200).json({ post: {} });
    }

    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = post.comments.length;

    const comments = post.comments.slice(startIndex, startIndex + LIMIT);

    res.status(200).json({
      creator: post.username,
      title: post.title,
      slug: post.slug,
      createdAt: post.createdAt,
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
    title: post.title,
    slug: post.slug,
    creator: post.creator,
    createdAt: new Date().toISOString(),
  });

  const comment = {
    message: post.message,
    username: post.creator,
  };

  newPostMessage.comments.unshift(comment);
  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const addCommentToPost = async (req, res) => {
  const post = await Post.findOne({ title: req.params.id });
  const user = await User.findOne({ email: req.user.email });

  const comment = {
    message: req.body.message,
    username: user.username,
  };

  post.comments.push(comment);
  try {
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
