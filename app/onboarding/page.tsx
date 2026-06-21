'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const INTERESTS = [
  'Travel', 'Technology', 'Music', 'Gaming', 'Fitness', 'Business',
  'Sports', 'Art', 'Photography', 'Food', 'Fashion', 'Reading',
  'Movies', 'Nature', 'Politics', 'Finance', 'Spirituality', 'Cooking',
];

const LOOKING_FOR = [
  { id: 'friends', label: 'Friends', emoji: '👫', desc: 'Find genuine friendships' },
  { id: 'dating', label: 'Dating', emoji: '❤️', desc: 'Find romantic connections' },
  { id: 'networking', label: 'Networking', emoji: '🤝', desc: 'Grow professionally' },
  { id: 'mentorship', label: 'Mentorship', emoji: '🎓', desc: 'Learn and grow' },
  { id: 'communities', label: 'Communities', emoji: '🌐', desc: 'Find your tribe' },
  { id: 'travel', label: 'Travel Companions', emoji: '✈️', desc: 'Explore the world together' },
];

const REL_STATUS = ['Single', 'Married', 'In Relationship', 'Complicated', 'Open Relationship', 'Rather Not Say'];

const GENDERS = ['Male', 'Female', 'Non-binary', 'Rather Not Say'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    gender: '',
    country: '',
    interests: [] as string[],
    looking_for: [] as string[],
    relationship_status: '',
  });

  const totalSteps = 4;

  function toggleInterest(i: string) {
    setProfile((p) => ({
      ...p,
      interests: p.interests.includes(i) ? p.interests.filter((x) => x !== i) : [...p.interests, i],
    }));
  }

  function toggleLookingFor(id: string) {
    setProfile((p) => ({
      ...p,
      looking_for: p.looking_for.includes(id) ? p.looking_for.filter((x) => x !== id) : [...p.looking_for, id],
    }));
  }

  async function finish() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').update({
        gender: profile.gender,
        country: profile.country,
        interests: profile.interests,
        looking_for: profile.looking_for,
        relationship_status: profile.relationship_status,
      }).eq('id', user.id);
    }
    router.push('/app/feed');
  }

  return (
    <div className="min-h-screen bg-peach-200 font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl gradient-coral flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PARENE</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'w-10 bg-coral-500' : 'w-6 bg-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Step {step + 1} of {totalSteps}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-card">
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Tell us about yourself</h2>
              <p className="text-gray-500 mb-6">Help us personalize your experience.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    {GENDERS.map((g) => (
                      <button
                        key={g}
                        onClick={() => setProfile((p) => ({ ...p, gender: g }))}
                        className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          profile.gender === g
                            ? 'border-coral-500 bg-coral-50 text-coral-600'
                            : 'border-gray-200 text-gray-700 hover:border-coral-300'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={profile.country}
                    onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))}
                    placeholder="e.g. Uganda, Kenya, Nigeria..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-400 bg-gray-50 text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">What are you into?</h2>
              <p className="text-gray-500 mb-6">Choose at least 3 interests to help us find your match.</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      profile.interests.includes(interest)
                        ? 'gradient-coral text-white shadow-coral-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {profile.interests.includes(interest) && <Check className="inline w-3 h-3 mr-1" />}
                    {interest}
                  </button>
                ))}
              </div>
              {profile.interests.length > 0 && (
                <p className="text-sm text-coral-500 mt-3">{profile.interests.length} selected</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">What are you looking for?</h2>
              <p className="text-gray-500 mb-6">You can select multiple options.</p>
              <div className="grid grid-cols-2 gap-3">
                {LOOKING_FOR.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleLookingFor(item.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      profile.looking_for.includes(item.id)
                        ? 'border-coral-500 bg-coral-50'
                        : 'border-gray-200 hover:border-coral-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <p className={`font-semibold text-sm ${profile.looking_for.includes(item.id) ? 'text-coral-600' : 'text-gray-900'}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Relationship Status</h2>
              <p className="text-gray-500 mb-6">This helps us show you more relevant connections.</p>
              <div className="space-y-2">
                {REL_STATUS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setProfile((p) => ({ ...p, relationship_status: s }))}
                    className={`w-full py-3.5 px-4 rounded-xl border-2 text-left font-medium transition-all ${
                      profile.relationship_status === s
                        ? 'border-coral-500 bg-coral-50 text-coral-600'
                        : 'border-gray-200 text-gray-700 hover:border-coral-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            {step < totalSteps - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-full gradient-coral text-white font-semibold hover:opacity-90 transition-opacity shadow-coral-sm"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finish}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-full gradient-coral text-white font-semibold hover:opacity-90 transition-opacity shadow-coral-sm disabled:opacity-60"
              >
                {loading ? 'Setting up...' : 'Finish Setup'}
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          <button onClick={() => router.push('/app/feed')} className="hover:text-coral-500 transition-colors">
            Skip for now
          </button>
        </p>
      </div>
    </div>
  );
}
