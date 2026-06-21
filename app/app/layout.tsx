'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart, Home, Compass, Users, MessageCircle, Calendar,
  Bell, User, Settings, Zap, Shield, TrendingUp, Menu, X,
  LogOut, Star, Coins, ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/app/feed', icon: Home, label: 'Feed' },
  { href: '/app/discover', icon: Compass, label: 'Discover' },
  { href: '/app/friends', icon: Users, label: 'Friends' },
  { href: '/app/communities', icon: TrendingUp, label: 'Communities' },
  { href: '/app/events', icon: Calendar, label: 'Events' },
  { href: '/app/messages', icon: MessageCircle, label: 'Messages', badge: 3 },
  { href: '/app/notifications', icon: Bell, label: 'Notifications', badge: 7 },
  { href: '/app/profile', icon: User, label: 'Profile' },
];

const BOTTOM_ITEMS = [
  { href: '/app/tokens', icon: Coins, label: 'Tokens & Coins' },
  { href: '/app/settings', icon: Settings, label: 'Settings' },
  { href: '/admin', icon: Shield, label: 'Admin Panel' },
];

const DEMO_USER = {
  full_name: 'Alex Wright',
  username: 'alex_wright',
  avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  is_premium: true,
  coins: 800,
  points: 2100,
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-peach-200 font-sans flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-sidebar z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link href="/app/feed" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl gradient-coral flex items-center justify-center shadow-coral-sm">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PARENE</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User card */}
        <div className="p-4 border-b border-gray-100">
          <Link href="/app/profile" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-peach-200 transition-colors">
            <div className="relative">
              <img
                src={DEMO_USER.avatar_url}
                alt={DEMO_USER.full_name}
                className="w-11 h-11 rounded-2xl object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-gray-900 text-sm truncate">{DEMO_USER.full_name}</p>
                {DEMO_USER.is_premium && (
                  <Star className="w-3 h-3 text-coral-400 fill-coral-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-gray-400">@{DEMO_USER.username}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </Link>

          {/* Coins & Points */}
          <div className="flex gap-2 mt-2 px-3">
            <div className="flex-1 bg-coral-50 rounded-xl p-2.5 text-center">
              <p className="text-xs text-gray-500">Coins</p>
              <p className="font-bold text-coral-600 text-sm">{DEMO_USER.coins.toLocaleString()}</p>
            </div>
            <div className="flex-1 bg-green-50 rounded-xl p-2.5 text-center">
              <p className="text-xs text-gray-500">Points</p>
              <p className="font-bold text-green-600 text-sm">{DEMO_USER.points.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    active
                      ? 'gradient-coral text-white shadow-coral-sm'
                      : 'text-gray-600 hover:bg-peach-200 hover:text-coral-600'
                  }`}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                  <span className="font-medium text-sm flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                      active ? 'bg-white/20 text-white' : 'bg-coral-100 text-coral-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 space-y-1">
            {BOTTOM_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    active
                      ? 'gradient-coral text-white shadow-coral-sm'
                      : 'text-gray-500 hover:bg-peach-200 hover:text-coral-600'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* PARENE Plus promo */}
        {!DEMO_USER.is_premium && (
          <div className="p-4 border-t border-gray-100">
            <div className="gradient-coral rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-white" />
                <p className="text-white font-semibold text-sm">Upgrade to Plus</p>
              </div>
              <p className="text-white/80 text-xs mb-3">Unlock unlimited messaging, AI discovery & more.</p>
              <button className="w-full py-2 rounded-xl bg-white text-coral-500 text-xs font-semibold hover:bg-coral-50 transition-colors">
                Upgrade — $7.99/mo
              </button>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-30 glassmorphism border-b border-peach-200 px-4 h-14 flex items-center justify-between">
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl gradient-coral flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-bold text-gray-900">PARENE</span>
          </div>
          <Link href="/app/notifications" className="relative">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-4 h-4 gradient-coral rounded-full text-white text-xs flex items-center justify-center">7</span>
          </Link>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
