'use client';

import { useState } from 'react';
import {
  Heart, MessageCircle, Share2, Bookmark, MoreHorizontal,
  Camera, Video, FileText, BarChart2, Search, Zap,
  Verified, MapPin, Send
} from 'lucide-react';
import { MOCK_POSTS, MOCK_STORIES } from '@/lib/mock-data';

export default function FeedPage() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');
  const [activeStory, setActiveStory] = useState<number | null>(null);

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, is_liked: !p.is_liked, likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1 }
          : p
      )
    );
  }

  function toggleSave(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, is_saved: !p.is_saved } : p
      )
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Stories */}
      <div className="bg-white rounded-3xl p-4 shadow-card mb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {/* Add story */}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl gradient-coral flex items-center justify-center relative shadow-coral-sm group-hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center">
                <Camera className="w-6 h-6 text-coral-500" />
              </div>
            </div>
            <span className="text-xs text-gray-500 font-medium">Add Story</span>
          </div>

          {MOCK_STORIES.map((story, idx) => (
            <div
              key={story.id}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
              onClick={() => setActiveStory(idx)}
            >
              <div className={`p-0.5 rounded-2xl ${story.viewed ? 'bg-gray-200' : 'story-ring'}`}>
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={story.user.avatar_url}
                    alt={story.user.full_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-600 font-medium truncate w-16 text-center">
                {story.user.full_name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Create post */}
      <div className="bg-white rounded-3xl p-5 shadow-card mb-6">
        <div className="flex gap-3 mb-4">
          <img
            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="You"
            className="w-10 h-10 rounded-2xl object-cover flex-shrink-0"
          />
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind? Share a thought, story, or experience..."
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-gray-50 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-coral-400 focus:bg-white transition-all"
            rows={2}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[
              { icon: Camera, label: 'Photo' },
              { icon: Video, label: 'Video' },
              { icon: FileText, label: 'Text' },
              { icon: BarChart2, label: 'Poll' },
            ].map((btn) => (
              <button
                key={btn.label}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-500 hover:bg-coral-50 hover:text-coral-500 transition-colors text-xs font-medium"
              >
                <btn.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{btn.label}</span>
              </button>
            ))}
          </div>
          <button
            disabled={!newPost.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full gradient-coral text-white text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity shadow-coral-sm"
          >
            <Send className="w-4 h-4" />
            Post
          </button>
        </div>
      </div>

      {/* AI Discovery Banner */}
      <div className="gradient-coral rounded-3xl p-5 shadow-coral-md mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm mb-0.5">PARENE AI Found 12 New Matches</p>
            <p className="text-white/80 text-xs">Based on your interests in Business and Technology</p>
          </div>
          <button className="bg-white text-coral-500 text-xs font-semibold px-4 py-2 rounded-full hover:bg-coral-50 transition-colors flex-shrink-0">
            View
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-5">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-3xl shadow-card overflow-hidden">
            {/* Post header */}
            <div className="flex items-start gap-3 p-5 pb-3">
              <div className="relative flex-shrink-0">
                <img
                  src={post.user.avatar_url}
                  alt={post.user.full_name}
                  className="w-11 h-11 rounded-2xl object-cover"
                />
                {post.user.is_online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">{post.user.full_name}</span>
                  {post.user.is_verified && (
                    <Verified className="w-4 h-4 text-coral-500 fill-coral-100" />
                  )}
                  {post.user.is_premium && (
                    <span className="text-xs bg-coral-100 text-coral-600 px-1.5 py-0.5 rounded-full font-medium">Plus</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">{post.created_at}</span>
                  {post.user.location && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span className="flex items-center gap-0.5 text-xs text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {post.user.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-1.5 px-5 pb-2">
                {post.categories.map((cat) => (
                  <span key={cat} className="text-xs bg-peach-200 text-coral-600 px-2.5 py-0.5 rounded-full font-medium">
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            {post.content && (
              <p className="px-5 pb-3 text-gray-800 text-sm leading-relaxed">{post.content}</p>
            )}

            {/* Media */}
            {post.media_urls && post.media_urls.length > 0 && (
              <div className="overflow-hidden">
                <img
                  src={post.media_urls[0]}
                  alt=""
                  className="w-full object-cover max-h-80"
                />
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between px-5 py-2 text-xs text-gray-400 border-t border-gray-50">
              <span>{post.likes_count.toLocaleString()} likes</span>
              <span>{post.comments_count} comments · {post.shares_count} shares</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-2 pb-3 border-t border-gray-50">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                  post.is_liked ? 'text-coral-500' : 'text-gray-500 hover:text-coral-500 hover:bg-coral-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.is_liked ? 'fill-coral-500' : ''}`} />
                Like
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-gray-500 hover:text-coral-500 hover:bg-coral-50 transition-colors text-sm font-medium">
                <MessageCircle className="w-5 h-5" />
                Comment
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-gray-500 hover:text-coral-500 hover:bg-coral-50 transition-colors text-sm font-medium">
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button
                onClick={() => toggleSave(post.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                  post.is_saved ? 'text-coral-500' : 'text-gray-500 hover:text-coral-500 hover:bg-coral-50'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${post.is_saved ? 'fill-coral-500' : ''}`} />
                Save
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Right sidebar (desktop) - Only visible on wide screens */}
      {/* Rendered as floating aside */}
    </div>
  );
}
