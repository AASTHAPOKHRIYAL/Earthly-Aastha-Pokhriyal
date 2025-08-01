
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, confirmPassword: string, username: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, confirmPassword: string, username: string) => {
    // Validate all fields are required
    if (!email || !password || !confirmPassword || !username) {
      return { error: { message: 'All fields are required' } };
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return { error: { message: 'Passwords do not match' } };
    }

    // Check if username already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingProfile) {
      return { error: { message: 'Username already exists' } };
    }

    const redirectUrl = `${window.location.origin}/`;
    
    // Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          username: username,
        },
      },
    });

    if (signUpError) {
      return { error: signUpError };
    }

    // If signup was successful and we have a user, insert profile data
    if (signUpData?.user) {
      const uid = signUpData.user.id;
      
      const { error: insertError } = await supabase.from('profiles').insert({
        id: uid,
        username: username,
        email: email,
        bio: null,
        avatar_url: null,
        created_at: new Date().toISOString(),
        // updated_at is now handled automatically by the database trigger
      });

      if (insertError) {
        console.error('Profile insert failed:', insertError);
        // Still return success if auth worked, as trigger might have handled it
      }
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
