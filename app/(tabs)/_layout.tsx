import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { Header } from '@/components/Header'
import { useAuthorization } from '@/provider'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'

// 테스트 해보려면, (tabs)의 text를 변경해보세요
const TabLayout = () => {
    const auth = useAuthorization()
    const navigator = useNavigation()
    const [isFirstLoad, setIsFirstLoad] = useState(true)

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false)
            setTimeout(() => {
                navigator.dispatch(CommonActions.navigate({ name: 'user/signIn' }))
            }, 700)
        }
    }, [isFirstLoad, navigator])
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: '홈',
                    tabBarIcon: ({ focused }) => <FontAwesome name={'home'} size={24} color={focused ? '#FF6C3E' : '#808080'} />,
                    tabBarActiveTintColor: tabBarLabelColor.active,
                    tabBarInactiveTintColor: tabBarLabelColor.inactive,
                    header: () => <Header type={1} />,
                }}
            />
            <Tabs.Screen
                name="recommend"
                options={{
                    title: '훈련과정 추천',
                    tabBarIcon: ({ focused }) => <FontAwesome name={'suitcase'} size={24} color={focused ? '#FF6C3E' : '#808080'} />,
                    tabBarActiveTintColor: tabBarLabelColor.active,
                    tabBarInactiveTintColor: tabBarLabelColor.inactive,
                    header: () => <Header type={2} title={'훈련과정 추천'} />,
                }}
            />
            <Tabs.Screen
                name="search"
                initialParams={{ searchText: '', tagList: [] }}
                options={{
                    title: '훈련기관 찾기',
                    tabBarIcon: ({ focused }) => <FontAwesome name={'search'} size={24} color={focused ? '#FF6C3E' : '#808080'} />,
                    tabBarActiveTintColor: tabBarLabelColor.active,
                    tabBarInactiveTintColor: tabBarLabelColor.inactive,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="myInfo"
                listeners={{
                    tabPress: e => {
                        if (!auth.jwt) {
                            e.preventDefault()
                            navigator.dispatch(CommonActions.navigate({ name: 'user/signIn' }))
                        }
                    },
                }}
                options={{
                    title: '내 정보',
                    tabBarIcon: ({ focused }) => <FontAwesome name={'user'} size={24} color={focused ? '#FF6C3E' : '#808080'} />,
                    tabBarActiveTintColor: tabBarLabelColor.active,
                    tabBarInactiveTintColor: tabBarLabelColor.inactive,
                    header: () => <Header type={2} title={'내 정보'} />,
                }}
            />
        </Tabs>
    )
}

const tabBarLabelColor = {
    active: '#FF6C3E',
    inactive: '#808080',
}

export default TabLayout
