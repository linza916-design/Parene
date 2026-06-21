'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users, TrendingUp, DollarSign, Flag, Shield, Eye,
  BarChart2, Heart, Star, ChevronRight, AlertTriangle,
  CheckCircle, XCircle, Clock, Search, Filter, Verified,
  Calendar, MessageCircle, Coins, Crown
} from 'lucide-react';
import { MOCK_USERS } from '@/lib/mock-data';

const STATS = [
  { label: 'Total Users', value: '2,401,284', change: '+12.4%', up: true, icon: Users, color: 'bg-blue-100 text-blue-600' },
  { label: 'Active Today', value: '184,923', change: '+5.2%', up: true, icon: TrendingUp, color: 'bg-coral-100 text-coral-600' },
  { label: 'Revenue Today', value: '$14,839', change: '+22.1%', up: true, icon: DollarSign, color: 'bg-green-100 text-green-600' },
  { label: 'Reports Pending', value: '47', change: '-8', up: false, icon: Flag, color: 'bg-red-100 text-red-600' },
  { label: 'Premium Users', value: '89,420', change: '+3.8%', up: true, icon: Star, color: 'bg-yellow-100 text-yellow-600' },
  { label: 'Coin Sales', value: '$6,201', change: '+18.5%', up: true, icon: Coins, color: 'bg-orange-100 text-orange-600' },
  { label: 'New Events', value: '342', change: '+11%', up: true, icon: Calendar, color: 'bg-purple-100 text-purple-600' },
  { label: 'Communities', value: '52,149', change: '+4.2%', up: true, icon: MessageCircle, color: 'bg-teal-100 text-teal-600' },
];

const REVENUE_SOURCES = [
  { label: 'PARENE Plus', amount: 8420, pct: 57 },
  { label: 'Coin Sales', amount: 3201, pct: 22 },
  { label: 'Event Tickets', amount: 1840, pct: 12 },
  { label: 'Community Subs', amount: 880, pct: 6 },
  { label: 'Business Ads', amount: 498, pct: 3 },
];

const PENDING_REPORTS = [
  { id: '1', user: MOCK_USERS[0], type: 'Harassment', target: '@james_okafor', status: 'pending', date: '2h ago' },
  { id: '2', user: MOCK_USERS[1], type: 'Spam', target: 'Post #2847', status: 'reviewing', date: '5h ago' },
  { id: '3', user: MOCK_USERS[2], type: 'Fake Account', target: '@suspicious_user', status: 'pending', date: '1d ago' },
];

const VERIFICATION_QUEUE = [
  { user: MOCK_USERS[3], submitted: '1d ago', type: 'Identity' },
  { user: MOCK_USERS[4], submitted: '2d ago', type: 'Business' },
  { user: MOCK_USERS[5], submitted: '3d ago', type: 'Identity' },
];

const ADMIN_SECTIONS = [
  { href: '/admin/users', icon: Users, label: 'User Management', count: '2.4M' },
  { href: '/admin/content', icon: Eye, label: 'Content Moderation', count: '47 pending' },
  { href: '/admin/reports', icon: Flag, label: 'Reports Center', count: '12 new' },
  { href: '/admin/finance', icon: DollarSign, label: 'Financial Dashboard', count: '$14.8K' },
  { href: '/admin/communities', icon: MessageCircle, label: 'Communities', count: '52K' },
  { href: '/admin/events', icon: Calendar, label: 'Events', count: '342 new' },
  { href: '/admin/verification', icon: Verified, label: 'Verification Queue', count: '3 pending' },
  { href: '/admin/businesses', icon: Crown, label: 'Business Accounts', count: '1,284' },
];

export default function AdminDashboard() {
  const [reportAction, setReportAction] = useState<Record<string, string>>({});

  function takeAction(id: string, action: string) {
    setReportAction((prev) => ({ ...prev, [id]: action }));
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl gradient-coral flex items-center justify-center shadow-coral-sm">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900">PARENE</span>
            <span className="text-lg font-bold text-coral-500 ml-1">Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search users, reports..."
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-coral-400 w-64"
            />
          </div>
          <div className="w-9 h-9 rounded-xl gradient-coral flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Super Admin</p>
            <p className="text-xs text-gray-400">alex@parene.com</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.up ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue breakdown */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-card">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-coral-500" />
              Revenue Breakdown
            </h2>
            <div className="space-y-4">
              {REVENUE_SOURCES.map((src) => (
                <div key={src.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700">{src.label}</span>
                    <span className="text-sm font-bold text-gray-900">${src.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-coral rounded-full transition-all"
                      style={{ width: `${src.pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{src.pct}% of total</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Reports */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-500" />
                Pending Reports
              </h2>
              <Link href="/admin/reports" className="text-sm text-coral-500 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {PENDING_REPORTS.map((report) => (
                <div key={report.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <img src={report.user.avatar_url} alt="" className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm text-gray-900">{report.user.full_name}</span>
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">{report.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${report.status === 'reviewing' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-600'}`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Reported: {report.target} · {report.date}</p>
                  </div>
                  {!reportAction[report.id] ? (
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => takeAction(report.id, 'resolved')} className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors" title="Resolve">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </button>
                      <button onClick={() => takeAction(report.id, 'dismissed')} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" title="Dismiss">
                        <XCircle className="w-4 h-4 text-gray-500" />
                      </button>
                      <button onClick={() => takeAction(report.id, 'escalated')} className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors" title="Escalate">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                      reportAction[report.id] === 'resolved' ? 'bg-green-100 text-green-600' :
                      reportAction[report.id] === 'escalated' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {reportAction[report.id]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Verification Queue */}
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Verified className="w-5 h-5 text-coral-500" />
                Verification Queue
              </h2>
              <span className="text-xs bg-coral-100 text-coral-600 px-2.5 py-1 rounded-full font-bold">
                {VERIFICATION_QUEUE.length} pending
              </span>
            </div>
            <div className="space-y-3">
              {VERIFICATION_QUEUE.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <img src={item.user.avatar_url} alt="" className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{item.user.full_name}</p>
                    <p className="text-xs text-gray-500">{item.type} verification · {item.submitted}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button className="px-3 py-1.5 rounded-lg gradient-coral text-white text-xs font-semibold shadow-coral-sm">Approve</button>
                    <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-coral-500" />
                Recent Users
              </h2>
              <Link href="/admin/users" className="text-sm text-coral-500 font-medium flex items-center gap-1">
                Manage <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-2">
              {MOCK_USERS.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center gap-3 py-2">
                  <div className="relative flex-shrink-0">
                    <img src={user.avatar_url} alt="" className="w-9 h-9 rounded-xl object-cover" />
                    {user.is_online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.full_name}</p>
                      {user.is_verified && <Verified className="w-3.5 h-3.5 text-coral-500 fill-coral-100 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{user.location}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {user.is_premium && <span className="text-xs bg-coral-100 text-coral-600 px-1.5 py-0.5 rounded-full font-medium">Plus</span>}
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Admin Sections</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ADMIN_SECTIONS.map((section) => (
              <Link
                key={section.label}
                href={section.href}
                className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 group"
              >
                <div className="w-11 h-11 rounded-xl gradient-coral flex items-center justify-center mb-4 shadow-coral-sm group-hover:scale-105 transition-transform">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{section.label}</p>
                <p className="text-xs text-coral-500 font-medium">{section.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
