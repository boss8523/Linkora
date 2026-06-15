import { ActivityIndicator, Text, View } from "react-native";





export function FullScreenLoader ({ message }: { message: string }) {
    return (
        <View className="flex-1 items-center justify-center bg-gray-900">
            <ActivityIndicator size="large" color="#6f43f3" />
            <Text className="mt-4 text-lg font-semibold text-white">{message}</Text>
        </View>
    );
}

export function FullScreenError ({ message }: { message: string }) {
    return (
        <View className="flex-1 items-center justify-center bg-gray-900">
            <ActivityIndicator size="large" color="#EF4444" />
            {message && (
                <Text className="mt-4 text-lg font-semibold text-white">{message}</Text>
            )}
        </View>
    );
};