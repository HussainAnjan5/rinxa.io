import React from 'react';
import { Play, BarChart, ShieldCheck, DollarSign, Layout, PieChart, PenTool, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const badges = [
    { label: 'Users Love Us', icon: '❤️', color: 'bg-gray-100' },
    { label: 'High Performer', sub: 'Spring 2024', color: 'bg-indigo-50 border-indigo-200' },
    { label: 'High Performer', sub: 'Mid Market', color: 'bg-orange-50 border-orange-200' },
    { label: 'Best Support', sub: 'Small Business', color: 'bg-green-50 border-green-200' },
];

export const SaaS: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-20 pb-16 text-center max-w-5xl mx-auto px-4">
        <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs mb-4 block">SaaS Link Building Agency</span>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
          We Create Natural Growth Engines For Tech Brands.
        </h1>
        <p className="text-gray-600 mb-8">Affordable saas link building agency we come up with a strategy rank building that boosts their ranking. Limited spots available – Book your free strategy call today.</p>
        <Link to="/contact">
            <button className="bg-lime-400 hover:bg-lime-500 text-indigo-900 px-8 py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl">
            BOOK A MEETING
            </button>
        </Link>
      </section>

      {/* Video Placeholder */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
         <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-900 group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Video thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center pl-1">
                        <Play className="text-indigo-600 fill-indigo-600" size={24} />
                    </div>
                 </div>
            </div>
            <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-serif italic">All about Rinxa in 1 minute</h3>
            </div>
         </div>
      </section>

      {/* Clients Logo Strip */}
      <section className="py-10 border-y border-gray-100 mb-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 grayscale opacity-60">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/LiveAgent_Logo.png/1200px-LiveAgent_Logo.png" alt="LiveAgent" className="h-8 object-contain" />
           <img src="https://assets-global.website-files.com/62c55b2d566c5d6c85536481/62c55b2d566c5d012d536552_Leapsome_Logo_RGB.svg" alt="Leapsome" className="h-8 object-contain" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Opencart_logo.svg/2560px-Opencart_logo.svg.png" alt="Opencart" className="h-8 object-contain" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/NordVPN_Horizontal_Logo_%28Blue%29.svg" alt="NordVPN" className="h-8 object-contain" />
        </div>
      </section>

      {/* Pillars of Quality */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Three Pillars Of Our Quality</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We help agencies, startups, and enterprises scale their online presence with white hat link building strategies.</p>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
            {[
                { icon: <BarChart />, title: 'High DR Editorial Backlinks', desc: 'Links from SaaS and reputable editorial sites. We prioritize quality over quantity. Every website is chosen to meet your needs.' },
                { icon: <DollarSign />, title: 'Result-Based Payment', desc: 'With our results-oriented approach, you only pay for effective link building. Once we meet the target, you verify the live links.' },
                { icon: <ShieldCheck />, title: 'Guaranteed Refund For Lost Links', desc: 'We offer a guaranteed refund for any lost links, ensuring our clients satisfaction and trust in our services.' }
            ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-14 h-14 bg-lime-100 text-indigo-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                        {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
         </div>
      </section>

      {/* Purple Banner */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="bg-indigo-600 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
             <div className="relative z-10">
                 <h2 className="text-3xl md:text-4xl font-bold mb-2">Real Results, Real Growth: Proven</h2>
                 <h2 className="text-3xl md:text-4xl font-bold">Link Building Success</h2>
             </div>
             <div className="relative z-10 mt-8 md:mt-0 flex items-center gap-4">
                 <div className="bg-black/30 p-4 rounded-full backdrop-blur-sm">
                    <BarChart className="text-lime-400" size={32} />
                 </div>
                 <div className="font-semibold max-w-[200px]">Improve Your Money's With Strong Backlinks.</div>
             </div>
             {/* Decorative circles */}
             <div className="absolute right-0 bottom-0 w-64 h-64 border-[40px] border-indigo-500 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
        </div>
      </section>

      {/* Steps (Process) - Blue Background */}
      <section className="bg-indigo-600 text-white py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
            <div>
                 <span className="text-lime-400 font-bold text-xs tracking-wider uppercase mb-2 block">Optimize Your Marketing</span>
                 <h2 className="text-4xl font-bold mb-6">Take Control Of Your Business Processes With Our SaaS</h2>
                 <p className="text-indigo-200 mb-8 leading-relaxed">
                     We help agencies, startups , and enterprises scale their online presence with white-hat and Budget digital PR, and authority placements. Whether you're aiming to improve organic traffic or build trust with Google, our approach has you covered.
                 </p>
                 <Link to="/contact">
                    <button className="bg-lime-400 hover:bg-lime-500 text-indigo-900 px-8 py-3 rounded-full font-bold">
                        Get Started
                    </button>
                 </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { id: '01', title: 'Onboarding & Strategy', icon: <Layout />, desc: 'We begin with a discovery call and site audit to understand your niche and goals.' },
                    { id: '02', title: 'Custom Link Plan', icon: <PieChart />, desc: 'We research your competitors, identify content gaps, and create a tailored roadmap.' },
                    { id: '03', title: 'Execution & Outreach', icon: <PenTool />, desc: 'Our team secures high-quality backlinks through guest posts and niche edits.' },
                    { id: '04', title: 'Reporting & Results', icon: <FileText />, desc: 'You\'ll get transparent reports tracking link placements, anchor texts, and keyword growth.' }
                ].map((step, i) => (
                    <div key={i} className="bg-indigo-700/50 p-6 rounded-2xl hover:bg-indigo-700 transition-colors border border-indigo-500/30">
                         <div className="text-2xl font-bold mb-2 opacity-80">{step.id}</div>
                         <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                         <p className="text-indigo-200 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Badges */}
      <section className="max-w-7xl mx-auto px-4 mb-24 flex flex-wrap justify-center gap-6">
         {badges.map((b, i) => (
             <div key={i} className={`w-32 h-40 ${b.color} rounded-t-full rounded-b-lg flex flex-col items-center justify-center border-2 text-center p-2 shadow-sm`}>
                 <div className="text-3xl mb-2">🏆</div>
                 <div className="font-bold text-sm text-gray-800">{b.label}</div>
                 {b.sub && <div className="text-xs text-gray-500">{b.sub}</div>}
             </div>
         ))}
      </section>
    </div>
  );
};