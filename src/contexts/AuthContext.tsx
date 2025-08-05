import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../supabase-client";

interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual Supabase auth state listener
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //   async (event, session) => {
    //     if (session?.user) {
    //       setUser({
    //         id: session.user.id,
    //         email: session.user.email || '',
    //       });
    //     } else {
    //       setUser(null);
    //     }
    //     setLoading(false);
    //   }
    // );

    // Mock auth state check
    const checkAuthState = () => {
      const mockUser = localStorage.getItem("mockUser");
      if (mockUser) {
        setUser(JSON.parse(mockUser));
      }
      setLoading(false);
    };

    checkAuthState();

    // Cleanup subscription on unmount
    // return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual Supabase authentication
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });

      // if (error) throw error;

      // Mock authentication
      const mockUser = {
        id: "1",
        email: email,
      };

      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const error = supabase.auth.signUp({ email, password });
      if (error) console.error("Error signing up", error);
      console.log("Mock signup successful for:", email);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // TODO: Replace with actual Supabase sign out
      // const { error } = await supabase.auth.signOut();
      // if (error) throw error;

      // Mock sign out
      localStorage.removeItem("mockUser");
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
