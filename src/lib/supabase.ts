import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

/** A RESTful endpoint for querying and managing your database. */
const supabaseUrl = 'https://nzpsyqieyczmvsdreelf.supabase.co';
/** This key is safe to use in a browser if you have enabled Row Level Security (RLS) for your 
 * tables and configured policies. You may also use the service key which can be found below 
 * to bypass RLS.
 * @see https://supabase.com/docs/guides/auth/row-level-security */
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56cHN5cWlleWN6bXZzZHJlZWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNjE2MzEsImV4cCI6MjAyODgzNzYzMX0.CeOLOLXOBBZDMf4ZyRPB6x1_GGtxY01KSIFJiRU0Coo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});