import React from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'

interface Props {
    container: StyleProp<ViewStyle>
    label: StyleProp<TextStyle>
    text: string
    children: React.ReactNode
}

export default function InputForm({ container, label, text, children }: Props) {
    return (
        <View style={container}>
            <Text style={label}>{text}</Text>
            {children}
        </View>
    )
}
