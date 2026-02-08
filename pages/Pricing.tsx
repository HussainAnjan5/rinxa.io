import React from 'react';
import { Check, Info, ArrowRight } from 'lucide-react';
import { FaqSection } from '../components/FaqSection';
import { Link } from 'react-router-dom';

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

const faqs = [
  { question: "What is Link Building in SEO?", answer: "Link building is the practice of acquiring hyperlinks from other websites to your own. A hyperlink (usually just called a link) is a way for users to navigate between pages on the internet. Search engines use links to crawl the web." },
  { question: "Why is Link Building Important for SEO?", answer: "Link building is important because it is a major factor in how Google ranks web pages. Google notes that: 'In general, webmasters can improve the rank of their sites by increasing the number of high-quality sites that link to their pages.'" },
  { question: "How Do I Get High-Quality Backlinks?", answer: "High-quality backlinks can be earned through creating shareable content, guest blogging, broken link building, and manual outreach to relevant sites in your industry." },
  { question: "What Are the Different Types of Backlinks?", answer: "The main types include 'dofollow' (pass authority) and 'nofollow' (do not pass authority). There are also editorial links, guest blogging links, and business profile links." },
  { question: "How Long Does It Take to See Results from Link Building?", answer: "SEO is a long-term strategy. Typically, it can take anywhere from 3 to 6 months to see significant changes in rankings resulting from link building efforts." },
];

export const Pricing: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="pt-20 pb-16 text-center max-w-4xl mx-auto px-4">
        <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm">Pricing & Plans</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
          Good Paid Backlink Building Services That Actually Move The Needle
        </h1>
        <p className="text-gray-600 text-lg">
          At Rinxa.io, we don't sell links we build authority. Our good paid backlink building services are designed for serious brands who want rankings, traffic, and long term results.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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
      </div>

      {/* Process Section (Purple) */}
      <div className="bg-indigo-600 text-white py-24 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 mb-20">
                <div>
                    <span className="text-lime-400 font-bold uppercase tracking-wider text-sm mb-2 block">Optimize Your Marketing</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Take Control Of Your SEO Strategy With Rinxa</h2>
                    <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                        Find a team of SEO experts you can rely on. Every day, we build trust through good paid backlink building services, transparency, and results. Whether you're looking to increase your rankings or drive organic traffic, Rinxa.io is here to help you achieve your goals.
                    </p>
                    <Link to="/contact">
                        <button className="bg-lime-400 hover:bg-lime-500 text-indigo-900 px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105">
                            Get Started
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { id: '01', title: 'Expert-Driven Campaigns', text: 'Our team of SEO specialists crafts personalized strategies tailored to your business.' },
                        { id: '02', title: 'High-Quality Backlinks', text: 'We target the best sources to ensure your site builds authority and ranks faster.' },
                        { id: '03', title: 'Why Guest Blogging Works', text: 'Builds Trust & Authority: Gain credibility by appearing on high-quality sites.' },
                        { id: '04', title: 'Final Result', text: 'Watch your rankings soar, traffic grow, and authority strengthen with high-quality backlinks.' }
                    ].map((step, i) => (
                        <div key={i} className="bg-indigo-700/50 backdrop-blur-sm p-6 rounded-2xl border border-indigo-500/30 hover:bg-indigo-700 transition-colors">
                            <div className="text-3xl font-bold text-white mb-3 opacity-90">{step.id}</div>
                            <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                            <p className="text-indigo-200 text-sm">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </div>

      {/* No Long Term Contracts */}
      <div className="py-24 text-center bg-white">
          <div className="w-16 h-16 mx-auto mb-6 text-indigo-600 animate-pulse">
             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-indigo-600 font-bold uppercase text-xs tracking-wider">Important Note</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">No Long-Term Contracts</h2>
          <p className="text-gray-600 max-w-lg mx-auto">Our month-to-month plans allow you the flexibility to scale up or down as per your requirements.</p>
      </div>

      {/* Agency Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-indigo-50/50 rounded-3xl mb-24">
         <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
                 <span className="text-indigo-600 font-bold uppercase text-xs tracking-wider mb-2 block">Link Building Services Agency</span>
                 <h2 className="text-4xl font-bold mb-6 text-gray-900">Your Go-To Link Building Agency For Unbeatable Rankings</h2>
                 <p className="text-gray-600 mb-8 leading-relaxed">
                     Rinxa our strength lies in our dedicated team of SEO specialists, link-building experts, and content creators. Each member brings years of experience, ensuring top-tier results.
                 </p>
                 <ul className="space-y-3">
                     {[ 'Organic traffic 1k to 100k', 'Domain rating 0 to 60', 'Anchor text strategy', 'Relevant niche guestpost'].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 font-medium text-gray-800">
                             <div className="bg-black rounded-full p-1"><Check size={12} className="text-white" /></div>
                             {item}
                         </li>
                     ))}
                 </ul>
             </div>
             <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team" className="w-full h-full object-cover" />
             </div>
         </div>
      </div>

      {/* FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center mb-12">
             <span className="text-indigo-600 font-bold uppercase text-xs tracking-wider">FAQs</span>
             <h2 className="text-4xl font-bold mt-2">Frequently Asked Questions</h2>
             <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Find a team of digital marketers you can rely on. Every day, we build trust through communication, transparency, and results.</p>
          </div>
          <FaqSection items={faqs} />
      </div>
    </div>
  );
};