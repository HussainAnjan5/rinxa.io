import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get full image URL
export const getImageUrl = (url: string): string => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Convert relative URLs to absolute
  const backendBaseUrl = API_BASE_URL.replace('/api', '');
  return `${backendBaseUrl}${url}`;
};

// Add auth token to requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export interface BlogPostDTO {
  _id?: string;
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

export interface CreateBlogPostDTO {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  category: string;
  date?: string;
  readTime: number | string;
  tags: string[];
}

// Blog API functions
export const blogService = {
  // Get all posts with optional filtering
  getAllPosts: async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  // Get single post by slug
  getPostBySlug: async (slug: string) => {
    const response = await api.get(`/blogs/slug/${slug}`);
    return response.data;
  },

  // Get single post by id
  getPostById: async (id: string) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  // Get posts by category
  getPostsByCategory: async (category: string, limit?: number) => {
    const response = await api.get(`/blogs/category/${category}`, { params: { limit } });
    return response.data;
  },

  // Get latest posts
  getLatestPosts: async (limit: number = 5) => {
    const response = await api.get('/blogs/latest', { params: { limit } });
    return response.data;
  },

  // Create new post (admin only)
  createPost: async (postData: BlogPostDTO) => {
    const response = await api.post('/blogs', postData);
    return response.data;
  },

  // Update post (admin only)
  updatePost: async (id: string, postData: BlogPostDTO) => {
    const response = await api.put(`/blogs/${id}`, postData);
    return response.data;
  },

  // Delete post (admin only)
  deletePost: async (id: string) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },

  // Upload image
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

export default api;
