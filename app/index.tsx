import { Text, View } from 'react-native'

// '/' page
export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/*여기서 로그인 페이지로 Redirect 해야함*/}
            <Text>Edit app/index.tsx to edit this screen</Text>
        </View>
    )
}
