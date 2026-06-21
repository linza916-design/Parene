'use client';

import { useState } from 'react';
import {
  MapPin, Edit2, Share2, Star, Verified, Camera, MessageCircle,
  UserPlus, Grid, Video, Bookmark, Heart, Users, Zap
} from 'lucide-react';
import { MOCK_POSTS } from '@/lib/mock-data';

const TABS = ['Posts', 'Photos', 'Videos', 'Stories', 'Communities'];

const DEMO_PROFILE = {
  full_name: 'Alex Wright',
  username: 'alex_wright',
  bio: 'Software engineer & startup founder. Building the future of FinTech in Africa. Passionate about tech, travel, and meaningful connections.',
  avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
  cover_url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200',
  location: 'Nairobi, Kenya',
  is_verified: true,
  is_premium: true,
  interests: ['Technology', 'Gaming', 'Music', 'Travel', 'Business'],
  looking_for: ['Friends', 'Networking', 'Mentorship'],
  coins: 800,
  points: 2100,
  reputation_score: 87,
  followers: 543,
  following: 210,
  friends: 89,
};

export default function ProfilePage() {
  const [tab, setTab] = useState('Posts');

  return (
    <div className="max-w-3xl mx-auto">
      {/* Cover */}
      <div className="relative h-56 md:h-72 bg-gray-200 overflow-hidden">
        <img
          src={DEMO_PROFILE.cover_url}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-1.5 text-gray-700 text-sm font-medium hover:bg-white transition-colors shadow-card">
          <Camera className="w-4 h-4" />
          Edit Cover
        </button>
      </div>

      {/* Profile info */}
      <div className="px-5 pb-4 bg-white border-b border-gray-100">
        <div className="flex items-end justify-between -mt-12 mb-4">
          <div className="relative">
            <div className="story-ring p-0.5 rounded-3xl">
              <img
                src={DEMO_PROFILE.avatar_url}
                alt={DEMO_PROFILE.full_name}
                className="w-24 h-24 rounded-3xl object-cover border-3 border-white"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 gradient-coral rounded-xl flex items-center justify-center shadow-coral-sm">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="flex gap-2 pb-1">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-coral text-white text-sm font-semibold shadow-coral-sm hover:opacity-90">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2 mb-0.5">
            <h1 className="text-2xl font-bold text-gray-900">{DEMO_PROFILE.full_name}</h1>
            {DEMO_PROFILE.is_verified && <Verified className="w-6 h-6 text-coral-500 fill-coral-100" />}
            {DEMO_PROFILE.is_premium && (
              <span className="flex items-center gap-1 bg-coral-100 text-coral-600 text-xs font-bold px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-coral-500" /> Plus
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">@{DEMO_PROFILE.username}</p>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-3">{DEMO_PROFILE.bio}</p>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-coral-400" />
            {DEMO_PROFILE.location}
          </div>
          <span className="text-gray-300">·</span>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-coral-400" />
            <span>Rep Score: <strong className="text-gray-700">{DEMO_PROFILE.reputation_score}</strong></span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-4">
          {[
            { val: DEMO_PROFILE.followers, label: 'Followers' },
            { val: DEMO_PROFILE.following, label: 'Following' },
            { val: DEMO_PROFILE.friends, label: 'Friends' },
          ].map((s) => (
            <div key={s.label} className="text-center cursor-pointer hover:opacity-80">
              <p className="font-bold text-gray-900">{s.val.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Coins & Points */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-coral-50 rounded-2xl p-3 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Coins</p>
            <p className="font-bold text-coral-600">{DEMO_PROFILE.coins.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-3 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Points</p>
            <p className="font-bold text-green-600">{DEMO_PROFILE.points.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-3 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Rep Score</p>
            <p className="font-bold text-blue-600">{DEMO_PROFILE.reputation_score}</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-coral-50 text-coral-600 text-sm font-semibold hover:bg-coral-100 transition-colors">
            <MessageCircle className="w-4 h-4" /> Message
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-coral text-white text-sm font-semibold shadow-coral-sm hover:opacity-90">
            <UserPlus className="w-4 h-4" /> Connect
          </button>
        </div>

        {/* Interests */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2 font-medium">Interests</p>
          <div className="flex flex-wrap gap-1.5">
            {DEMO_PROFILE.interests.map((i) => (
              <span key={i} className="text-xs bg-peach-200 text-coral-600 px-2.5 py-1 rounded-full font-medium">{i}</span>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-2 font-medium">Looking for</p>
          <div className="flex flex-wrap gap-1.5">
            {DEMO_PROFILE.looking_for.map((i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{i}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="flex overflow-x-auto scrollbar-hide">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3.5 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                tab === t ? 'border-coral-500 text-coral-500' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white min-h-96">
        {tab === 'Posts' && (
          <div className="divide-y divide-gray-50">
            {MOCK_POSTS.slice(0, 3).map((post) => (
              <div key={post.id} className="p-5">
                <p className="text-gray-800 text-sm leading-relaxed mb-3">{post.content}</p>
                {post.media_urls && post.media_urls.length > 0 && (
                  <img src={post.media_urls[0]} alt="" className="w-full h-52 object-cover rounded-2xl mb-3" />
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {post.likes_count}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {post.comments_count}</span>
                  <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> {post.shares_count}</span>
                  <span className="text-gray-400 ml-auto">{post.created_at}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'Photos' && (
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {[
              'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/1267244/pexels-photo-1267244.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=400',
            ].map((url, i) => (
              <div key={i} className="aspect-square overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {(tab === 'Videos' || tab === 'Stories' || tab === 'Communities') && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Grid className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">No {tab.toLowerCase()} yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
