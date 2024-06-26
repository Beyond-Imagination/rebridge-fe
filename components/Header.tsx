import { Image, View } from 'react-native'
import {ChatbotIcon, UserIcon} from '@/icon'
import {Link} from 'expo-router'


export function Header() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 90, marginBottom: 5 }}>
            <Image style={{width: 120, height: 50 }}
                   source={require('../assets/images/rebridge-logo.png')} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {/*TODO: link to chatbot*/}
                <Link href={''} style={{ marginHorizontal: 10 }} >
                    <ChatbotIcon />
                </Link>
                {/*TODO: link to user page*/}
                <Link href={''} style={{ marginHorizontal: 10 }} >
                    <UserIcon />
                </Link>
            </View>
        </View>
    )
}

