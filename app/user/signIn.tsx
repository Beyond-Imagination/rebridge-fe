import {
    TouchableOpacity,
    View,
    TextInput,
    Text,
    ViewStyle,
    StyleProp,
    TextStyle,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import React, { useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'expo-router'

import Logo from '@/components/Logo'
import { ChevronRightIcon, CrossButton, GoogleLoginIcon, IdIcon, KaKaoLoginIcon, NaverLoginIcon, PasswdIcon } from '@/icon'
import { ISignInRequest } from '@/type'
import { postSignIn } from '@/api/user'
import { useAuthorization } from '@/provider'

interface Inputs {
    id: string
    passwd: string
}

interface Styles {
    id: StyleProp<ViewStyle>
    passwd: StyleProp<ViewStyle>
    input: StyleProp<TextStyle>
    errorText: StyleProp<TextStyle>
}

export default function SignIn() {
    const navigator = useNavigation()
    const auth = useAuthorization()
    const styles = useMemo<Styles>(
        () => ({
            id: {
                alignItems: 'center',
                flexDirection: 'row',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                minHeight: 50,
                borderColor: '#DCDCE2',
                borderWidth: 1,
                paddingLeft: 10,
                minWidth: 280,
                maxWidth: 300,
            },
            passwd: {
                alignItems: 'center',
                flexDirection: 'row',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopWidth: 0,
                minHeight: 50,
                borderColor: '#DCDCE2',
                borderWidth: 1,
                paddingLeft: 10,
                minWidth: 280,
                maxWidth: 300,
            },
            input: {
                minWidth: 230,
                minHeight: 20,
                fontSize: 20,
                marginLeft: 10,
            },
            errorText: {
                color: 'red',
                fontSize: 15,
            },
        }),
        [],
    )
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<Inputs>()
    const errorMessage: string | undefined = errors?.id?.message || errors?.passwd?.message
    const mutation = useMutation({
        mutationFn: (body: ISignInRequest) => {
            return postSignIn(body)
        },
        onSuccess: async data => {
            navigator.dispatch(CommonActions.navigate({ name: 'index' }))
            auth.setJWT(data.jwt)
        },
    })

    const onSubmit = (data: Inputs) => {
        const request: ISignInRequest = {
            oauthId: data.id,
            password: data.passwd,
        }
        mutation.mutate(request)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView style={{ flexDirection: 'column', marginTop: 80, flexGrow: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: 'flex-end', paddingBottom: 60, paddingRight: 20 }}
                        onPress={() => {
                            navigator.goBack()
                        }}
                    >
                        <CrossButton width={30} height={30} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Logo type={2} style={{ width: 200, height: 90 }} />
                        <View style={{ alignItems: 'center', paddingTop: 50 }}>
                            <View style={styles.id}>
                                <IdIcon width={30} height={30} />
                                <Controller
                                    control={control}
                                    rules={{ required: '아이디 입력이 필요합니다' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="아이디"
                                            placeholderTextColor="#B0B0B0"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="id"
                                />
                            </View>
                            <View style={styles.passwd}>
                                <PasswdIcon width={30} height={30} />
                                <Controller
                                    control={control}
                                    rules={{ required: '비밀번호 입력이 필요합니다' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="비밀번호"
                                            placeholderTextColor="#B0B0B0"
                                            textContentType="password"
                                            secureTextEntry={true}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="passwd"
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>{errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}</View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#FF6C3ECC',
                                    borderRadius: 7,
                                    minWidth: 280,
                                    minHeight: 50,
                                    padding: 20,
                                    marginTop: 40,
                                    alignItems: 'center',
                                }}
                                onPress={handleSubmit(onSubmit)}
                                disabled={isSubmitting || mutation.isPending}
                            >
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontSize: 18,
                                        textAlignVertical: 'center',
                                    }}
                                >
                                    로그인
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ color: '#C6C6CF', fontSize: 15, marginVertical: 20 }}>또는</Text>
                            {/*TODO: make Oauth2.0 Login*/}
                            <View style={{ flexDirection: 'row', gap: 20 }}>
                                <KaKaoLoginIcon />
                                <NaverLoginIcon />
                                <GoogleLoginIcon />
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 20, marginTop: 20 }}>
                                <Link href={'/user/signUp'} style={{ alignContent: 'center' }}>
                                    <Text style={{ fontSize: 15, textAlignVertical: 'center', marginRight: 5 }}>회원가입</Text>
                                    <ChevronRightIcon width={10} height={10} />
                                </Link>
                                {/*TODO: make find account page*/}
                                <Link href={''} style={{ alignContent: 'center' }}>
                                    <Text style={{ fontSize: 15, textAlignVertical: 'center', marginRight: 5 }}>계정을 잊으셨나요?</Text>
                                    <ChevronRightIcon width={10} height={10} />
                                </Link>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
