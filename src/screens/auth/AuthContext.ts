import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createContext, useReducer } from 'react';
import fbApp from '../../database/clientApp';

export type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
  authState?: AuthState;
};

export type AuthState = {
  userToken: string | null;
  isLoading: boolean;
  isSignout: boolean; // TODO: @wangannie use this to change the animation of the screen when signing out
  errorMessage: string | null;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

AuthContext.displayName = 'AuthContext';

export type AuthContextAction =
  | { type: 'RESTORE_TOKEN'; token: string | null }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' }
  | { type: 'ERROR'; errorMessage: string };

export const useAuthReducer = () =>
  useReducer(
    (prevState: AuthState, action: AuthContextAction) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            errorMessage: null,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            errorMessage: null,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            errorMessage: null,
          };
        case 'ERROR':
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
      userToken: null,
      errorMessage: null,
    },
  );

export const getAuthContext = (
  dispatch: React.Dispatch<AuthContextAction>,
): AuthContextType => ({
  signIn: async (email: string, password: string) => {
    const auth = getAuth(fbApp);
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const { user } = userCredential;

        console.log(
          'Auth Success: signed in user with email',
          userCredential.user.email,
        );
        // After getting the user credential, persist the uid in AsyncStorage
        await AsyncStorage.setItem('uid', user.uid);
        dispatch({ type: 'SIGN_IN', token: user.uid });
      })
      .catch(error => {
        console.warn('(signIn) error', error);
        dispatch({ type: 'ERROR', errorMessage: error.message });
      });
  },
  signOut: async () => {
    // Remove the uid from AsyncStorage
    await AsyncStorage.removeItem('uid');
    dispatch({ type: 'SIGN_OUT' });
  },
  signUp: async (email: string, password: string) => {
    const auth = getAuth(fbApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const { user } = userCredential;
        console.log(
          'Auth Success: created user with email',
          userCredential.user.email,
        );
        await AsyncStorage.setItem('uid', user.uid);
        dispatch({ type: 'SIGN_IN', token: user.uid });
      })
      .catch(error => {
        console.warn('(signUp) error', error);
        dispatch({ type: 'ERROR', errorMessage: error.message });
      });
  },
});
