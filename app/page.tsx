'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Heart, Users, Globe, Star, ArrowRight, CheckCircle,
  MessageCircle, Zap, Shield, TrendingUp, ChevronRight,
  MapPin, Play
} from 'lucide-react';

const SLIDES = [
  {
    title: 'Meet New Friends',
    subtitle: 'Discover people who share your interests, values, and lifestyle worldwide.',
    image: 'https://images.pexels.com/photos/1267244/pexels-photo-1267244.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stat: '2M+ connections made',
  },
  {
    title: 'Build Meaningful Communities',
    subtitle: 'Join or create communities around topics you care about — from startups to fitness.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stat: '50K+ active communities',
  },
  {
    title: 'Experience Real Connections',
    subtitle: 'Attend events, join live rooms, and turn online friendships into real-world memories.',
    image: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stat: '10K+ events monthly',
  },
];

const FEATURES = [
  { icon: Heart, label: 'Friendships', desc: 'Find genuine friends who get you' },
  { icon: Star, label: 'Romance', desc: 'Connect with compatible partners' },
  { icon: TrendingUp, label: 'Networking', desc: 'Grow your professional circle' },
  { icon: Users, label: 'Communities', desc: 'Belong to groups that matter' },
  { icon: Globe, label: 'Mentorship', desc: 'Learn from experienced leaders' },
  { icon: MapPin, label: 'Events', desc: 'Meet people in real life' },
];

const TESTIMONIALS = [
  {
    name: 'Amina Diallo',
    role: 'Entrepreneur, Dakar',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'PARENE changed how I network. I found my business partner and three of my closest friends all on this platform.',
  },
  {
    name: 'Alex Wright',
    role: 'Developer, Nairobi',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'The tech community here is incredible. I got mentorship, a co-founder, and investment leads within my first month.',
  },
  {
    name: 'Sarah Jones',
    role: 'Traveler, Kampala',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'I traveled across 5 countries with companions I met on PARENE. Every trip has been safer and more memorable.',
  },
];

export default function LandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-peach-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-coral flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PARENE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-coral-500 transition-colors">Features</a>
            <a href="#communities" className="hover:text-coral-500 transition-colors">Communities</a>
            <a href="#pricing" className="hover:text-coral-500 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-coral-500 transition-colors font-medium">
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="text-sm px-4 py-2 rounded-full gradient-coral text-white font-medium hover:opacity-90 transition-opacity shadow-coral-sm"
            >
              Join Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${SLIDES[activeSlide].image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coral-500/20 border border-coral-400/30 text-coral-200 text-sm mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>{SLIDES[activeSlide].stat}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              {SLIDES[activeSlide].title}
            </h1>
            <p className="text-xl text-white/80 mb-6 leading-relaxed">
              {SLIDES[activeSlide].subtitle}
            </p>
            <p className="text-2xl font-light text-coral-300 mb-10 italic">
              "Connections Without Limits."
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-coral text-white font-semibold text-lg hover:opacity-90 transition-all shadow-coral-lg hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/app/feed"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Play className="w-5 h-5 fill-white" />
                View Demo
              </Link>
            </div>
          </div>

          <div className="flex gap-2 mt-16">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === activeSlide ? 'w-8 bg-coral-400' : 'w-4 bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 right-8 hidden lg:flex flex-col gap-3">
          {[
            { label: 'Active Users', value: '2.4M+', icon: Users },
            { label: 'Countries', value: '120+', icon: Globe },
            { label: 'Daily Connections', value: '18K+', icon: Heart },
          ].map((stat) => (
            <div key={stat.label} className="glassmorphism rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-coral flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-peach-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-coral-500 font-semibold text-sm tracking-widest uppercase">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Every Kind of Connection
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Unlike dating apps or social media — PARENE is built for every meaningful human connection.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.label} className="bg-white rounded-3xl p-8 card-hover shadow-card group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl gradient-coral flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-coral-500 font-semibold text-sm tracking-widest uppercase">The Platform</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
                Everything in One Place
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                From a smart discovery feed to real-time messaging, community spaces, and live events — PARENE is your complete social ecosystem.
              </p>
              <div className="space-y-4">
                {[
                  'AI-powered friend discovery based on your personality',
                  'Stories, posts, polls, and live streams',
                  'Private communities with their own events',
                  'Secure messaging with voice and video calls',
                  'Token economy rewarding real connections',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-coral-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full gradient-coral text-white font-semibold hover:opacity-90 transition-all shadow-coral-sm"
              >
                Start Connecting <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-coral-lg">
                <img
                  src="https://images.pexels.com/photos/1267244/pexels-photo-1267244.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="PARENE App"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glassmorphism rounded-2xl p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['774909', '1222271', '712513'].map((id) => (
                      <img
                        key={id}
                        src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=50`}
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">+2,400 joined today</p>
                    <p className="text-xs text-gray-500">Join the community</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 glassmorphism rounded-2xl p-4 shadow-card">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-coral-500" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">18K+ messages</p>
                    <p className="text-xs text-gray-500">sent right now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communities */}
      <section id="communities" className="py-24 bg-peach-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-coral-500 font-semibold text-sm tracking-widest uppercase">Communities</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Find Your Tribe</h2>
            <p className="text-gray-500 text-lg">Join 50,000+ communities across every interest and passion.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Entrepreneurs', members: '8.4K', img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Travelers', members: '12.3K', img: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Fitness', members: '15.6K', img: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Tech Devs', members: '9.8K', img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400' },
            ].map((c) => (
              <div key={c.name} className="relative rounded-3xl overflow-hidden aspect-[3/4] card-hover cursor-pointer group">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-bold text-lg">{c.name}</p>
                  <p className="text-sm text-white/80">{c.members} members</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-coral-500 text-coral-500 font-semibold hover:bg-coral-50 transition-all"
            >
              Explore All Communities <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-coral-500 font-semibold text-sm tracking-widest uppercase">Stories</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Real Connections, Real Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-peach-200 rounded-3xl p-8 card-hover">
                <div className="flex items-center gap-3 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">"{t.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-coral-400 fill-coral-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-peach-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-coral-500 font-semibold text-sm tracking-widest uppercase">Pricing</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Simple, Transparent Plans</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-10 shadow-card">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-500 mb-6">Everything you need to get started.</p>
              <p className="text-5xl font-bold text-gray-900 mb-8">$0<span className="text-lg font-normal text-gray-400">/mo</span></p>
              <ul className="space-y-3 mb-8">
                {['Basic discovery', '20 messages/day', 'Join communities', 'Attend events', '500 welcome points'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-coral-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="block text-center py-3 rounded-full border-2 border-coral-500 text-coral-500 font-semibold hover:bg-coral-50 transition-all">
                Get Started
              </Link>
            </div>
            <div className="bg-coral-500 rounded-3xl p-10 shadow-coral-lg relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">PARENE Plus</h3>
              <p className="text-coral-100 mb-6">Unlock unlimited connections.</p>
              <p className="text-5xl font-bold text-white mb-8">$7.99<span className="text-lg font-normal text-coral-200">/mo</span></p>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited discovery & messaging',
                  'Advanced AI filters',
                  'Read receipts',
                  'Profile insights',
                  'Verified badge',
                  'Priority in discovery',
                  'PARENE AI assistant',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-coral-100" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="block text-center py-3 rounded-full bg-white text-coral-500 font-semibold hover:bg-coral-50 transition-all shadow-md">
                Upgrade to Plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-coral relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Start Building Connections Today</h2>
          <p className="text-xl text-coral-100 mb-10">
            Join 2.4 million people finding friends, mentors, partners, and communities on PARENE.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-coral-500 font-bold text-xl hover:scale-105 transition-transform shadow-coral-lg"
          >
            Join PARENE Free <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-coral-200 text-sm mt-4">No credit card required. Free forever.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl gradient-coral flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-xl font-bold text-white">PARENE</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting people, enriching life. The social platform built for meaningful relationships.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Discover', 'Communities', 'Events', 'Messaging', 'Stories'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Safety', 'Cookies', 'Guidelines'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 text-sm hover:text-coral-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2026 PARENE. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-coral-400" />
              <span className="text-gray-400 text-sm">Privacy-first platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
