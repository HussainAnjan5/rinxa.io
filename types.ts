import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface PricingPlan {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  color?: 'default' | 'black';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  image: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  color: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: BlogAuthor;
  category: BlogCategory;
  date: string;
  readTime: string;
  tags: string[];
}
