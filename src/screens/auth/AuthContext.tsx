import { getAuth, User } from 'firebase/auth';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import fbApp from '../../database/clientApp';
import { Uuid } from '../../types/types';
import { getVendorUuid } from '../../utils/authUtils';

export type AuthDispatch = React.Dispatch<AuthContextAction>;

type AuthState = {
  user: User | null;
  vendorUuid: Uuid | null;
  isLoading: boolean;
  isSignout: boolean; // TODO: @wangannie use this to change the animation of the screen when signing out
  dispatch: AuthDispatch;
  errorMessage: string | null;
  successMessage: string | null;
};

type AuthContextAction =
  | { type: 'RESTORE_USER'; user: User | null; vendorUuid: Uuid | null }
  | { type: 'SIGN_IN'; user: User; vendorUuid: Uuid }
  | { type: 'SIGN_OUT' }
  | { type: 'SET_ERROR_MESSAGE'; errorMessage: string }
  | { type: 'SET_SUCCESS_MESSAGE'; successMessage: string };

const useAuthReducer = () =>
  useReducer(
    (prevState: AuthState, action: AuthContextAction) => {
      switch (action.type) {
        case 'RESTORE_USER':
          return {
            ...prevState,
            isLoading: false,
            user: action.user,
            vendorUuid: action.vendorUuid,
            errorMessage: null,
            successMessage: null,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoading: false,
            isSignout: false,
            user: action.user,
            vendorUuid: action.vendorUuid,
            errorMessage: null,
            successMessage: null,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoading: false,
            isSignout: true,
            user: null,
            vendor: null,
            errorMessage: null,
          };
        case 'SET_SUCCESS_MESSAGE':
          return {
            ...prevState,
            successMessage: action.successMessage,
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
      vendorUuid: null,
      dispatch: () => null,
      errorMessage: null,
      successMessage: null,
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
    const unsubscribe = getAuth(fbApp).onAuthStateChanged(async user => {
      let vendorUuid = null;
      if (user) {
        vendorUuid = await getVendorUuid(user);
      }
      dispatch({ type: 'RESTORE_USER', user, vendorUuid });
    });
    return unsubscribe;
  }, [dispatch]);

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
