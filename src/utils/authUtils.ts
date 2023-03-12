import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
import fbApp from '../database/clientApp';
import { getVendorByEmail } from '../database/queries';
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

export const setAuthSuccessMessage = (
  dispatch: AuthDispatch,
  successMessage: string,
) => dispatch({ type: 'SET_SUCCESS_MESSAGE', successMessage });

export const getVendorUuid = async (user: User) => {
  const vendor = await getVendorByEmail(user.email);
  return vendor.uuid;
};

export const forgotPassword = async (
  dispatch: AuthDispatch,
  params: { email: string },
) => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, params.email)
    .then(() => {
      setAuthSuccessMessage(dispatch, 'Email sent. Check your inbox to reset.');
      setAuthErrorMessage(dispatch, '');
    })
    .catch(error => {
      setAuthErrorMessage(dispatch, error.message);
      setAuthSuccessMessage(dispatch, '');
    });
};

export const signIn = async (
  dispatch: AuthDispatch,
  params: { email: string; password: string },
) => {
  const auth = getAuth(fbApp);
  await signInWithEmailAndPassword(auth, params.email, params.password)
    .then(async userCredential => {
      const { user } = userCredential;
      // eslint-disable-next-line no-console
      console.log(
        'Auth Success: signed in user with email',
        userCredential.user.email,
      );
      const vendorUuid = await getVendorUuid(user);
      dispatch({ type: 'SIGN_IN', user, vendorUuid });
    })
    .catch(error => {
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.log(
        'Auth Success: created user with email',
        userCredential.user.email,
      );
      const vendorUuid = await getVendorUuid(user);
      dispatch({ type: 'SIGN_IN', user, vendorUuid });
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.warn('(signUp) error', error);
      setAuthErrorMessage(dispatch, error.message);
    });
};
