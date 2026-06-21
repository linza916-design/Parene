'use client';

import { useState } from 'react';
import { Search, UserCheck, UserPlus, MessageCircle, MapPin, Verified, Users } from 'lucide-react';
import { MOCK_USERS } from '@/lib/mock-data';

const TABS = ['All Friends', 'Nearby', 'Online', 'Requests', 'Suggested'];

export default function FriendsPage() {
  const [tab, setTab] = useState('All Friends');
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState(MOCK_USERS.slice(0, 4).map((u) => ({ ...u, connected: true })));
  const [requests] = useState(MOCK_USERS.slice(2, 4));
  const [suggested] = useState(MOCK_USERS.slice(4));

  const filtered = friends.filter((u) =>
    u.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
          <p className="text-sm text-gray-500 mt-0.5">{friends.length} connections</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-coral rounded-xl flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search friends..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral-400 text-gray-900 placeholder-gray-400 shadow-card"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              tab === t ? 'gradient-coral text-white shadow-coral-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300'
            }`}
          >
            {t}
            {t === 'Requests' && <span className="ml-1.5 bg-coral-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>}
          </button>
        ))}
      </div>

      {tab === 'Requests' && (
        <div className="space-y-3 mb-8">
          <h2 className="font-bold text-gray-900 mb-3">Friend Requests</h2>
          {requests.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3">
              <img src={u.avatar_url} alt={u.full_name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="font-bold text-gray-900">{u.full_name}</p>
                  {u.is_verified && <Verified className="w-4 h-4 text-coral-500 fill-coral-100" />}
                </div>
                <p className="text-sm text-gray-500 truncate">{u.bio}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{u.location}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 rounded-xl gradient-coral text-white text-sm font-semibold shadow-coral-sm hover:opacity-90">
                  Accept
                </button>
                <button className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Suggested' && (
        <div className="space-y-3">
          <h2 className="font-bold text-gray-900 mb-3">People You May Know</h2>
          {suggested.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img src={u.avatar_url} alt={u.full_name} className="w-12 h-12 rounded-2xl object-cover" />
                {u.is_online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-gray-900 text-sm">{u.full_name}</p>
                  {u.is_verified && <Verified className="w-3.5 h-3.5 text-coral-500 fill-coral-100" />}
                </div>
                <p className="text-xs text-gray-500 truncate">{u.location}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {u.interests.slice(0, 2).map((i) => (
                    <span key={i} className="text-xs bg-peach-200 text-coral-600 px-1.5 py-0.5 rounded-full">{i}</span>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl gradient-coral text-white text-xs font-semibold shadow-coral-sm hover:opacity-90 flex-shrink-0">
                <UserPlus className="w-3.5 h-3.5" />
                Connect
              </button>
            </div>
          ))}
        </div>
      )}

      {(tab === 'All Friends' || tab === 'Online' || tab === 'Nearby') && (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered
            .filter((u) => tab === 'Online' ? u.is_online : true)
            .map((u) => (
              <div key={u.id} className="bg-white rounded-3xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative flex-shrink-0">
                    <img src={u.avatar_url} alt={u.full_name} className="w-14 h-14 rounded-2xl object-cover" />
                    {u.is_online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-gray-900 truncate">{u.full_name}</p>
                      {u.is_verified && <Verified className="w-4 h-4 text-coral-500 fill-coral-100 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">@{u.username}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-300" />
                      <span className="text-xs text-gray-400 truncate">{u.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{u.bio}</p>
                <div className="flex gap-1.5 mb-4 flex-wrap">
                  {u.interests.slice(0, 3).map((i) => (
                    <span key={i} className="text-xs bg-peach-200 text-coral-600 px-2 py-0.5 rounded-full">{i}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-coral-50 text-coral-500 text-sm font-semibold hover:bg-coral-100 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <UserCheck className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
