/*

    해당 파일에는, 공통 UI Component를 정의합니다.
    2개의 서로 다른 components 로 navigate 할 때, 유지해야하는 공통적인 UI Component를 정의합니다.
    예를 들어, Header, Footer, Navigation Bar 등이 있습니다.
 */
import { Header } from '@/components/Header'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

// asset 이 로드되기 전 SplashScreen 가 사라지지 않도록 설정합니다.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
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
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="index"
                options={{
                    headerBackVisible: false,
                    header: () => <Header type={1} />,
                }}
            />
            <Stack.Screen name="+not-found" />
        </Stack>
    )
}
