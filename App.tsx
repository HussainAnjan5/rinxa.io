import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './src/components/ProtectedRoute';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { SaaS } from './pages/SaaS';
import { Contact } from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { AdminDashboard } from './src/pages/admin/Dashboard';
import { BlogPostForm } from './src/pages/admin/BlogPostForm';
import { SignIn } from './src/pages/admin/SignIn';

function ScrollToTop() {
  const { pathname } = React.useMemo(() => ({ pathname: window.location.hash }), []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <HashRouter>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/saas" element={<Layout><SaaS /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
        
        {/* Admin Auth Routes */}
        <Route path="/admin/sign-in" element={<SignIn />} />
        
        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <ProtectedRoute>
              <BlogPostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute>
              <BlogPostForm isEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
    </>
  );
}

export default App;
