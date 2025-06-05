import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';
import FlashcardApp from './components/FlashcardApp'; // ✅ points to HomeScreen.tsx
import Login from './components/LoginScreen';       // ✅ points to LoginScreen.tsx

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error.message);
        return;
      }

      setUser(session?.user ?? null);
    };

    getSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      data.subscription.unsubscribe(); // ✅ fixed unsubscribe
    };
  }, []);

  return user ? <FlashcardApp user={user} /> : <Login onLogin={() => {}} />;
}
