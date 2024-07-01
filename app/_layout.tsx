import { useState, useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'

import { Header } from '@/components/Header'
import { AuthProvider } from '@/provider'

/*

    해당 파일에는, 공통 UI Component를 정의합니다.
    2개의 서로 다른 components 로 navigate 할 때, 유지해야하는 공통적인 UI Component를 정의합니다.
    예를 들어, Header, Footer, Navigation Bar 등이 있습니다.
 */

// asset 이 로드되기 전 SplashScreen 가 사라지지 않도록 설정합니다.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5, // 5 minutes
                        gcTime: 1000 * 60 * 5, // 5 minutes
                    },
                    mutations: {
                        throwOnError: true,
                        retry: 1,
                    },
                },
            }),
    )
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="index" options={{ headerBackVisible: false, header: () => <Header type={1} /> }} />
                    <Stack.Screen name="+not-found" />
                    <Stack.Screen name="user/signUp" options={{ headerShown: false }} />
                    <Stack.Screen name="user/signIn" options={{ headerShown: false }} />
                </Stack>
            </AuthProvider>
        </QueryClientProvider>
    )
}
