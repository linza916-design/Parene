'use client';

import { useState } from 'react';
import { Search, Users, Lock, Crown, Plus, TrendingUp, Check } from 'lucide-react';
import { MOCK_COMMUNITIES } from '@/lib/mock-data';

const CATEGORIES = ['All', 'Business', 'Fitness', 'Travel', 'Technology', 'Relationships', 'Art', 'Gaming'];

export default function CommunitiesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [communities, setCommunities] = useState(MOCK_COMMUNITIES);

  function toggleJoin(id: string) {
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, is_joined: !c.is_joined, members_count: c.is_joined ? c.members_count - 1 : c.members_count + 1 } : c
      )
    );
  }

  const filtered = communities.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    return matchSearch && matchCat;
  });

  const joined = communities.filter((c) => c.is_joined);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communities</h1>
          <p className="text-sm text-gray-500 mt-0.5">Find your tribe and build connections</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-coral text-white text-sm font-semibold shadow-coral-sm hover:opacity-90">
          <Plus className="w-4 h-4" />
          Create
        </button>
      </div>

      {/* My Communities */}
      {joined.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold text-gray-900 mb-3">My Communities</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {joined.map((c) => (
              <div key={c.id} className="flex-shrink-0 w-32 flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-coral-300 ring-offset-2">
                  <img src={c.avatar_url} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="text-xs text-gray-700 font-medium text-center leading-tight line-clamp-2">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search communities..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral-400 text-gray-900 placeholder-gray-400 shadow-card"
        />
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              category === cat ? 'gradient-coral text-white shadow-coral-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      <div className="mb-8">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-coral-500" />
          Featured Communities
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.filter((c) => c.is_featured).map((c) => (
            <div key={c.id} className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
              <div className="relative h-36">
                <img src={c.cover_url} alt={c.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {c.is_paid && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" /> Paid
                    </span>
                  )}
                  <span className="bg-coral-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Featured</span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <img src={c.avatar_url} alt="" className="w-10 h-10 rounded-xl border-2 border-white object-cover" />
                  <p className="text-white font-bold">{c.name}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{c.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{c.members_count.toLocaleString()} members</span>
                  </div>
                  <button
                    onClick={() => toggleJoin(c.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      c.is_joined
                        ? 'bg-green-100 text-green-600'
                        : 'gradient-coral text-white shadow-coral-sm hover:opacity-90'
                    }`}
                  >
                    {c.is_joined ? <><Check className="w-4 h-4" /> Joined</> : 'Join'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4">All Communities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
              <div className="h-28 relative overflow-hidden">
                <img src={c.cover_url} alt={c.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {(c as any).is_private && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Private
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src={c.avatar_url} alt="" className="w-7 h-7 rounded-lg object-cover" />
                  <p className="font-bold text-gray-900 text-sm truncate">{c.name}</p>
                </div>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{c.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {c.members_count.toLocaleString()}
                  </span>
                  <button
                    onClick={() => toggleJoin(c.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                      c.is_joined
                        ? 'bg-green-100 text-green-600'
                        : 'gradient-coral text-white shadow-coral-sm hover:opacity-90'
                    }`}
                  >
                    {c.is_joined ? 'Joined' : c.is_paid ? `Join · $${c.price}/mo` : 'Join'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
