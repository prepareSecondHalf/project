const express = require('express');
const { Post } = require('../../models/post');

const router = express.Router();

// get all posts
router.get('/', async (req, res) => {
  try {
    console.log('check this out!!!: ', req.query.keyword);
    const keyword = req.query.keyword;

    const posts = await Post.find(
      !!keyword
        ? {
            $or: [
              { title: !!keyword && keyword },
              { contents: !!keyword && keyword },
              { creator: !!keyword && keyword },
              { lang: keyword },
            ],
          }
        : {}
    );

    return res.status(200).json({ posts });
  } catch (error) {
    console.log('error occured when getting posts');
    console.dir(error);
  }
});

// get a post detail
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json({ post });
  } catch (error) {
    console.log('error occured when getting post detail');
    console.dir(error);
  }
});

// create a post
router.post('/', async (req, res) => {
  console.log('getting req', req.body);
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    return res.status(200).json({ newPost });
  } catch (error) {
    console.log('error occured when creating a new post');
    console.dir(error);
  }
});

// update a post
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.params);
  const allowed = ['name', 'email', 'password'];
  const isValid = updates.every((update) => allowed.includes(update));
  if (!isValid) {
    return res.status(400).send({ error: 'Invalid Updates.' });
  }

  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.params, {
      new: true,
      runValidators: true,
    });
    if (!post) res.status(404).send();
    return res.status(200).json({ post });
  } catch (error) {
    console.log('error occured when creating a new post');
    console.dir(error);
  }
});

// delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) res.status(404).send();
    return res.status(200).json({ post });
  } catch (error) {
    console.log('error occured when creating a new post');
    console.dir(error);
  }
});

module.exports = router;
