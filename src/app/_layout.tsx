import { Stack } from "expo-router";
import "../../global.css"
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import * as Sentry from '@sentry/react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
Sentry.init({
  dsn: 'https://47fa8f01d4ee83f85d4fb4d0d02a645d@o4511563180867584.ingest.de.sentry.io/4511563190501456',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name="(auth)/_layout" />
          <Stack.Screen name="(tabs)/_layout" />
        </Stack>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
      

export default Sentry.wrap(RootLayout);
