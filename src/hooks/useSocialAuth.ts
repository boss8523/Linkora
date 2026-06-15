import { useSSO } from "@clerk/expo"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert } from "react-native"


const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null)
    const {startSSOFlow} = useSSO()
    const router = useRouter()
    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple" | "oauth_github") => {
        if(loadingStrategy) return
        setLoadingStrategy(strategy)
        try {
            const {createdSessionId,setActive} = await startSSOFlow({strategy})
            if (!createdSessionId || !setActive) {
                const Provider= strategy === "oauth_google" ? "Google" : strategy === "oauth_apple" ? "Apple" : "GitHub"
                Alert.alert("sign-in incomplete", ` ${Provider} sign in did not complete. Please try again.`)
                setLoadingStrategy(null)
                return
            }

            try {
                await setActive({session: createdSessionId})
                router.replace("/")
                setLoadingStrategy(null)
            } catch (error) {
                const Provider= strategy === "oauth_google" ? "Google" : strategy === "oauth_apple" ? "Apple" : "GitHub"
                console.error(`Error during ${strategy} authentication:`, error)
                Alert.alert("sign-in incomplete", `Failed to set active session with ${Provider}. Please try again.`)
                setLoadingStrategy(null)
            }

        } catch (error) {
            console.error(`Error during ${strategy} authentication:`, error)
        }finally {
            setLoadingStrategy(null)
        }
    }
  return {
handleSocialAuth,loadingStrategy
  }
}
export default useSocialAuth

