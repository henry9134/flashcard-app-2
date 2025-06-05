import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import FlashcardApp from './components/FlashcardApp';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setSession(data.session);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (session) {
    return <FlashcardApp user={session.user} />;
  }

  return showSignup ? (
    <SignupScreen goToLogin={() => setShowSignup(false)} />
  ) : (
    <LoginScreen goToSignup={() => setShowSignup(true)} />
  );
}
