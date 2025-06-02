import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // ✅ correct path
import FlashcardApp from './components/FlashcardApp.tsx';
import LoginScreen from './LoginScreen';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // ✅ Get current session when app loads
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setSession(data.session);
      }
    };

    getSession();

    // ✅ Listen for login/logout changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // ✅ Clean up listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return session ? (
    <FlashcardApp user={session.user} />
  ) : (
    <LoginScreen />
  );
}
