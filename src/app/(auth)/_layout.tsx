import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
import {useRouter} from 'expo-router'
import * as Sentry from '@sentry/react-native'
export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()



  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    return router.replace('/(tabs)')
  }

  return <Stack screenOptions={{headerShown:false}}/>
}
