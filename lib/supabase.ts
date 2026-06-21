import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  location: string | null;
  country: string | null;
  gender: string | null;
  date_of_birth: string | null;
  relationship_status: string;
  looking_for: string[];
  interests: string[];
  is_verified: boolean;
  verification_level: string;
  is_premium: boolean;
  coins: number;
  points: number;
  reputation_score: number;
  is_online: boolean;
  last_seen: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export type Post = {
  id: string;
  user_id: string;
  content: string | null;
  media_urls: string[];
  post_type: string;
  categories: string[];
  sensitivity_level: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  saves_count: number;
  community_id: string | null;
  is_boosted: boolean;
  created_at: string;
  profiles?: Profile;
};

export type Community = {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  cover_url: string | null;
  avatar_url: string | null;
  category: string | null;
  is_private: boolean;
  is_paid: boolean;
  price: number | null;
  members_count: number;
  posts_count: number;
  is_featured: boolean;
  created_at: string;
};

export type Event = {
  id: string;
  host_id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  event_type: string;
  location: string | null;
  is_online: boolean;
  starts_at: string;
  ends_at: string | null;
  is_paid: boolean;
  ticket_price: number | null;
  max_attendees: number | null;
  attendees_count: number;
  is_featured: boolean;
  status: string;
  created_at: string;
  profiles?: Profile;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string | null;
  media_url: string | null;
  message_type: string;
  is_read: boolean;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  profiles?: Profile;
};

export type Notification = {
  id: string;
  user_id: string;
  actor_id: string | null;
  type: string;
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
  actor?: Profile;
};
