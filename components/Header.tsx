import { Image, View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

import { ChatbotIcon, ChevronLeftIcon, UserIcon } from '@/icon'

interface Props {
    type: number // 1: main, 2: subTitle, 3: back with title
    title?: string
}

export function Header({ type, title }: Props) {
    if (type === 1) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 100, marginBottom: 5 }}>
                <Image style={{ width: 120, height: 50, marginLeft: 5 }} source={require('../assets/images/rebridge-logo.png')} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/*TODO: link to chatbot*/}
                    <Link href={''} style={{ marginHorizontal: 10 }}>
                        <ChatbotIcon />
                    </Link>
                    {/*TODO: link to user page*/}
                    <Link href={''} style={{ marginHorizontal: 10 }}>
                        <UserIcon />
                    </Link>
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 100, marginBottom: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {type === 3 && (
                        /*TODO: add navigate to back*/
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {}}>
                            <ChevronLeftIcon />
                        </TouchableOpacity>
                    )}
                    <Text style={{ fontWeight: 'bold', fontSize: 30, textAlignVertical: 'center', marginLeft: 15 }}>{title}</Text>
                </View>
            </View>
        )
    }
}
