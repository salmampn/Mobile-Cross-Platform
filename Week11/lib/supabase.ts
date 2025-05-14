import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jwsyfpurdcxxnqzkqrds.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3c3lmcHVyZGN4eG5xemtxcmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMTI4MDQsImV4cCI6MjA2Mjc4ODgwNH0.ssMWanEur7a6xg_2yebD7YTnJQxSfglQo-4zAV6x7wc'

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
    realtime: {
        // Disable WebSockets to avoid stream dependency issues
        params: {
            eventsPerSecond: 0,
        },
    },
});

export { supabase };