import { createContext } from 'react';

export type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
  authState?: AuthState;
};

export type AuthState = {
  userToken: string | null;
  isLoading: boolean;
  isSignout: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export type AuthContextAction =
  | { type: 'RESTORE_TOKEN'; token: string | null }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };
