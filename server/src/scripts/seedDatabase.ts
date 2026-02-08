import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import User from '../models/User';
import BlogPost from '../models/BlogPost';

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Admin user data
const adminUser = {
  email: 'admin@rinxa.io',
  password: 'Hamid@grayforge',
  name: 'Admin',
  role: 'admin'
};

// Blog data to seed
const blogPostsData = [
  {
    slug: 'ultimate-guide-link-building-2026',
    title: 'The Ultimate Guide to Link Building in 2026',
    excerpt: 'Discover the latest link building strategies that actually work. Learn how to build high-quality backlinks that boost your rankings.',
    content: `
      <h2>Why Link Building Still Matters in 2026</h2>
      <p>Despite the evolution of search algorithms, link building remains a cornerstone of SEO success. Quality backlinks signal to search engines that your content is valuable and trustworthy.</p>
      
      <h2>Top Link Building Strategies</h2>
      <h3>1. Guest Posting on Authority Sites</h3>
      <p>Guest posting on high-authority websites in your niche is one of the most effective ways to build quality backlinks. Focus on providing genuine value rather than just getting a link.</p>
      
      <h3>2. Creating Linkable Assets</h3>
      <p>Develop comprehensive resources, original research, infographics, or tools that naturally attract links from other websites.</p>
      
      <h3>3. Broken Link Building</h3>
      <p>Find broken links on relevant websites and offer your content as a replacement. This provides value to webmasters while earning you a backlink.</p>
      
      <h3>4. Digital PR and Outreach</h3>
      <p>Build relationships with journalists, bloggers, and industry influencers. Create newsworthy content that attracts media coverage.</p>
      
      <h2>Common Link Building Mistakes to Avoid</h2>
      <ul>
        <li>Buying links from low-quality sources</li>
        <li>Over-optimizing anchor text</li>
        <li>Ignoring link relevance and context</li>
        <li>Building links too quickly</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Link building is a marathon, not a sprint. Focus on building genuine relationships and creating valuable content that naturally attracts links.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'SEO Strategist with 10+ years of experience in digital marketing.'
    },
    category: 'Link Building',
    date: '2026-01-28',
    readTime: '8 min read',
    tags: ['Link Building', 'SEO', 'Backlinks'],
  },
  {
    slug: 'seo-trends-2026',
    title: '10 SEO Trends You Can\'t Ignore in 2026',
    excerpt: 'Stay ahead of the curve with these emerging SEO trends. From AI-powered search to voice optimization, here\'s what matters now.',
    content: `
      <h2>Introduction</h2>
      <p>The SEO landscape is constantly evolving. Here are the top 10 trends shaping search engine optimization in 2026.</p>
      
      <h2>1. AI-Powered Search Results</h2>
      <p>Search engines are increasingly using AI to understand user intent and deliver more relevant results. Optimize your content for conversational queries and contextual relevance.</p>
      
      <h2>2. E-E-A-T Becomes Critical</h2>
      <p>Experience, Expertise, Authoritativeness, and Trustworthiness are more important than ever. Showcase author credentials and build topical authority.</p>
      
      <h2>3. Video SEO Takes Center Stage</h2>
      <p>Video content is dominating search results. Optimize your videos with proper titles, descriptions, and transcripts.</p>
      
      <h2>4. Core Web Vitals Evolution</h2>
      <p>Page experience signals continue to impact rankings. Focus on loading speed, interactivity, and visual stability.</p>
      
      <h2>5. Zero-Click Searches</h2>
      <p>More searches are answered directly in SERPs. Optimize for featured snippets and knowledge panels to maintain visibility.</p>
      
      <h2>Conclusion</h2>
      <p>Staying updated with SEO trends is crucial for maintaining your competitive edge. Implement these strategies to future-proof your SEO efforts.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      bio: 'SEO Director specializing in technical SEO and analytics.'
    },
    category: 'SEO',
    date: '2026-01-25',
    readTime: '10 min read',
    tags: ['SEO', 'Trends', 'Digital Marketing'],
  },
  {
    slug: 'content-strategy-seo-success',
    title: 'Building a Content Strategy for SEO Success',
    excerpt: 'Learn how to create a content strategy that drives organic traffic and engages your audience. Real examples included.',
    content: `
      <h2>The Foundation of SEO Success</h2>
      <p>A well-planned content strategy is the backbone of successful SEO. It's not just about keywords—it's about understanding your audience and providing value.</p>
      
      <h2>Step 1: Audience Research</h2>
      <p>Before creating content, understand who you're writing for. Create detailed buyer personas and identify their pain points, questions, and search behaviors.</p>
      
      <h2>Step 2: Keyword Research and Intent Mapping</h2>
      <p>Identify keywords that align with your audience's search intent.</p>
      
      <h2>Step 3: Content Creation Framework</h2>
      <p>Develop a consistent framework for creating high-quality content with original insights and expert opinions.</p>
      
      <h2>Measuring Success</h2>
      <p>Track key metrics like organic traffic, engagement rates, conversions, and keyword rankings to refine your strategy over time.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&h=500&fit=crop',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      bio: 'Content Strategist helping brands tell compelling stories.'
    },
    category: 'Content Strategy',
    date: '2026-01-20',
    readTime: '12 min read',
    tags: ['Content Strategy', 'SEO', 'Marketing'],
  },
  {
    slug: 'case-study-ecommerce-seo-growth',
    title: 'Case Study: How We Increased Organic Traffic by 300%',
    excerpt: 'A detailed breakdown of our successful SEO campaign for an e-commerce client. Real data, real results.',
    content: `
      <h2>Client Background</h2>
      <p>Our client, an online fashion retailer, was struggling to compete with larger brands.</p>
      
      <h2>The Results (6 Months)</h2>
      <ul>
        <li><strong>Organic traffic:</strong> +312% increase</li>
        <li><strong>Domain authority:</strong> 25 → 42</li>
        <li><strong>Keywords ranking top 10:</strong> 45 → 280</li>
        <li><strong>Conversion rate:</strong> +45% improvement</li>
      </ul>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    author: {
      name: 'David Martinez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      bio: 'SEO Manager with proven track record in e-commerce optimization.'
    },
    category: 'Case Study',
    date: '2026-01-15',
    readTime: '15 min read',
    tags: ['Case Study', 'SEO', 'E-commerce'],
  },
  {
    slug: 'technical-seo-checklist',
    title: 'Technical SEO Checklist: 25 Must-Do Items',
    excerpt: 'Ensure your website is technically sound with this comprehensive checklist. Perfect for developers and SEO professionals.',
    content: `
      <h2>Why Technical SEO Matters</h2>
      <p>Technical SEO forms the foundation of your website's search performance.</p>
      
      <h2>Crawling and Indexing</h2>
      <ul>
        <li>✅ Submit XML sitemap to search engines</li>
        <li>✅ Create and optimize robots.txt file</li>
        <li>✅ Fix crawl errors in Google Search Console</li>
      </ul>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop',
    author: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Technical SEO Specialist focused on site performance and crawlability.'
    },
    category: 'Tips & Tricks',
    date: '2026-01-10',
    readTime: '7 min read',
    tags: ['Technical SEO', 'Checklist', 'Web Development'],
  },
  {
    slug: 'local-seo-small-business',
    title: 'Local SEO Guide for Small Businesses',
    excerpt: 'Dominate local search results and attract more customers. A practical guide for local business owners.',
    content: `
      <h2>Why Local SEO is Crucial</h2>
      <p>For small businesses, local SEO is often more important than traditional SEO.</p>
      
      <h2>Google Business Profile Optimization</h2>
      <p>Your Google Business Profile is the cornerstone of local SEO.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    author: {
      name: 'Jennifer Lee',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
      bio: 'Local SEO Expert helping small businesses grow their online presence.'
    },
    category: 'SEO',
    date: '2026-01-05',
    readTime: '9 min read',
    tags: ['Local SEO', 'Small Business', 'Google Business'],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await BlogPost.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = new User(adminUser);
    await admin.save();
    console.log('✅ Admin user created');
    console.log('📧 Email: admin@rinxa.io');
    console.log('🔑 Password: Hamid@grayforge');

    // Insert blog posts
    const insertedPosts = await BlogPost.insertMany(blogPostsData);
    console.log(`✅ Inserted ${insertedPosts.length} blog posts`);

    console.log('\n📊 Seed Summary:');
    console.log('   Admin User:');
    console.log('   - Email: admin@rinxa.io');
    console.log('   - Password: Hamid@grayforge');
    console.log('\n   Blog Posts:');
    insertedPosts.forEach((post) => {
      console.log(`   - ${post.title} (${post.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
