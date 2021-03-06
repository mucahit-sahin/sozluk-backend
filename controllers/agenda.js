import Post from "../models/post.js";

export const getAgenda = async (req, res) => {
  try {
    const response = [];
    let date = new Date().getTime();
    const LIMIT = 10;
    const posts = await Post.find().sort({ changedAt: -1 }).limit(LIMIT);
    posts
      .filter((post) => {
        return (
          post.changedAt.toISOString().slice(0, 10) ==
          new Date(date).toISOString().slice(0, 10)
        );
      })
      .map((post) => {
        response.push({
          id: post._id,
          title: post.title,
          slug: post.slug,
          changedAt: post.changedAt,
          todayCount: post.comments.filter((comment) => {
            return (
              comment.createdAt.toISOString().slice(0, 10) ==
              new Date(date).toISOString().slice(0, 10)
            );
          }).length,
        });
      });
    res.json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getYesterdayAgenda = async (req, res) => {
  try {
    const response = [];
    let date = new Date().getTime();
    const LIMIT = 10;
    const posts = await Post.find().sort({ changedAt: -1 }).limit(LIMIT);
    posts
      .filter((post) => {
        return (
          post.changedAt.toISOString().slice(0, 10) ==
          new Date(date - 86400000).toISOString().slice(0, 10)
        );
      })
      .map((post) => {
        response.push({
          id: post._id,
          title: post.title,
          slug: post.slug,
          changedAt: post.changedAt,
          yesterdayCount: post.comments.filter((comment) => {
            return (
              comment.createdAt.toISOString().slice(0, 10) ==
              new Date(date - 86400000).toISOString().slice(0, 10)
            );
          }).length,
        });
      });
    res.json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// yesterday's most liked posts
export const getYesterdayLikedPosts = async (req, res) => {
  try {
    const response = [];
    let date = new Date().getTime();
    const LIMIT = 10;
    const posts = await Post.find().sort({ changedAt: -1 }).limit(LIMIT);
    posts
      .filter((post) => {
        return (
          post.changedAt.toISOString().slice(0, 10) ==
          new Date(date - 86400000).toISOString().slice(0, 10)
        );
      })
      .sort((a, b) => {
        return b.comments[0].likes.length > a.comments[0].likes.length;
      })
      .map((post) => {
        response.push({
          id: post._id,
          title: post.title,
          slug: post.slug,
          changedAt: post.changedAt,
          yesterdayLikedCount: post.comments[0].likes.length,
        });
      });
    res.json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
