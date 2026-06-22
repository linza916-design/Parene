'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Lock, Eye, EyeOff, Chrome, Github, Facebook, Apple } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      router.push('/app/feed');
    }
  }

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-coral-600/80 via-coral-500/60 to-peach-400/40" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold text-white">PARENE</span>
          </Link>
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Welcome back.</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Your connections are waiting for you. Dive back in.
            </p>
            <div className="flex gap-4">
              {[
                { val: '2.4M+', label: 'Members' },
                { val: '120+', label: 'Countries' },
                { val: '50K+', label: 'Communities' },
              ].map((s) => (
                <div key={s.label} className="glassmorphism rounded-2xl px-5 py-3 text-center">
                  <p className="text-white font-bold text-xl">{s.val}</p>
                  <p className="text-white/70 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl gradient-coral flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PARENE</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Log in to your account to continue.</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                id="auth-email" // Matches label htmlFor
      name="email"    // Enables browser autofill
      autoComplete="email" // Explicit hint for browsers
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <a href="#" className="text-sm text-coral-500 hover:text-coral-600">Forgot password?</a>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl gradient-coral text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-coral-sm disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-gray-400">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Chrome, label: 'Google' },
              { icon: Github, label: 'GitHub' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Apple, label: 'Apple' },
            ].map((p) => (
              <button
                key={p.label}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <p.icon className="w-4 h-4" />
                {p.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-coral-500 font-semibold hover:text-coral-600">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
