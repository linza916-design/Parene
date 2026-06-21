'use client';

import { useState } from 'react';
import {
  User, Bell, Lock, Eye, Globe, Palette, CreditCard,
  Shield, Trash2, ChevronRight, Phone, Mail
} from 'lucide-react';

const SETTINGS_GROUPS = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Personal Information', desc: 'Name, bio, photo, birthday' },
      { icon: Phone, label: 'Phone Number', desc: 'Add your phone for verification' },
      { icon: Mail, label: 'Email Address', desc: 'alex@example.com · Verified' },
      { icon: Lock, label: 'Password & Security', desc: 'Password, 2FA, sessions' },
    ],
  },
  {
    title: 'Privacy',
    items: [
      { icon: Eye, label: 'Profile Visibility', desc: 'Who can see your profile' },
      { icon: Globe, label: 'Location Sharing', desc: 'Control your location data' },
      { icon: Shield, label: 'Block & Mute', desc: 'Manage blocked users' },
      { icon: Eye, label: 'Activity Status', desc: 'Control online visibility' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { icon: Bell, label: 'Push Notifications', desc: 'Messages, likes, events' },
      { icon: Mail, label: 'Email Notifications', desc: 'Weekly digest, updates' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Globe, label: 'Language', desc: 'English (US)' },
      { icon: Palette, label: 'Appearance', desc: 'Light mode' },
    ],
  },
  {
    title: 'Billing',
    items: [
      { icon: CreditCard, label: 'Subscription & Billing', desc: 'PARENE Plus · Renews Aug 1' },
      { icon: CreditCard, label: 'Payment Methods', desc: 'Add or manage payment methods' },
    ],
  },
  {
    title: 'Danger Zone',
    items: [
      { icon: Trash2, label: 'Deactivate Account', desc: 'Temporarily disable your account', danger: true },
      { icon: Trash2, label: 'Delete Account', desc: 'Permanently delete all data', danger: true },
    ],
  },
];

const NOTIFICATION_TOGGLES = [
  { label: 'Friend requests', on: true },
  { label: 'New messages', on: true },
  { label: 'Post likes', on: true },
  { label: 'Comments on your posts', on: true },
  { label: 'Event reminders', on: true },
  { label: 'Community updates', on: false },
  { label: 'Suggested friends', on: false },
  { label: 'Promotional content', on: false },
];

export default function SettingsPage() {
  const [toggles, setToggles] = useState(NOTIFICATION_TOGGLES);

  function flip(i: number) {
    setToggles((prev) => prev.map((t, idx) => idx === i ? { ...t, on: !t.on } : t));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {SETTINGS_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{group.title}</h2>
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              {group.items.map((item, i) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-gray-50 transition-colors ${
                    i < group.items.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    (item as any).danger ? 'bg-red-100' : 'bg-peach-200'
                  }`}>
                    <item.icon className={`w-5 h-5 ${(item as any).danger ? 'text-red-500' : 'text-coral-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${(item as any).danger ? 'text-red-600' : 'text-gray-900'}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Notification toggles */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Notification Details</h2>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {toggles.map((t, i) => (
              <div
                key={t.label}
                className={`flex items-center justify-between px-4 py-4 ${i < toggles.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <span className="text-sm text-gray-700 font-medium">{t.label}</span>
                <button
                  onClick={() => flip(i)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-200 ${t.on ? 'gradient-coral' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${t.on ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content sensitivity */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Content Settings</h2>
          <div className="bg-white rounded-2xl shadow-card p-4">
            <p className="font-semibold text-sm text-gray-900 mb-1">Sensitive Content</p>
            <p className="text-xs text-gray-500 mb-4">Control what type of content appears in your feed.</p>
            {['Show Safe Content Only', 'Include Sensitive Discussions', 'Show Mature Discussions'].map((level, i) => (
              <label key={level} className="flex items-center gap-3 py-2 cursor-pointer">
                <input type="radio" name="sensitivity" defaultChecked={i === 0} className="text-coral-500 w-4 h-4" />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
