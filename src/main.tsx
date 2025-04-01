import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import App from './App';
import './index.css';
supabase.auth.getSession().then(({ data: { session } }) => {
  const user = session?.user ? { ...session.user, email: session.user.email ?? '' } : null; 
  useAuthStore.getState().setUser(user);
});

supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.getState().setUser(session?.user ? { ...session.user, email: session.user.email ?? '' } : null);
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
    <App />
);