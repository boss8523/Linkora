import { View, Text } from 'react-native'
import React from 'react'
import { useAppContext } from '@/context/AppProvider';

export default function explore() {
  const { channel, setChannel, thread, setThread } = useAppContext();
  return (
    <View>
      <Text>explore</Text>
    </View>
  )
}