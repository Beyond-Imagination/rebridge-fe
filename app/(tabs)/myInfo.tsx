import {
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleProp,
    ViewStyle,
    TextStyle,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { getUserDetail, updateUserDetail } from '@/api'
import { useAuthorization } from '@/provider'
import { IUpdateUserRequest, IUserDetail } from '@/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

interface Styles {
    container: StyleProp<ViewStyle>
    label: StyleProp<TextStyle>
    input: StyleProp<TextStyle>
    errorText: StyleProp<TextStyle>
    dividerContainer: StyleProp<ViewStyle>
    divider: StyleProp<ViewStyle>
    dividerText: StyleProp<TextStyle>
}

const MyInfo = () => {
    const styles = useMemo<Styles>(
        () => ({
            container: {
                marginTop: 20,
                minWidth: 320,
                maxWidth: 320,
            },
            label: {
                marginBottom: 8,
                fontSize: 20,
            },
            input: {
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderRadius: 3,
                minHeight: 35,
                color: '#90909F',
                borderColor: '#DCDCE2',
                borderWidth: 1,
                paddingHorizontal: 10,
                minWidth: 320,
                maxWidth: 320,
            },
            dividerContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
            },
            divider: {
                flex: 1,
                height: 1,
                backgroundColor: '#DCDCE2',
            },
            dividerText: {
                marginHorizontal: 10,
                fontSize: 16,
                color: '#90909F',
            },
            errorText: {
                color: 'red',
                marginLeft: 4,
                fontSize: 14,
            },
        }),
        [],
    )
    const auth = useAuthorization()
    const [user, setUser] = useState<IUserDetail>({
        name: '',
        email: '',
        birthdate: new Date('1960-01-01'),
        gender: 0,
        occupation: '',
        oauthId: '',
        major: '',
        jobObjectives: '',
        address: '',
    })

    useEffect(() => {
        ;(async () => {
            try {
                const userData = await getUserDetail(auth)
                setUser(userData)
                setValue('occupation', userData.occupation)
                setValue('address', userData.address)
                setValue('jobObjectives', userData.jobObjectives)
                setValue('major', userData.major)
            } catch (error) {
                throw new Error('Failed to get user details')
            }
        })()
    }, [auth])

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (body: IUpdateUserRequest) => {
            return updateUserDetail(body)
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({
                queryKey: ['getUserDetail', auth.jwt],
            })
        },
    })

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = useForm<IUserDetail>()

    const onSubmit = (data: IUserDetail) => {
        const body: IUpdateUserRequest = {
            body: {
                occupation: data.occupation,
                address: data.address,
                major: data.major,
                jobObjectives: data.jobObjectives,
            },
            secret: {
                token: auth.jwt,
            },
        }
        mutation.mutate(body)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView style={{ flexDirection: 'column', marginTop: 20, flexGrow: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.container}>
                            <Text style={styles.label}>아이디</Text>
                            <TextInput style={styles.input} value={user.oauthId} editable={false} />
                            <Text style={styles.label}>이름</Text>
                            <TextInput style={styles.input} value={user.name} editable={false} />
                            {/*<Text style={styles.label}>생년월일</Text>*/}
                            {/*<Text style={styles.input}>{new Date(user.birthdate).toDateString()}</Text>*/}
                            <Text style={styles.label}>이메일 주소</Text>
                            <TextInput style={styles.input} value={user.email} editable={false} />
                            <Text style={styles.label}>성별</Text>
                            <TextInput style={styles.input} value={user.gender === 0 ? '남성' : '여성'} editable={false} />
                            <Text style={styles.label}>현재 직업</Text>
                            <Controller
                                control={control}
                                name="occupation"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} editable={true} />
                                )}
                            />
                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.dividerText}>추가 정보</Text>
                                <View style={styles.divider} />
                            </View>
                            <Text style={styles.label}>거주지</Text>
                            <Controller
                                control={control}
                                name="address"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput style={styles.input} onBlur={onBlur} value={value} onChangeText={onChange} editable={true} />
                                )}
                            />
                            <Text style={styles.label}>희망 직업</Text>
                            <Controller
                                control={control}
                                name="jobObjectives"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput style={styles.input} editable={true} value={value} onBlur={onBlur} onChangeText={onChange} />
                                )}
                            />
                            <Text style={styles.label}>전공</Text>
                            <Controller
                                control={control}
                                name="major"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput style={styles.input} editable={true} value={value} onBlur={onBlur} onChangeText={onChange} />
                                )}
                            />
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
                                disabled={isSubmitting}
                            >
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontSize: 18,
                                        textAlignVertical: 'center',
                                    }}
                                >
                                    수정
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default MyInfo
