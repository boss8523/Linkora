import React from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@clerk/expo'
import { useRouter } from 'expo-router'
import * as Sentry from '@sentry/react-native'

export default function ProfileScreen() {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.replace('/(auth)')
      Sentry.logger.info('User signed out successfully')
    } catch (e) {
      console.error('Error signing out:', e)
    }
  }

  return (
    <ScrollView className="flex-1 bg-[#F4F0FF]">
      <View className="px-6 pt-16 pb-8">
        <View className="items-center rounded-[32px] bg-[#6C4DFF] px-6 py-8">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-white">
            <Text className="text-4xl">👨‍🎓</Text>
          </View>

          <View className="mt-4 flex-row items-center">
            <Text className="text-2xl font-bold text-white">Ali Mohammed</Text>

            <View className="ml-2 flex-row items-center rounded-full bg-white/20 px-2 py-1">
              <Ionicons name="star" size={13} color="white" />
              <Text className="ml-1 text-xs font-semibold text-white">
                Premium
              </Text>
            </View>
          </View>

          <Text className="mt-1 text-white/80">
            UAE University • Computer Science
          </Text>
          <Text className="text-white/80">Year 1</Text>

          <View className="mt-6 w-full flex-row justify-between">
            <StatCard label="Study Hours" value="48h" />
            <StatCard label="Rooms Joined" value="15" />
            <StatCard label="Tutoring" value="8" />
          </View>
        </View>

        <View className="mt-6 rounded-3xl bg-white p-5">
          <Text className="mb-4 text-lg font-bold text-[#1F1B2E]">
            My Courses
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {['Calculus I', 'Physics I', 'Programming Fundamentals'].map(
              (course) => (
                <View
                  key={course}
                  className="rounded-full bg-[#EEE7FF] px-4 py-2"
                >
                  <Text className="font-medium text-[#6C4DFF]">{course}</Text>
                </View>
              )
            )}
          </View>
        </View>

        <View className="mt-6 rounded-3xl bg-white p-3">
          <MenuItem icon="trophy-outline" title="Achievements" />
          <MenuItem icon="stats-chart-outline" title="Study Statistics" />
          <MenuItem icon="settings-outline" title="Settings" />
          <MenuItem icon="help-circle-outline" title="Help & Support" />
<MenuItem
  icon="log-out-outline"
  title="Logout"
  danger
  onPress={handleLogout}
/>
        </View>
      </View>
    </ScrollView>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="w-[31%] rounded-2xl bg-white/15 px-2 py-4">
      <Text className="text-center text-xl font-bold text-white">{value}</Text>
      <Text className="mt-1 text-center text-xs text-white/80">{label}</Text>
    </View>
  )
}

function MenuItem({
  icon,
  title,
  danger,
  onPress
}: {
  icon: keyof typeof Ionicons.glyphMap
  title: string
  danger?: boolean
  onPress?: () => void | Promise<void>
}) {
  return (
    <Pressable className="flex-row items-center justify-between rounded-2xl px-3 py-4 active:bg-[#F4F0FF]" onPress={onPress}>
      <View className="flex-row items-center">
        <Ionicons
          name={icon}
          size={22}
          color={danger ? '#EF4444' : '#6C4DFF'}
        />

        <Text
          className={`ml-3 text-base font-medium ${
            danger ? 'text-red-500' : 'text-[#1F1B2E]'
          }`}
        >
          {title}
        </Text>
      </View>

      {!danger && (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </Pressable>
  )
}