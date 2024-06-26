import { Stack } from "expo-router"
import { Header } from '@/components/Header'

/*
    해당 파일에는, 공통 UI Component를 정의합니다.
    2개의 서로 다른 components 로 navigate 할 때, 유지해야하는 공통적인 UI Component를 정의합니다.
    예를 들어, Header, Footer, Navigation Bar 등이 있습니다.
 */


export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name='index' options={{
            header: () => <Header />,
        }} />
    </Stack>
  )
}
