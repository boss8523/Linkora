import { Text, View, StyleSheet, Pressable } from "react-native";
import {useAuth} from '@clerk/expo'
import { Redirect } from "expo-router";
export default function Index() {
   const { isSignedIn, isLoaded,signOut } = useAuth()
   
  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <Redirect href={'/(auth)'} />
  }

  return (
   <Redirect href={'./(tabs)/index'} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
