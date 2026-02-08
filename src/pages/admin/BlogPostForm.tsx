import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { blogService, CreateBlogPostDTO, setAuthToken } from '../../services/api';
import { ArrowLeft, Upload, Image as ImageIcon, Save } from 'lucide-react';

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const BlogPostForm: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<CreateBlogPostDTO>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'SEO',
    tags: [],
    thumbnail: '',
    author: { name: '', avatar: '', bio: '' },
    readTime: 0,
    date: new Date().toISOString().split('T')[0],
  });

  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const categories = ['SEO', 'Link Building', 'Content Strategy', 'Case Study', 'Tips & Tricks'];

  useEffect(() => {
    if (isEditMode && id) {
      loadPost();
    }
  }, [id, isEditMode]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      const post = await blogService.getPostById(id!);
      
      // Convert relative thumbnail URLs to absolute URLs
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const backendBaseUrl = apiBaseUrl.replace('/api', '');
      const thumbnailUrl = post.thumbnail.startsWith('http') 
        ? post.thumbnail 
        : `${backendBaseUrl}${post.thumbnail}`;
      
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags || [],
        thumbnail: thumbnailUrl,
        author: post.author,
        readTime: post.readTime,
        date: post.date,
      });
      setImagePreview(thumbnailUrl);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to load post');
      console.error('Error loading post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return formData.thumbnail;

    const token = localStorage.getItem('authToken');
    setAuthToken(token);
    const response = await blogService.uploadImage(imageFile);
    return response.url;
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return toast.error('Title is required');
    if (!formData.slug.trim()) return toast.error('URL slug is required');
    if (!formData.excerpt.trim()) return toast.error('Excerpt is required');
    if (!formData.content.trim()) return toast.error('Content is required');
    if (!formData.author.name.trim()) return toast.error('Author name is required');
    if (!formData.author.avatar.trim()) return toast.error('Author avatar is required');
    if (!formData.author.bio?.trim()) return toast.error('Author bio is required');
    if (!formData.thumbnail.trim() && !imageFile) return toast.error('Thumbnail is required');

    setLoading(true);

    const promise = (async () => {
      try {
        let thumbnailUrl = formData.thumbnail;
        if (imageFile) {
          thumbnailUrl = await handleImageUpload();
        }

        const postData: CreateBlogPostDTO = {
          ...formData,
          thumbnail: thumbnailUrl,
          date: formData.date || new Date().toISOString().split('T')[0],
        };

        const token = localStorage.getItem('authToken');
        setAuthToken(token);

        if (isEditMode && id) {
          await blogService.updatePost(id, postData);
        } else {
          await blogService.createPost(postData);
        }
      } catch (error) {
        setLoading(false);
        throw error;
      }
      setLoading(false);
    })();

    toast.promise(promise, {
      loading: isEditMode ? 'Updating post...' : 'Creating post...',
      success: () => {
        setTimeout(() => navigate('/admin'), 500);
        return isEditMode ? 'Post updated successfully!' : 'Post created successfully!';
      },
      error: (err: any) => err.response?.data?.error || (isEditMode ? 'Failed to update post' : 'Failed to create post')
    });
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditMode ? 'Edit Post' : 'Create New Post'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setFormData({ 
                        ...formData, 
                        title: newTitle,
                        slug: !isEditMode ? generateSlug(newTitle) : formData.slug
                      });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Read Time (minutes)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">URL Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="url-slug-for-post"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">Auto-generated URL identifier</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Publish Date</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Excerpt *</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Brief description (140 characters)"
                    maxLength={140}
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">{formData.excerpt.length}/140 characters</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Content *</h2>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono"
                placeholder="Write your blog content here... (Markdown supported)"
                required
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Featured Image</h2>
              <div className="space-y-3">
                {imagePreview && (
                  <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border border-gray-200">
                    <Upload className="w-4 h-4" />
                    {imageFile ? 'Change Image' : 'Upload Image'}
                    <input type="file" onChange={handleImageSelect} accept="image/*" className="hidden" />
                  </label>
                  {imageFile && <span className="text-xs text-gray-600">{imageFile.name}</span>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Or use URL</label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Author Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Author Name *</label>
                  <input
                    type="text"
                    value={formData.author.name}
                    onChange={(e) => setFormData({ ...formData, author: { ...formData.author, name: e.target.value } })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Author Avatar URL</label>
                  <input
                    type="url"
                    value={formData.author.avatar}
                    onChange={(e) => setFormData({ ...formData, author: { ...formData.author, avatar: e.target.value } })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Author Bio</label>
                  <textarea
                    value={formData.author.bio || ''}
                    onChange={(e) => setFormData({ ...formData, author: { ...formData.author, bio: e.target.value } })}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Author biography"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Tags</h2>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Add a tag (press Enter)"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200"
                  >
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-indigo-900">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
