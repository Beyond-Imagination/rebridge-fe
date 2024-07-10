import { View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

import { ChatbotIcon, ChevronLeftIcon, UserIcon } from '@/icon'
import Logo from '@/components/Logo'

interface Props {
    type: number // 1: main, 2: subTitle, 3: back with title
    title?: string
}

export function Header({ type, title }: Props) {
    if (type === 1) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 100, backgroundColor: '#FFFFFF' }}>
                <Logo type={2} style={{ width: 120, height: 50 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/*TODO: link to chatbot*/}
                    <Link href={''} style={{ marginHorizontal: 10 }}>
                        <ChatbotIcon width={40} height={40} />
                    </Link>
                    {/*TODO: link to user page*/}
                    <Link href={''} style={{ marginHorizontal: 10 }}>
                        <UserIcon width={40} height={40} />
                    </Link>
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 100, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {type === 3 && (
                        /*TODO: add navigate to back*/
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {}}>
                            <ChevronLeftIcon width={30} height={30} />
                        </TouchableOpacity>
                    )}
                    <Text style={{ fontWeight: 'bold', fontSize: 30, textAlignVertical: 'center', marginLeft: 15 }}>{title}</Text>
                </View>
            </View>
        )
    }
}
