import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function SSOCallback() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-[#f6f0ff]">
        <ActivityIndicator size="large" color="#6f43f3" />
      </View>
    );
  }

  return <Redirect href={isSignedIn ? "/" : "/(auth)"} />;
}
