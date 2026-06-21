'use client';

import { useState } from 'react';
import {
  Search, Filter, MapPin, Heart, X, Star, Verified,
  MessageCircle, UserPlus, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';
import { MOCK_USERS } from '@/lib/mock-data';

const FILTERS = ['All', 'Nearby', 'Online', 'Friends', 'Dating', 'Networking'];

export default function DiscoverPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [filter, setFilter] = useState('All');
  const [liked, setLiked] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);

  const user = MOCK_USERS[currentCard % MOCK_USERS.length];

  function handleLike() {
    setLiked((prev) => [...prev, user.id]);
    setCurrentCard((c) => c + 1);
  }

  function handleSkip() {
    setSkipped((prev) => [...prev, user.id]);
    setCurrentCard((c) => c + 1);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover People</h1>
          <p className="text-sm text-gray-500 mt-0.5">Find your next meaningful connection</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, interests, or location..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral-400 text-gray-900 placeholder-gray-400 shadow-card"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === f
                ? 'gradient-coral text-white shadow-coral-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Tinder-style card */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">People Near You</h2>
          <div className="relative">
            {/* Stack effect */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-card transform rotate-2 translate-y-2 scale-95 opacity-60" />
            <div className="absolute inset-0 bg-white rounded-3xl shadow-card transform -rotate-1 translate-y-1 scale-97 opacity-80" />

            {/* Main card */}
            <div className="relative bg-white rounded-3xl shadow-card-hover overflow-hidden">
              <div className="relative h-80">
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {user.is_premium && (
                    <span className="bg-coral-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">PLUS</span>
                  )}
                  {user.is_online && (
                    <span className="bg-green-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">ONLINE</span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold text-xl">{user.full_name}</h3>
                        {user.is_verified && <Verified className="w-5 h-5 text-coral-300 fill-coral-100" />}
                      </div>
                      <div className="flex items-center gap-1 text-white/80 text-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        {user.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{user.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {user.interests.slice(0, 4).map((i) => (
                    <span key={i} className="text-xs bg-peach-200 text-coral-600 px-2.5 py-1 rounded-full font-medium">
                      {i}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs text-gray-500 font-medium">Looking for:</span>
                  {user.looking_for.map((l) => (
                    <span key={l} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {l}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handleSkip}
                    className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-100 hover:scale-105 transition-all group"
                  >
                    <X className="w-7 h-7 text-gray-400 group-hover:text-red-400" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-peach-200 flex items-center justify-center hover:scale-105 transition-transform">
                    <Star className="w-5 h-5 text-coral-400 fill-coral-400" />
                  </button>
                  <button
                    onClick={handleLike}
                    className="w-14 h-14 rounded-full gradient-coral flex items-center justify-center hover:scale-105 transition-transform shadow-coral-sm animate-pulse-coral"
                  >
                    <Heart className="w-7 h-7 text-white fill-white" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-peach-200 flex items-center justify-center hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5 text-coral-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <span className="font-semibold text-coral-500">{liked.length}</span> liked ·
            <span className="font-semibold text-gray-600">{skipped.length}</span> passed
          </div>
        </div>

        {/* Suggested users grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">You Might Know</h2>
          <div className="space-y-3">
            {MOCK_USERS.map((u) => (
              <div key={u.id} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3 hover:shadow-card-hover transition-shadow">
                <div className="relative flex-shrink-0">
                  <img src={u.avatar_url} alt={u.full_name} className="w-12 h-12 rounded-2xl object-cover" />
                  {u.is_online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-gray-900 text-sm truncate">{u.full_name}</p>
                    {u.is_verified && <Verified className="w-3.5 h-3.5 text-coral-500 fill-coral-100 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{u.location}</p>
                  <div className="flex gap-1 mt-1">
                    {u.interests.slice(0, 2).map((i) => (
                      <span key={i} className="text-xs bg-peach-200 text-coral-600 px-1.5 py-0.5 rounded-full">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-9 h-9 rounded-xl gradient-coral flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity shadow-coral-sm">
                  <UserPlus className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>

          {/* AI Banner */}
          <div className="mt-4 gradient-coral rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">PARENE AI</p>
              <p className="text-white/80 text-xs">Ask me to find specific people</p>
            </div>
            <button className="bg-white text-coral-500 text-xs font-semibold px-3 py-1.5 rounded-full">
              Ask AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
