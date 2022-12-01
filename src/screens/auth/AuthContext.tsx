import { getAuth, User } from 'firebase/auth';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import fbApp from '../../database/clientApp';

export type AuthDispatch = React.Dispatch<AuthContextAction>;

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isSignout: boolean; // TODO: @wangannie use this to change the animation of the screen when signing out
  dispatch: AuthDispatch;
  errorMessage: string | null;
};

type AuthContextAction =
  | { type: 'RESTORE_USER'; user: User | null }
  | { type: 'SIGN_IN'; user: User }
  | { type: 'SIGN_OUT' }
  | { type: 'SET_ERROR_MESSAGE'; errorMessage: string };

const useAuthReducer = () =>
  useReducer(
    (prevState: AuthState, action: AuthContextAction) => {
      switch (action.type) {
        case 'RESTORE_USER':
          return {
            ...prevState,
            isLoading: false,
            user: action.user,
            errorMessage: null,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoading: false,
            isSignout: false,
            user: action.user,
            errorMessage: null,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoading: false,
            isSignout: true,
            user: null,
            errorMessage: null,
          };
        case 'SET_ERROR_MESSAGE':
          return {
            ...prevState,
            errorMessage: action.errorMessage,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: null,
      dispatch: () => null,
      errorMessage: null,
    },
  );

const AuthContext = createContext<AuthState>({} as AuthState);

AuthContext.displayName = 'AuthContext';

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, dispatch] = useAuthReducer();

  // Subscribe to auth state changes and restore the user if they're already signed in
  useEffect(() => {
    const unsubscribe = getAuth(fbApp).onAuthStateChanged(user => {
      dispatch({ type: 'RESTORE_USER', user });
    });
    return unsubscribe;
  }, []);

  const authContextValue = useMemo(
    () => ({
      ...authState,
      dispatch,
    }),
    [authState, dispatch],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
