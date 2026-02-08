import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { blogService, BlogPostDTO, setAuthToken } from '../../services/api';
import { Pencil, Trash2, Plus, Search, LogOut, Calendar, Tag } from 'lucide-react';
import { DeleteConfirmModal } from '../../components/DeleteConfirmModal';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPostDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; post: BlogPostDTO | null }>({
    isOpen: false,
    post: null
  });

  const categories = ['All', 'SEO', 'Link Building', 'Content Strategy', 'Case Study', 'Tips & Tricks'];

  useEffect(() => {
    loadPosts();
  }, [searchTerm, selectedCategory]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      const params: Record<string, string> = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;

      const data = await blogService.getAllPosts(params);
      setPosts(data.posts || data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load posts');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (post: BlogPostDTO) => {
    setDeleteModal({ isOpen: true, post });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.post) return;

    const promise = (async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);
      await blogService.deletePost(deleteModal.post!._id!);
      setPosts(posts.filter((post) => post._id !== deleteModal.post!._id));
    })();

    toast.promise(promise, {
      loading: 'Deleting post...',
      success: 'Post deleted successfully!',
      error: (err: any) => err.response?.data?.error || 'Failed to delete post'
    });

    try {
      await promise;
    } finally {
      setDeleteModal({ isOpen: false, post: null });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/admin/sign-in');
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, post: null })}
        onConfirm={handleDeleteConfirm}
        title={deleteModal.post?.title || ''}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">Blog Management</h1>
              <Link
                to="/admin/create"
                className="inline-flex items-center px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                New Post
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-5 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-3 text-sm text-gray-500">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 text-center">
              <p className="text-sm text-red-600 mb-3">{error}</p>
              <button onClick={loadPosts} className="px-4 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Retry
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-10 text-center border border-gray-200">
              <p className="text-sm text-gray-600 mb-3">No posts found</p>
              <Link to="/admin/create" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Create your first post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>{post.tags.length} tags</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <Link
                        to={`/admin/edit/${post._id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(post)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
