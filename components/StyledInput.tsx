import { TextInput, View, Text, TextInputProps } from 'react-native'
import styled from 'styled-components/native';

interface StyledInputProps extends TextInputProps {
    label?: string
}

const Label = styled.Text`
  margin: 10px;
  height: 25px;
`;

const Input = styled.TextInput`
  padding: 10px;
  border-width: 1px;
  border-color: #E0E0E0;
  border-radius: 30px;
  width: 300px;
  height: 40px;
`;

export default function StyledInput({ label, ...restProps }: StyledInputProps) {
    const isPasswordType = label === 'password' || label === '비밀번호'
    return (
        <View>
            {label && <Label>{label}</Label>}
            <Input {...restProps} secureTextEntry={isPasswordType}/>
        </View>
    )
}
