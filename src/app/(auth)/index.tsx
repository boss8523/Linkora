import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Sentry from "@sentry/react-native";
import useSocialAuth from "@/hooks/useSocialAuth";

const features = [
  {
    title: "AI Notes",
    subtitle: "Summaries, quizzes, flashcards",
    icon: "sparkles",
    colors: ["#8758ff", "#5f33f2"],
  },
  {
    title: "Course Rooms",
    subtitle: "Study with your classmates",
    icon: "book",
    colors: ["#4da6ff", "#1478ff"],
  },
  {
    title: "Study Match",
    subtitle: "Find the right partner",
    icon: "person",
    colors: ["#ff6bad", "#e83f8f"],
  },
] as const;

const Index = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();
  const { width, height } = useWindowDimensions();
  const isLoading = loadingStrategy !== null;
  const isSmallPhone = width < 380 || height < 720;
  const isTablet = width >= 768;
  const heroHeight = isTablet
    ? Math.min(540, height * 0.5)
    : Math.min(isSmallPhone ? 340 : 430, height * (isSmallPhone ? 0.42 : 0.48));
  const cardWidth = Math.min(width - (isSmallPhone ? 24 : 40), isTablet ? 520 : 430);
  const cardOverlap = isSmallPhone ? -42 : -64;
  const titleSize = isSmallPhone ? 42 : 48;
  const bodySize = isSmallPhone ? 14 : 16;
  const buttonHeight = isSmallPhone ? 56 : 64;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#f6f0ff]">
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fff8ff]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />

      <LinearGradient
        colors={["#fff8ff", "#eee5ff", "#f8f4ff"]}
        locations={[0, 0.52, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        className="absolute inset-0"
      />

      <ScrollView
        className="flex-1"
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: isSmallPhone ? 20 : 32 }}
      >
        <View
          className="overflow-hidden rounded-b-[44px] bg-[#8463de] shadow-2xl shadow-purple-900/30"
          style={{ height: heroHeight }}
        >
          <Image
            source={require("../../../assets/images/auth.png")}
            className="h-full w-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(246,240,255,0.18)", "#f6f0ff"]}
            locations={[0.2, 0.68, 1]}
            className="absolute inset-0"
          />

          <View className="absolute inset-x-0 top-0 px-5">
            <View className="mt-2 flex-row items-center justify-between">
              <View className="flex-row items-center rounded-full border border-white/30 bg-white/20 px-3 py-2">
                <View className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <Text className="text-sm font-semibold text-white">
                  Built for UAE students
                </Text>
              </View>
              <View className="h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20">
                <Ionicons name="sparkles" size={18} color="#fff" />
              </View>
            </View>
          </View>
        </View>

        <View
          className="items-center"
          style={{
            marginTop: cardOverlap,
            paddingHorizontal: isSmallPhone ? 12 : 20,
          }}
        >
          <View
            className="rounded-[32px] border border-white/80 bg-white/90 px-5 pb-6 pt-5 shadow-2xl shadow-purple-900/20"
            style={{ width: cardWidth }}
          >
            <View className="items-center">
              <View className="mb-3 h-16 w-16 items-center justify-center rounded-[24px] bg-[#6f47ff] shadow-xl shadow-purple-700/30">
                <Ionicons name="school" size={34} color="#fff" />
              </View>

              <Text
                className="text-center font-black text-[#211b3d]"
                style={{ fontSize: titleSize, lineHeight: titleSize + 6 }}
              >
                Linkora
              </Text>

           

         
            </View>

            <View className="mt-7 flex-row justify-between rounded-3xl bg-[#f8f4ff] px-2 py-4">
              {features.map((feature, index) => (
                <View key={feature.title} className="flex-1 items-center">
                  <LinearGradient
                    colors={feature.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-12 w-12 items-center justify-center rounded-2xl shadow-lg shadow-purple-900/20"
                  >
                    <Ionicons name={feature.icon} size={23} color="#fff" />
                  </LinearGradient>
                  <Text className="mt-3 text-center text-[13px] font-extrabold text-[#25223b]">
                    {feature.title}
                  </Text>
                  <Text className="mt-1 max-w-[92px] text-center text-[11px] leading-4 text-[#7d7690]">
                    {feature.subtitle}
                  </Text>
                  {index < features.length - 1 ? (
                    <View className="absolute right-0 top-4 h-20 w-px bg-[#e5ddf2]" />
                  ) : null}
                </View>
              ))}
            </View>

            <View className="mt-8 flex-row gap-3">
  
              <Pressable
                disabled={isLoading}
                onPress={() => handleSocialAuth("oauth_google")}
                className="flex-1 items-center justify-center rounded-2xl border border-[#eee9f6] bg-white shadow-lg shadow-purple-900/10 active:scale-[0.99] disabled:opacity-70"
                style={{ height: buttonHeight }}
              >
                {loadingStrategy === "oauth_google" ? (
                  <ActivityIndicator color="#6f43f3" />
                ) : (
                  <>
                    <FontAwesome name="google" size={isSmallPhone ? 22 : 24} color="#4285f4" />
            
                  </>
                )}
              </Pressable>

              <Pressable
                disabled={isLoading}
                onPress={() => handleSocialAuth("oauth_apple")}
                className="flex-1 items-center justify-center rounded-2xl border border-[#eee9f6] bg-white shadow-lg shadow-purple-900/10 active:scale-[0.99] disabled:opacity-70"
                style={{ height: buttonHeight }}
              >
                {loadingStrategy === "oauth_apple" ? (
                  <ActivityIndicator color="#6f43f3" />
                ) : (
                  <>
                    <FontAwesome name="apple" size={isSmallPhone ? 25 : 28} color="#050505" />
               
                  </>
                )}
              </Pressable>

              <Pressable
                disabled={isLoading}
                onPress={() => handleSocialAuth("oauth_github")}
                className="flex-1 items-center justify-center rounded-2xl border border-[#eee9f6] bg-white shadow-lg shadow-purple-900/10 active:scale-[0.99] disabled:opacity-70"
                style={{ height: buttonHeight }}
              >
                {loadingStrategy === "oauth_github" ? (
                  <ActivityIndicator color="#6f43f3" />
                ) : (
                  <>
                    <FontAwesome name="github" size={isSmallPhone ? 25 : 27} color="#181717" />
               
                  </>
                )}
              </Pressable>
            </View>

            <Text className="mt-5 text-center text-xs leading-5 text-[#817996]">
              By continuing, you agree to our{" "}
              <Text className="font-bold text-[#6f43f3]">Terms of Service</Text>{" "}
              and <Text className="font-bold text-[#6f43f3]">Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
