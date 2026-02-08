import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogAuthor {
  name: string;
  avatar: string;
  bio: string;
}

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: IBlogAuthor;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogAuthorSchema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  bio: { type: String, required: true }
});

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    author: {
      type: BlogAuthorSchema,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['SEO', 'Link Building', 'Content Strategy', 'Case Study', 'Tips & Tricks']
    },
    date: {
      type: String,
      required: true
    },
    readTime: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Index for search functionality
BlogPostSchema.index({ title: 'text', excerpt: 'text', tags: 'text' });

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
