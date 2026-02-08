import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Target, Megaphone, CheckCircle2, TrendingUp, Users, Award, Briefcase, Check, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getLatestPosts } from '../data/blogPosts';

const brands = [
  { name: 'HubSpot', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HubSpot_Logo.svg/1200px-HubSpot_Logo.svg.png' },
  { name: 'NordVPN', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/NordVPN_Horizontal_Logo_%28Blue%29.svg' },
  { name: 'Slack', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png' },
  { name: 'Webflow', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Webflow_logo_2023.svg/2560px-Webflow_logo_2023.svg.png' },
  { name: 'Shopify', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png' },
];

const plans = [
  {
    name: 'Basic Plan',
    price: '$499',
    description: 'Perfect for small businesses looking to gain initial traction in search engines.',
    features: [
      '5 Backlinks per Month',
      'Links from High Authority Sites',
      'Manual Outreach',
      'No spammy links',
      'Basic Keyword Research',
      'Priority Phone and Email Support',
      '50+ Domain rating backlinks',
      'Lost link refund'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Standard Plan',
    price: '$1299',
    tag: 'Best Plan',
    description: 'Designed for businesses that want to scale and need a steady flow of quality backlinks.',
    features: [
      '10 Backlinks per Month',
      'Links from Niche-Specific, Authority Websites',
      'White-Hat, Manual Outreach Strategy',
      'Advanced Keyword & Content Strategy',
      'Priority Phone and Email Support',
      '60+ Domain rating backlinks',
      'Lost link refund'
    ],
    cta: 'Get Started',
    popular: true
  },
  {
    name: 'Pro Plan',
    price: '$1899',
    original: '$2500',
    tag: 'On Sale',
    description: 'Ideal for larger businesses or competitive industries that require advanced link-building strategies.',
    features: [
      '15 Backlinks per Month',
      'Links from Niche-Specific, Authority Websites',
      'Custom Link Building Campaign',
      'White-Hat, Manual Outreach Strategy',
      'Advanced Keyword & Content Strategy',
      'Priority Phone and Email Support',
      'Full Transparency with Real-Time Reporting',
      '24/7 Dedicated Support',
      '70+ Domain rating backlinks',
      'Lost link refund'
    ],
    cta: 'Get Started',
    popular: false
  }
];

export const Home: React.FC = () => {
  const latestPosts = getLatestPosts(3);

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide uppercase">
                Our Services
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Boost Your Online Presence With The Best <span className="text-indigo-600">SEO Services</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                We offer the Best SEO services designed to help businesses thrive in today's competitive digital landscape. Whether you're a small business or a large enterprise, our expert team tailors SEO strategies that drive real results.
              </p>
              <div className="flex flex-wrap gap-4">
                 <Link to="/contact">
                    <button className="bg-lime-400 hover:bg-lime-500 text-indigo-900 px-8 py-3.5 rounded-full font-bold shadow-lg shadow-lime-200 transition-all hover:-translate-y-1">
                    Get Started
                    </button>
                 </Link>
                 <Link to="/pricing">
                    <button className="bg-white border-2 border-gray-200 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 px-8 py-3.5 rounded-full font-bold transition-all">
                    View Pricing
                    </button>
                 </Link>
              </div>
            </div>
            <div className="relative">
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="SEO Illustration" 
                className="relative z-10 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Triple Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid md:grid-cols-3 gap-8">
            {[
                { icon: <Globe className="w-8 h-8" />, title: 'Fully Managed Link Building', desc: 'Set up custom backlink campaigns that deliver consistent authority backlinks for long-term SEO success.' },
                { icon: <Target className="w-8 h-8" />, title: 'White Label Link Building', desc: 'We provide top-tier White Label Link Building services that empower agencies to offer high-quality backlink solutions.' },
                { icon: <Megaphone className="w-8 h-8" />, title: 'Link Insertions', desc: 'Diversified and performance-driven backlinks placed on aged posts for maximum SEO impact, increasing site authority.' }
            ].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all text-center">
                    <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                        {s.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-indigo-600 font-bold text-sm tracking-wider uppercase mb-2 block">Reviews & Rating</span>
        <h2 className="text-3xl font-bold mb-12">Top Than 100+ Brands Work With Rinxa</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {brands.map((brand, i) => (
                 <div key={i} className="h-12 flex items-center justify-center">
                    <img src={brand.url} alt={brand.name} className="h-full object-contain" />
                 </div>
            ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Strategy Meeting" 
                className="rounded-3xl shadow-2xl"
            />
            <div>
                <span className="text-indigo-600 font-bold text-sm tracking-wider uppercase mb-2 block">Why Us?</span>
                <h2 className="text-4xl font-bold mb-6">Why Choose White Label Link Building?</h2>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-lg mb-2">Expand Your Service Offerings</h4>
                        <p className="text-gray-600">Add high quality link building to your portfolio without having to hire a dedicated team. With our white label service, you can offer top-tier backlinks as part of your SEO services.</p>
                    </div>
                    <Link to="/pricing">
                        <button className="bg-lime-400 hover:bg-lime-500 text-indigo-900 px-8 py-3 rounded-full font-bold mt-4">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-indigo-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                    { val: '2K', label: 'Completed Backlinks' },
                    { val: '94%', label: 'Satisfaction Rate' },
                    { val: '1K+', label: 'Customers' },
                    { val: '7', label: 'Years Of Experience' }
                ].map((stat, i) => (
                    <div key={i}>
                        <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.val}</div>
                        <div className="text-indigo-200 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

       {/* Digital Strategy Services */}
       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-indigo-600 font-bold text-sm tracking-wider uppercase mb-2 block">Top SEO Services</span>
        <h2 className="text-4xl font-bold mb-6">Digital Strategy Services</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-16">
            In today's digital world, having a solid digital strategy is essential for driving growth and staying competitive. At Rinxa, our Digital Strategy Services are designed to help businesses navigate the landscape.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-48 h-32 bg-gray-200 rounded-xl mb-6 mx-auto overflow-hidden">
                    <img src="https://picsum.photos/400/300?random=1" className="w-full h-full object-cover" alt="SEO" />
                </div>
                <h3 className="text-xl font-bold mb-3">On-Page SEO</h3>
                <p className="text-gray-500 text-sm">Optimizing your web pages with the right keywords, content, and structure for improved rankings with rinxa.</p>
             </div>
             <div className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-48 h-32 bg-gray-200 rounded-xl mb-6 mx-auto overflow-hidden">
                    <img src="https://picsum.photos/400/300?random=2" className="w-full h-full object-cover" alt="Off-Page" />
                </div>
                <h3 className="text-xl font-bold mb-3">Off-Page SEO</h3>
                <p className="text-gray-500 text-sm">Building a strong backlink profile and increasing your site's authority through guest posts and outreach.</p>
             </div>
             <div className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-48 h-32 bg-gray-200 rounded-xl mb-6 mx-auto overflow-hidden">
                    <img src="https://picsum.photos/400/300?random=3" className="w-full h-full object-cover" alt="Technical" />
                </div>
                <h3 className="text-xl font-bold mb-3">Technical SEO</h3>
                <p className="text-gray-500 text-sm">Enhancing your website's backend for faster load times, mobile optimization, and better user experience.</p>
             </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-16">
             <span className="text-indigo-600 font-bold uppercase text-xs tracking-wider">Pricing</span>
             <h2 className="text-4xl font-bold mt-2">Affordable SEO Packages</h2>
             <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Choose the perfect plan to boost your rankings with high-quality backlinks.</p>
          </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative bg-white rounded-3xl p-8 border-2 ${plan.popular ? 'border-indigo-600 shadow-2xl scale-105 z-10' : 'border-gray-100 shadow-lg'} flex flex-col`}>
              {plan.tag && (
                <span className={`absolute top-0 right-0 m-6 px-4 py-1 rounded-full text-xs font-bold uppercase ${plan.tag === 'Best Plan' ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'}`}>
                  {plan.tag}
                </span>
              )}
               {plan.name === 'Basic Plan' && (
                  <span className="absolute top-0 left-0 m-6 px-4 py-1 rounded-full text-xs font-bold uppercase bg-lime-300 text-indigo-900">
                      Cheapest Plan
                  </span>
               )}

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                 {plan.original && <span className="text-gray-400 line-through text-lg">{plan.original}</span>}
                 <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                 <span className="text-gray-500">/ Plan</span>
              </div>
              <p className="text-gray-600 text-sm mb-8 min-h-[60px]">{plan.description}</p>
              
              <Link to="/contact" className="w-full">
                <button className={`w-full py-4 rounded-full font-bold transition-all ${plan.popular ? 'bg-black text-white hover:bg-gray-800' : 'bg-black text-white hover:bg-gray-800'}`}>
                    {plan.cta}
                </button>
              </Link>

              <div className="mt-8 space-y-4 flex-grow">
                <p className="font-bold text-gray-900 mb-4">What's Included?</p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                        <Check size={16} className="text-gray-900" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Satisfaction Image Strip */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/10"></div>
        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover" alt="Happy Clients" />
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-r from-white/90 to-transparent">
             <div className="max-w-xl text-left mr-auto">
                 <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">SATISFIED <br/> CUSTOMERS LIKE</h2>
                 <p className="text-gray-700 text-lg">Over 100+ satisfied clients trust Rinxa for top-quality backlinks, boosting their organic traffic from 10k to 100k in just 6 months!</p>
             </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-bold text-sm tracking-wider uppercase mb-2 block">Latest Insights</span>
          <h2 className="text-4xl font-bold mb-4">SEO Tips & Industry Trends</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay ahead with expert insights, strategies, and case studies from our blog
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.category.color}`}>
                    {post.category.name}
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
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm group">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Blog Posts Button */}
        <div className="text-center">
          <Link to="/blog">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              View All Blog Posts
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};