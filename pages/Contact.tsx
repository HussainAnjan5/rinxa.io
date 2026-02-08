import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              Don't Miss Out On Any Potential Clients Chat With Us Today!
            </h1>
            <p className="text-gray-600 mb-12 text-lg">
              In order to make sure your website is user friendly and optimized for Google's algorithm, our on-site optimization experts clean up the code and copy.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">+91 3140705067</h3>
                  <p className="text-gray-500">Phone</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">marketing@rinxa.io</h3>
                  <p className="text-gray-500">Email</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">1500 N GRANT ST STE R DENVER CO 80203 US</h3>
                  <p className="text-gray-500">Address</p>
                </div>
              </div>
            </div>
            
            {/* Abstract curve decoration */}
             <div className="mt-12 ml-4">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 50 Q 25 25 50 50 T 90 50" stroke="black" strokeWidth="2" fill="none" />
                    <circle cx="10" cy="50" r="3" fill="black" />
                    <circle cx="90" cy="50" r="3" fill="black" />
                </svg>
             </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your message (optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-500 text-indigo-900 font-bold py-4 rounded-full transition-all shadow-lg hover:shadow-lime-200 transform hover:-translate-y-1"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};