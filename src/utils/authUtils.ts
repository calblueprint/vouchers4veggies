import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import fbApp from '../database/clientApp';
import { AuthDispatch } from '../screens/auth/AuthContext';

/**
 * Helper function to set the error message in the auth context.
 * Use this function instead of using the dispatch directly.
 * We can add more error handling/reporting logic (e.g. reporting errors to Sentry) here in the future.
 */
export const setAuthErrorMessage = (
  dispatch: AuthDispatch,
  errorMessage: string,
) => dispatch({ type: 'SET_ERROR_MESSAGE', errorMessage });

export const signIn = async (
  dispatch: AuthDispatch,
  params: { email: string; password: string },
) => {
  const auth = getAuth(fbApp);
  await signInWithEmailAndPassword(auth, params.email, params.password)
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
      setAuthErrorMessage(dispatch, error.message);
    });
};

export const signOut = async (dispatch: AuthDispatch) => {
  const auth = getAuth(fbApp);
  await auth
    .signOut()
    .then(() => {
      dispatch({ type: 'SIGN_OUT' });
    })
    .catch(error => {
      console.warn('(signOut) error', error);
      setAuthErrorMessage(dispatch, error.message);
    });
};

export const signUp = async (
  dispatch: AuthDispatch,
  params: { email: string; password: string },
) => {
  const auth = getAuth(fbApp);
  await createUserWithEmailAndPassword(auth, params.email, params.password)
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
      setAuthErrorMessage(dispatch, error.message);
    });
};
