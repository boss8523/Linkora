import { View, Text } from 'react-native'
import React from 'react'
import * as Sentry from "@sentry/react-native";
import { Button } from 'react-native';
export default function index() {
  return (
    <View className="flex-1 items-center justify-center">
     <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
    </View>
  )
}