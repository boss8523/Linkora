import React from 'react'
import { useUser } from '@clerk/expo'
import { Chat, OverlayProvider, useCreateChatClient } from 'stream-chat-expo'

import { FullScreenLoader } from './FullScreenLoader'

type UserResource = NonNullable<ReturnType<typeof useUser>['user']>

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY

const getUserName = (user: UserResource | null) => {
  return (
    user?.fullName ??
    user?.username ??
    user?.primaryEmailAddress?.emailAddress?.split('@')[0] ??
    'Linkora Student'
  )
}

const syncUserToStream = async (user: UserResource | null) => {
  if (!user) return

  try {
    await fetch('/api/sync-user+api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        name: getUserName(user),
        image: user.imageUrl,
      }),
    })
  } catch (e) {
    console.log('Failed to sync user', e)
  }
}

const linkoraChatTheme = {
  colors: {
    white: '#FFFFFF',
    black: '#1F1B2E',

    accent_blue: '#6C4DFF',
    accent_green: '#22C55E',
    accent_red: '#EF4444',

    bg_gradient_start: '#F7F3FF',
    bg_gradient_end: '#EEE7FF',

    grey: '#7A7390',
    grey_dark: '#1F1B2E',
    grey_gainsboro: '#EEE7FF',
    grey_whisper: '#F4F0FF',

    blue_alice: '#F4F0FF',
    transparent: 'transparent',
  },

  messageSimple: {
    content: {
      container: {
        borderRadiusL: 22,
        borderRadiusS: 22,
        paddingHorizontal: 14,
        paddingVertical: 10,
      },
      textContainer: {
        borderRadius: 22,
      },
      markdown: {
        text: {
          color: '#1F1B2E',
          fontSize: 15,
          lineHeight: 21,
        },
      },
    },

    avatarWrapper: {
      container: {
        marginRight: 8,
      },
    },
  },

  messageInput: {
    container: {
      backgroundColor: '#FFFFFF',
      borderTopColor: '#EEE7FF',
      borderTopWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    inputBoxContainer: {
      backgroundColor: '#F4F0FF',
      borderRadius: 22,
      borderWidth: 1,
      borderColor: '#EEE7FF',
      paddingHorizontal: 14,
    },
    inputBox: {
      color: '#1F1B2E',
      fontSize: 15,
    },
    sendButton: {
      color: '#6C4DFF',
    },
  },

  channelPreview: {
    container: {
      backgroundColor: '#FFFFFF',
      borderBottomColor: '#EEE7FF',
      borderBottomWidth: 1,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    title: {
      color: '#1F1B2E',
      fontSize: 16,
      fontWeight: '700' as const,
    },
    message: {
      color: '#7A7390',
      fontSize: 14,
    },
  },
}

const ChatClient = ({
  children,
  user,
}: {
  children: React.ReactNode
  user: UserResource | null
}) => {
  const syncedRef = React.useRef(false)

  if (!API_KEY) {
    return <>{children}</>
  }

  React.useEffect(() => {
    if (user && !syncedRef.current) {
      syncedRef.current = true
      syncUserToStream(user)
    }
  }, [user])

  const tokenProvider = async () => {
    const response = await fetch('/api/token+api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id,
      }),
    })

    const data = await response.json()
    return data.token
  }

  const chatClient = useCreateChatClient({
    apiKey: API_KEY,
    userData: {
      id: user?.id ?? '',
      name: getUserName(user),
      image: user?.imageUrl,
    },
    tokenOrProvider: tokenProvider,
  })

  if (!chatClient) {
    return <FullScreenLoader message="Connecting to chat..." />
  }

  return (
    <OverlayProvider value={{ style: linkoraChatTheme as any }}>
      <Chat client={chatClient}>{children}</Chat>
    </OverlayProvider>
  )
}

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <FullScreenLoader message="Loading..." />
  }

  if (!user) {
    return <>{children}</>
  }

  return <ChatClient user={user}>{children}</ChatClient>
}

export default ChatWrapper