import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Linkedin, Youtube, Instagram, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600";

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100/50 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center text-indigo-900">
                   <Rocket size={24} fill="currentColor" strokeWidth={0} />
                </div>
                <span className="text-2xl font-bold text-indigo-900">Rinxa.io</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/pricing" className={isActive('/pricing')}>Pricing</Link>
              <Link to="/saas" className={isActive('/saas')}>SaaS Link Building</Link>
              <Link to="/blog" className={isActive('/blog')}>Blog</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Link to="/contact">
                <button className="bg-lime-400 hover:bg-lime-500 text-indigo-900 px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-lime-200">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Home</Link>
              <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Pricing</Link>
              <Link to="/saas" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">SaaS Link Building</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Blog</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Contact</Link>
              <div className="pt-4">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full bg-lime-400 text-indigo-900 px-4 py-3 rounded-full font-bold">
                    Get Started
                    </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white pt-20 pb-10 relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-indigo-700 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center mb-16 shadow-2xl">
             <div className="mb-6 md:mb-0">
                <h4 className="text-lime-400 font-bold uppercase tracking-wider text-sm mb-2">Optimize Your Marketing</h4>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Find Out Your Website's Ranking On Google</h2>
             </div>
             <button className="bg-lime-400 hover:bg-lime-500 text-indigo-900 px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
                Get Started
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-indigo-500 pb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-900">
                   <Rocket size={24} fill="currentColor" strokeWidth={0} />
                </div>
                <span className="text-2xl font-bold text-white">Rinxa.io</span>
              </div>
              <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                Rinxa.io specializes in providing SEO (Search Engine Optimization) and digital marketing services to businesses looking to enhance their online presence and visibility.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-lime-400 hover:text-indigo-900 transition-colors">
                    <Linkedin size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-lime-400 hover:text-indigo-900 transition-colors">
                    <Youtube size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-lime-400 hover:text-indigo-900 transition-colors">
                    <Instagram size={16} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Company</h3>
              <ul className="space-y-4 text-indigo-200">
                <li><Link to="/pricing" className="hover:text-lime-400 transition-colors">Link Building Service</Link></li>
                <li><Link to="/saas" className="hover:text-lime-400 transition-colors">Guest Posting Service</Link></li>
                <li><Link to="/pricing" className="hover:text-lime-400 transition-colors">Buy Backlinks</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-4 text-indigo-200">
                <li><Link to="/pricing" className="hover:text-lime-400 transition-colors">Pricing</Link></li>
                <li><Link to="/saas" className="hover:text-lime-400 transition-colors">SaaS SEO Services</Link></li>
                <li><Link to="/" className="hover:text-lime-400 transition-colors">Link Building & Outreach</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Support</h3>
              <ul className="space-y-4 text-indigo-200">
                <li><Link to="/contact" className="hover:text-lime-400 transition-colors">Refund Policy</Link></li>
                <li><Link to="/contact" className="hover:text-lime-400 transition-colors">Rinxa Blogs</Link></li>
                <li><Link to="/contact" className="hover:text-lime-400 transition-colors">What CEO ask about rinxa</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-indigo-300 text-sm">
            <p>&copy; {new Date().getFullYear()} Rinxa.io. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};