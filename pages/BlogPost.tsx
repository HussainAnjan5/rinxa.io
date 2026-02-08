import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Tag } from 'lucide-react';
import { blogService, getImageUrl } from '../src/services/api';

interface BlogPostAPI {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  date: string;
  readTime: string;
  tags: string[];
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostAPI | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'SEO': 'bg-indigo-100 text-indigo-800',
      'Link Building': 'bg-lime-100 text-lime-800',
      'Content Strategy': 'bg-purple-100 text-purple-800',
      'Case Study': 'bg-blue-100 text-blue-800',
      'Tips & Tricks': 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const postData = await blogService.getPostBySlug(slug!);
      setPost(postData);

      // Load related posts
      const related = await blogService.getPostsByCategory(postData.category, 3);
      setRelatedPosts(related.filter((p: BlogPostAPI) => p.slug !== slug));
      setError(false);
    } catch (err) {
      console.error('Error loading post:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;

    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 pb-8 mb-8 border-b">
            <img
              src={getImageUrl(post.author.avatar)}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900 text-lg">{post.author.name}</p>
              <p className="text-gray-600">{post.author.bio}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={getImageUrl(post.thumbnail)}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              lineHeight: '1.8',
              fontSize: '1.125rem',
            }}
          />

          {/* Tags */}
          <div className="mb-8 pb-8 border-b">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                >
                  <Tag className="w-4 h-4" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="mb-12 pb-12 border-b">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share this article
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              <img
                src={getImageUrl(post.author.avatar)}
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 text-lg mb-1">{post.author.name}</p>
                <p className="text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={getImageUrl(relatedPost.thumbnail)}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Rankings?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Let our experts create a custom SEO strategy for your business
          </p>
          <Link
            to="/contact"
            className="inline-block bg-lime-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-lime-300 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* Custom Styles for Article Content */}
      <style>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          color: #4b5563;
          margin-bottom: 1.25rem;
        }
        .prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: #4b5563;
        }
        .prose ul li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          font-weight: 600;
          color: #1f2937;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
