'use client';

import { useState } from 'react';
import { Coins, Zap, Gift, TrendingUp, ArrowUpRight, ArrowDownLeft, Star, Crown, Rocket } from 'lucide-react';

const COIN_PACKS = [
  { coins: 100, price: 0.99, popular: false },
  { coins: 500, price: 4.99, popular: false },
  { coins: 1200, price: 9.99, popular: true },
  { coins: 3000, price: 24.99, popular: false },
  { coins: 7000, price: 49.99, popular: false },
  { coins: 15000, price: 99.99, popular: false },
];

const GIFTS = [
  { emoji: '🌹', name: 'Rose', coins: 10 },
  { emoji: '❤️', name: 'Heart', coins: 25 },
  { emoji: '🎁', name: 'Gift Box', coins: 50 },
  { emoji: '👑', name: 'Crown', coins: 100 },
  { emoji: '🚀', name: 'Rocket', coins: 200 },
  { emoji: '💎', name: 'Diamond', coins: 500 },
];

const EARN_METHODS = [
  { icon: TrendingUp, title: 'Daily Login', desc: 'Login every day to earn points', reward: '+10 pts', done: true },
  { icon: Star, title: 'Complete Profile', desc: 'Fill in all profile fields', reward: '+100 pts', done: true },
  { icon: Gift, title: 'Invite a Friend', desc: 'Share your referral code', reward: '+200 pts', done: false },
  { icon: Zap, title: 'Join a Community', desc: 'Become a member of any community', reward: '+50 pts', done: true },
  { icon: Crown, title: 'Host an Event', desc: 'Create and host your first event', reward: '+500 pts', done: false },
  { icon: Rocket, title: 'Post Quality Content', desc: 'Get 50+ likes on a post', reward: '+150 pts', done: false },
];

const TRANSACTIONS = [
  { type: 'spend', desc: 'Gift sent to Sarah Jones', amount: -25, currency: 'coins', date: '2h ago' },
  { type: 'earn', desc: 'Daily login bonus', amount: +10, currency: 'points', date: '6h ago' },
  { type: 'spend', desc: 'Profile boost (3 days)', amount: -200, currency: 'coins', date: '1d ago' },
  { type: 'earn', desc: 'Referral bonus — Alex joined', amount: +200, currency: 'points', date: '2d ago' },
  { type: 'spend', desc: 'Community subscription — Entrepreneurs Uganda', amount: -50, currency: 'coins', date: '5d ago' },
  { type: 'earn', desc: 'Post reached 50 likes!', amount: +150, currency: 'points', date: '1w ago' },
];

export default function TokensPage() {
  const [activeTab, setActiveTab] = useState<'coins' | 'points' | 'gifts'>('coins');
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tokens & Coins</h1>
        <p className="text-sm text-gray-500 mt-0.5">Earn, spend, and gift your way to better connections</p>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="gradient-coral rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="w-5 h-5 text-white/80" />
              <span className="text-sm text-white/80 font-medium">Coins Balance</span>
            </div>
            <p className="text-4xl font-bold mb-1">800</p>
            <p className="text-white/60 text-xs">≈ $6.50 USD</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-card border border-green-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-500 font-medium">Points Balance</span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">2,100</p>
            <p className="text-gray-400 text-xs">Earned through activity</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6">
        {(['coins', 'points', 'gifts'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
              activeTab === t ? 'gradient-coral text-white shadow-coral-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'coins' && (
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Buy Coins</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {COIN_PACKS.map((pack, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                  selected === i
                    ? 'border-coral-500 bg-coral-50'
                    : 'border-gray-200 bg-white hover:border-coral-300 shadow-card'
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-2 left-4 gradient-coral text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Best Value
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <Coins className={`w-6 h-6 ${selected === i ? 'text-coral-500' : 'text-gray-400'}`} />
                </div>
                <p className={`text-xl font-bold mb-1 ${selected === i ? 'text-coral-600' : 'text-gray-900'}`}>
                  {pack.coins.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Coins</p>
                <p className={`font-bold mt-2 ${selected === i ? 'text-coral-500' : 'text-gray-700'}`}>${pack.price}</p>
              </button>
            ))}
          </div>

          <button
            disabled={selected === null}
            className="w-full py-4 rounded-2xl gradient-coral text-white font-bold text-lg disabled:opacity-40 hover:opacity-90 transition-opacity shadow-coral-md"
          >
            {selected !== null ? `Buy ${COIN_PACKS[selected].coins.toLocaleString()} Coins — $${COIN_PACKS[selected].price}` : 'Select a Pack'}
          </button>

          <p className="text-center text-xs text-gray-400 mt-3">
            Secured payments via Flutterwave · Mobile Money · Visa · Mastercard
          </p>

          {/* What coins do */}
          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-4">What You Can Do With Coins</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Rocket, label: 'Boost Profile', cost: '50-200 coins' },
                { icon: Gift, label: 'Send Gifts', cost: '10-500 coins' },
                { icon: Zap, label: 'AI Features', cost: '100 coins/mo' },
                { icon: Star, label: 'Premium Stickers', cost: '25 coins' },
                { icon: Crown, label: 'Event Promotion', cost: '200 coins' },
                { icon: TrendingUp, label: 'Post Boost', cost: '100-500 coins' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-card">
                  <div className="w-9 h-9 rounded-xl gradient-coral flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'points' && (
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Earn Points</h2>
          <p className="text-sm text-gray-500 mb-5">Points are earned free through activity. They cannot be purchased.</p>
          <div className="space-y-3 mb-8">
            {EARN_METHODS.map((method) => (
              <div key={method.title} className={`flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card ${method.done ? 'opacity-60' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method.done ? 'bg-green-100' : 'gradient-coral shadow-coral-sm'}`}>
                  <method.icon className={`w-5 h-5 ${method.done ? 'text-green-500' : 'text-white'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{method.title}</p>
                  <p className="text-xs text-gray-500">{method.desc}</p>
                </div>
                <span className={`text-sm font-bold ${method.done ? 'text-green-500' : 'text-coral-500'}`}>
                  {method.done ? 'Done ✓' : method.reward}
                </span>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-gray-900 mb-3">Transaction History</h3>
          <div className="space-y-2">
            {TRANSACTIONS.map((tx, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3.5 shadow-card">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'earn' ? 'bg-green-100' : 'bg-coral-100'}`}>
                  {tx.type === 'earn' ? (
                    <ArrowDownLeft className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-coral-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium truncate">{tx.desc}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
                <span className={`font-bold text-sm ${tx.amount > 0 ? 'text-green-500' : 'text-coral-500'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.currency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'gifts' && (
        <div>
          <h2 className="font-bold text-gray-900 mb-2">Send Gifts</h2>
          <p className="text-sm text-gray-500 mb-5">Show appreciation with animated gifts. Recipients earn real earnings.</p>
          <div className="grid grid-cols-3 gap-4">
            {GIFTS.map((gift) => (
              <button key={gift.name} className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all hover:scale-105 text-center">
                <div className="text-4xl mb-2">{gift.emoji}</div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{gift.name}</p>
                <div className="flex items-center justify-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-coral-500" />
                  <span className="text-xs text-coral-600 font-bold">{gift.coins}</span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            PARENE takes 20-30% of gifts. Creators receive 70-80% as withdrawable earnings.
          </p>
        </div>
      )}
    </div>
  );
}
