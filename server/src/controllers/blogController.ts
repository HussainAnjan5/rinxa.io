import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';
import { validationResult } from 'express-validator';

// Get all blog posts with filtering
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    
    let query: any = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search as string };
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await BlogPost.countDocuments(query);

    res.json({
      posts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get single post by slug
export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// Get single post by id
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post by id:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// Create new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { slug } = req.body;
    
    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const post = new BlogPost(req.body);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Update post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const post = await BlogPost.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Get posts by category
export const getPostsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;

    const posts = await BlogPost.find({ category })
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get latest posts
export const getLatestPosts = async (req: Request, res: Response) => {
  try {
    const { limit = 5 } = req.query;

    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json(posts);
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};
