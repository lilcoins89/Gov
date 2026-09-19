import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, AUTH_REDIRECT_URL } from '@/lib/supabase';

export type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  role: 'client' | 'admin';
  created_at: string;
};

type AuthResult = { error: string | null };

type AuthContextValue = {
  session: Session | null;
  user: SupabaseUser | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, name: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Never surface raw Supabase auth error strings — they enable account
 * enumeration. Genericize the credential/existence signal but pass through
 * actionable states (unconfirmed email, rate limits, weak password).
 */
function friendlyAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('email not confirmed')) {
    return 'Please confirm your email address before signing in. Check your inbox for the confirmation link.';
  }
  if (lower.includes('invalid login credentials')) {
    return 'Invalid email or password.';
  }
  if (lower.includes('rate limit') || lower.includes('too many')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (lower.includes('already registered')) {
    return 'An account with this email already exists. Try signing in instead.';
  }
  if (lower.includes('password should be at least') || lower.includes('password is too short')) {
    return message;
  }
  if (lower.includes('unable to validate email') || lower.includes('email_address_invalid')) {
    return 'Enter a valid email address.';
  }
  return 'Something went wrong. Please try again.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProfile(userId: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, role, created_at')
        .eq('id', userId)
        .maybeSingle();
      if (!mounted) return;
      if (!error && data) setProfile(data as Profile);
      else setProfile(null);
    }

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) await loadProfile(data.session.user.id);
      if (mounted) setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      if (newSession?.user) {
        await loadProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: friendlyAuthError(error.message) };
    return { error: null };
  };

  const signUp = async (email: string, password: string, name: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: AUTH_REDIRECT_URL(),
        data: { name },
      },
    });
    if (error) return { error: friendlyAuthError(error.message) };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
