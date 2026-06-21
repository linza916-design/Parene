'use client';

import { useState } from 'react';
import {
  Search, MapPin, Calendar, Users, Plus, Globe,
  Clock, Ticket, Check, Filter
} from 'lucide-react';
import { MOCK_EVENTS } from '@/lib/mock-data';

const CATEGORIES = ['All', 'Social', 'Professional', 'Fitness', 'Technology', 'Travel'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function EventsPage() {
  const [category, setCategory] = useState('All');
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [search, setSearch] = useState('');

  function toggleRSVP(id: string) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, is_attending: !e.is_attending, attendees_count: e.is_attending ? e.attendees_count - 1 : e.attendees_count + 1 }
          : e
      )
    );
  }

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || e.category === category;
    return matchSearch && matchCat;
  });

  const featured = filtered.filter((e) => e.is_featured);
  const upcoming = filtered.filter((e) => !e.is_featured);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500 mt-0.5">Discover and attend real-world experiences</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-coral text-white text-sm font-semibold shadow-coral-sm hover:opacity-90">
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral-400 text-gray-900 placeholder-gray-400 shadow-card"
        />
      </div>

      {/* Filters */}
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

      {/* My Events */}
      {events.filter((e) => e.is_attending).length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold text-gray-900 mb-3">My Events</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {events.filter((e) => e.is_attending).map((e) => (
              <div key={e.id} className="flex-shrink-0 w-44 bg-white rounded-2xl overflow-hidden shadow-card">
                <img src={e.cover_url} alt={e.title} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <p className="text-xs font-bold text-gray-900 line-clamp-2 mb-1">{e.title}</p>
                  <p className="text-xs text-coral-500">{formatDate(e.starts_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Events */}
      {featured.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold text-gray-900 mb-4">Featured Events</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featured.map((event) => (
              <EventCard key={event.id} event={event} onRSVP={toggleRSVP} />
            ))}
          </div>
        </div>
      )}

      {/* All Events */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} onRSVP={toggleRSVP} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, onRSVP, compact = false }: { event: any; onRSVP: (id: string) => void; compact?: boolean }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
      <div className={`relative ${compact ? 'h-32' : 'h-48'} overflow-hidden`}>
        <img src={event.cover_url} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {event.is_paid ? (
            <span className="bg-white text-coral-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Ticket className="w-3 h-3" /> ${event.ticket_price}
            </span>
          ) : (
            <span className="bg-green-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">Free</span>
          )}
          {event.is_online && (
            <span className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Globe className="w-3 h-3" /> Online
            </span>
          )}
        </div>
        {event.is_attending && (
          <div className="absolute top-3 right-3 bg-green-400 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" /> Going
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
        {!compact && event.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{event.description}</p>
        )}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5 text-coral-400 flex-shrink-0" />
            <span>{formatDate(event.starts_at)} · {formatTime(event.starts_at)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-coral-400 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Users className="w-3.5 h-3.5 text-coral-400 flex-shrink-0" />
            <span>{event.attendees_count.toLocaleString()} attending</span>
            {event.max_attendees && (
              <span className="text-gray-400">/ {event.max_attendees}</span>
            )}
          </div>
        </div>

        {!compact && (
          <div className="flex items-center gap-2 mb-4">
            <img
              src={event.host.avatar_url}
              alt={event.host.full_name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-gray-500">Hosted by <strong className="text-gray-700">{event.host.full_name}</strong></span>
          </div>
        )}

        <button
          onClick={() => onRSVP(event.id)}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
            event.is_attending
              ? 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100'
              : 'gradient-coral text-white shadow-coral-sm hover:opacity-90'
          }`}
        >
          {event.is_attending ? 'Cancel RSVP' : event.is_paid ? `Get Ticket · $${event.ticket_price}` : 'RSVP Free'}
        </button>
      </div>
    </div>
  );
}
