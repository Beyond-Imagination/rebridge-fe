import { Text, View } from 'react-native'
import { Link } from 'expo-router'

// '/' page
export default function Index() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/*TODO: make main Contents*/}
            {/*여기서 로그인 페이지로 Redirect 해야함*/}
            <Text>Edit app/index.tsx to edit this screen</Text>
            {/*TODO: remove link to signIn*/}
            <Link href={'/user/signIn'}>signIn</Link>
            {/*TODO: remove link to (tabs)/home*/}
            <Link href={'/(tabs)/home'}>home</Link>
        </View>
    )
}
