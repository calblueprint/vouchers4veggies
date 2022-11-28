import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import fbApp from '../database/clientApp';
import { AuthDispatch } from '../screens/auth/AuthContext';

export const signIn = async (
  dispatch: AuthDispatch,
  params: { email: string; password: string },
) => {
  const auth = getAuth(fbApp);
  signInWithEmailAndPassword(auth, params.email, params.password)
    .then(async userCredential => {
      const { user } = userCredential;
      console.log(
        'Auth Success: signed in user with email',
        userCredential.user.email,
      );
      dispatch({ type: 'SIGN_IN', user });
    })
    .catch(error => {
      console.warn('(signIn) error', error);
      dispatch({ type: 'SET_ERROR_MESSAGE', errorMessage: error.message });
    });
};

export const signOut = async (dispatch: AuthDispatch) => {
  const auth = getAuth(fbApp);
  auth
    .signOut()
    .then(() => {
      dispatch({ type: 'SIGN_OUT' });
    })
    .catch(error => {
      console.warn('(signOut) error', error);
      dispatch({ type: 'SET_ERROR_MESSAGE', errorMessage: error.message });
    });
};

export const signUp = async (
  dispatch: AuthDispatch,
  params: { email: string; password: string },
) => {
  const auth = getAuth(fbApp);
  createUserWithEmailAndPassword(auth, params.email, params.password)
    .then(async userCredential => {
      const { user } = userCredential;
      console.log(
        'Auth Success: created user with email',
        userCredential.user.email,
      );
      dispatch({ type: 'SIGN_IN', user });
    })
    .catch(error => {
      console.warn('(signUp) error', error);
      dispatch({ type: 'SET_ERROR_MESSAGE', errorMessage: error.message });
    });
};
