import 'dotenv/config';

export default {
  expo: {
    name: 'vouchers4veggies',
    slug: 'vouchers4veggies',
    owner: 'vouchers4veggies',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/appstore.png',
    userInterfaceStyle: 'light',
    // splash: {
    //   image: './assets/splash.png',
    //   resizeMode: 'contain',
    //   backgroundColor: '#ffffff',
    // },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'org.calblueprint.vouchers4veggies',
      icon: './assets/appstore.png',
    },
    android: {
      package: 'org.calblueprint.vouchers4veggies',
      icon: './assets/android.png',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      eas: {
        projectId: 'fc600ca8-9104-4545-93ad-fccb1898ecfe',
      },
    },
  },
};
