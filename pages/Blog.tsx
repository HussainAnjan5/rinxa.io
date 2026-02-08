import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Search } from 'lucide-react';
import { blogService, getImageUrl } from '../src/services/api';
import { blogPosts as staticBlogPosts } from '../data/blogPosts';
interface BlogPostAPI {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
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

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<BlogPostAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'SEO', 'Link Building', 'Content Strategy', 'Case Study', 'Tips & Tricks'];

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
    loadPosts();
  }, [selectedCategory, searchQuery]);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);

    // Convert static blog posts to API format - ALWAYS AVAILABLE
    const convertedStaticPosts: BlogPostAPI[] = staticBlogPosts.map(post => ({
      _id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      thumbnail: post.thumbnail,
      author: {
        name: post.author.name,
        avatar: post.author.avatar,
        bio: post.author.role,
      },
      category: post.category.name,
      date: post.date,
      readTime: post.readTime,
      tags: post.tags,
    }));

    // Filter static posts based on category and search
    let filteredStaticPosts = convertedStaticPosts;
    if (selectedCategory !== 'All') {
      filteredStaticPosts = convertedStaticPosts.filter(
        post => post.category === selectedCategory
      );
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredStaticPosts = filteredStaticPosts.filter(
        post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Try to fetch API posts (optional - won't affect static posts if fails)
    let apiPosts: BlogPostAPI[] = [];
    try {
      const params: any = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      
      const data = await blogService.getAllPosts(params);
      apiPosts = data.posts || data || [];
    } catch (apiError) {
      console.log('API posts not available, showing static posts only:', apiError);
      // Continue with static posts only - no error shown to user
    }

    // Merge static and API posts - static posts are ALWAYS included
    const allPosts = [...filteredStaticPosts, ...apiPosts];
    setPosts(allPosts);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">SEO Insights & Strategies</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Expert tips, industry trends, and actionable advice to boost your search rankings
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'All' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <button
                onClick={loadPosts}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Retry
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                No articles found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(post.thumbnail)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <img
                        src={getImageUrl(post.author.avatar)}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.author.bio.substring(0, 40)}...</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Improve Your SEO?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Get expert help from our team of SEO professionals
          </p>
          <Link
            to="/contact"
            className="inline-block bg-lime-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-lime-300 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
