'use client';

import { useState } from 'react';
import {
  Search, Phone, Video, MoreHorizontal, Send, Paperclip,
  Smile, Mic, Image, ArrowLeft, Circle
} from 'lucide-react';
import { MOCK_CONVERSATIONS, MOCK_CHAT_MESSAGES } from '@/lib/mock-data';

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const conv = activeConv ? MOCK_CONVERSATIONS.find((c) => c.id === activeConv) : null;

  const filtered = MOCK_CONVERSATIONS.filter((c) => {
    const name = c.type === 'direct' ? c.participant?.full_name : c.name;
    return name?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen flex">
      {/* Conversation list */}
      <div className={`${activeConv ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 lg:w-96 border-r border-gray-100 bg-white`}>
        <div className="p-5 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-coral-400 text-gray-900 placeholder-gray-400 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((c) => {
            const name = c.type === 'direct' ? c.participant?.full_name : c.name;
            const avatar = c.type === 'direct' ? c.participant?.avatar_url : c.avatar_url;
            const isOnline = c.type === 'direct' ? c.is_online : false;
            const active = activeConv === c.id;

            return (
              <button
                key={c.id}
                onClick={() => setActiveConv(c.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left ${
                  active ? 'bg-peach-200 border-r-2 border-coral-500' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img src={avatar} alt={name} className="w-12 h-12 rounded-2xl object-cover" />
                  {isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-semibold text-gray-900 text-sm truncate">{name}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{c.last_message_at}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.last_message}</p>
                </div>
                {c.unread_count > 0 && (
                  <span className="flex-shrink-0 w-5 h-5 gradient-coral rounded-full text-white text-xs flex items-center justify-center font-bold">
                    {c.unread_count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat window */}
      {conv ? (
        <div className={`${activeConv ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-peach-200`}>
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center gap-3">
            <button onClick={() => setActiveConv(null)} className="md:hidden text-gray-500 mr-1">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <img
                src={conv.type === 'direct' ? conv.participant?.avatar_url : conv.avatar_url}
                alt=""
                className="w-10 h-10 rounded-2xl object-cover"
              />
              {conv.type === 'direct' && conv.is_online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">
                {conv.type === 'direct' ? conv.participant?.full_name : conv.name}
              </p>
              <p className="text-xs text-gray-500">
                {conv.type === 'direct' ? (conv.is_online ? 'Online now' : 'Offline') : `${conv.participants_count?.toLocaleString()} members`}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Phone className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Video className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {MOCK_CHAT_MESSAGES.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.is_mine ? 'flex-row-reverse' : ''}`}>
                {!msg.is_mine && (
                  <img
                    src={conv.participant?.avatar_url}
                    alt=""
                    className="w-8 h-8 rounded-xl object-cover flex-shrink-0"
                  />
                )}
                <div className={`max-w-xs lg:max-w-md ${msg.is_mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.is_mine
                        ? 'gradient-coral text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md shadow-card'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-xs text-gray-400 px-1">{msg.created_at}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-100 p-4">
            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2">
              <button className="text-gray-400 hover:text-coral-500 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && setMessage('')}
              />
              <button className="text-gray-400 hover:text-coral-500 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-coral-500 transition-colors">
                <Image className="w-5 h-5" />
              </button>
              {message.trim() ? (
                <button
                  onClick={() => setMessage('')}
                  className="w-8 h-8 rounded-xl gradient-coral flex items-center justify-center shadow-coral-sm hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              ) : (
                <button className="w-8 h-8 rounded-xl bg-gray-200 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-peach-200">
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl gradient-coral flex items-center justify-center mx-auto mb-4 shadow-coral-md">
              <Circle className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Select a conversation</h3>
            <p className="text-gray-500 text-sm">Choose a conversation from the left to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}
