import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { Header } from '@/components/Header'

// 테스트 해보려면, (tabs)의 text를 변경해보세요
const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
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
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: '훈련기관 찾기',
                    tabBarIcon: ({ focused }) => <FontAwesome name={'search'} size={24} color={focused ? '#FF6C3E' : '#808080'} />,
                    tabBarActiveTintColor: tabBarLabelColor.active,
                    tabBarInactiveTintColor: tabBarLabelColor.inactive,
                }}
            />

            <Tabs.Screen
                name="myInfo"
                options={{
                    title: '내 정보',
                    tabBarIcon: ({ focused }) => <FontAwesome name={'user'} size={24} color={focused ? '#FF6C3E' : '#808080'} />,
                    tabBarActiveTintColor: tabBarLabelColor.active,
                    tabBarInactiveTintColor: tabBarLabelColor.inactive,
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
