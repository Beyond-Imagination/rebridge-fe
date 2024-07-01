import { Image, ImageProps, StyleProp } from 'react-native'

interface Props {
    type: number // 1: white, 2: black
    style: StyleProp<ImageProps>
}

export default function Logo({ type, style }: Props) {
    if (type === 1) {
        return <Image style={style} source={require('../assets/images/rebridge-logo-white.png')} />
    } else {
        return <Image style={style} source={require('../assets/images/rebridge-logo-black.png')} />
    }
}
