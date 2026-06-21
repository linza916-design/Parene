'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Users, Calendar, Bell, Check, UserPlus } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/lib/mock-data';

const TYPE_ICONS: Record<string, typeof Heart> = {
  like: Heart,
  comment: MessageCircle,
  friend_request: UserPlus,
  event: Calendar,
  community: Users,
  follow: Users,
};

const TYPE_COLORS: Record<string, string> = {
  like: 'bg-red-100 text-red-500',
  comment: 'bg-blue-100 text-blue-500',
  friend_request: 'bg-coral-100 text-coral-500',
  event: 'bg-yellow-100 text-yellow-600',
  community: 'bg-green-100 text-green-500',
  follow: 'bg-purple-100 text-purple-500',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('All');

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
  }

  const filters = ['All', 'Unread', 'Likes', 'Comments', 'Friends', 'Events'];

  const filtered = notifications.filter((n) => {
    if (filter === 'Unread') return !n.is_read;
    if (filter === 'Likes') return n.type === 'like';
    if (filter === 'Comments') return n.type === 'comment';
    if (filter === 'Friends') return n.type === 'friend_request' || n.type === 'follow';
    if (filter === 'Events') return n.type === 'event';
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-0.5">
              <span className="text-coral-500 font-semibold">{unreadCount}</span> unread
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-sm text-coral-500 font-medium hover:text-coral-600 transition-colors"
          >
            <Check className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === f ? 'gradient-coral text-white shadow-coral-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300'
            }`}
          >
            {f}
            {f === 'Unread' && unreadCount > 0 && (
              <span className="ml-1.5 bg-coral-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((notif) => {
          const Icon = TYPE_ICONS[notif.type] || Bell;
          const colorClass = TYPE_COLORS[notif.type] || 'bg-gray-100 text-gray-500';

          return (
            <div
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={`bg-white rounded-2xl p-4 shadow-card flex items-start gap-3 cursor-pointer hover:shadow-card-hover transition-all ${
                !notif.is_read ? 'border-l-4 border-coral-400' : ''
              }`}
            >
              <div className="flex-shrink-0 relative">
                {notif.actor ? (
                  <div className="relative">
                    <img
                      src={notif.actor.avatar_url}
                      alt={notif.actor.full_name}
                      className="w-12 h-12 rounded-2xl object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center ${colorClass}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                  </div>
                ) : (
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${notif.is_read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                  {notif.title}
                </p>
                {notif.body && (
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.body}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{notif.created_at}</p>
              </div>

              {!notif.is_read && (
                <div className="w-2.5 h-2.5 rounded-full gradient-coral flex-shrink-0 mt-1.5" />
              )}

              {notif.type === 'friend_request' && (
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button className="px-3 py-1.5 rounded-lg gradient-coral text-white text-xs font-semibold shadow-coral-sm">Accept</button>
                  <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">Decline</button>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 text-sm">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
