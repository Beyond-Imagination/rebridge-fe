import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleProp,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker'
import PickerSelect from 'react-native-picker-select'

import { ISignUpInputs, ISignUpRequest } from '@/type'
import InputForm from '@/components/inputForm'
import { CarotDown } from '@/icon'
import { useMutation } from '@tanstack/react-query'
import { postSignUp } from '@/api'

interface Styles {
    container: StyleProp<ViewStyle>
    label: StyleProp<TextStyle>
    input: StyleProp<TextStyle>
    errorText: StyleProp<TextStyle>
}

export default function SignUp() {
    const navigator = useNavigation()
    const [show, setShow] = useState(false)
    const [success, setSuccess] = useState(false)

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
            errorText: {
                color: 'red',
                marginLeft: 4,
                fontSize: 14,
            },
        }),
        [],
    )
    const {
        control,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ISignUpInputs>()

    const mutation = useMutation({
        mutationFn: (body: ISignUpRequest) => {
            return postSignUp(body)
        },
        onSuccess: async () => {
            setSuccess(true)
        },
    })

    useEffect(() => {
        setValue('birthDate', new Date('1960-01-01'))
    }, [setValue])

    const onSubmit = (data: ISignUpInputs) => {
        const body: ISignUpRequest = {
            oauthProvider: 'rebridge',
            oauthId: data.id,
            password: data.passwd1,
            name: data.name,
            email: data.email,
            birthDate: data.birthDate,
            gender: data.gender - 1,
            occupation: data.occupation,
        }
        mutation.mutate(body)
    }

    const onModalClose = () => {
        setSuccess(false)
        navigator.dispatch(CommonActions.navigate({ name: 'user/signIn' }))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView style={{ flexDirection: 'column', marginTop: 80, flexGrow: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <InputForm container={styles.container} label={styles.label} text={'아이디'}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Controller
                                    control={control}
                                    name="id"
                                    rules={{
                                        required: '아이디 입력이 필요합니다',
                                        minLength: { value: 4, message: '아이디는 4~12자리이어야 합니다.' },
                                        maxLength: { value: 12, message: '아이디는 4~12자리이어야 합니다.' },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={{
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                borderRadius: 3,
                                                minHeight: 35,
                                                borderColor: '#DCDCE2',
                                                borderWidth: 1,
                                                paddingHorizontal: 10,
                                                minWidth: 250,
                                                maxWidth: 250,
                                            }}
                                            placeholder="입력"
                                            placeholderTextColor="#B0B0B0"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                                {/*TODO: 중복 확인 기능 추가*/}
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#FF6C3ECC',
                                        borderRadius: 7,
                                        minWidth: 30,
                                        minHeight: 35,
                                        padding: 10,
                                        marginLeft: 10,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#FFFFFF',
                                            fontSize: 15,
                                            textAlignVertical: 'center',
                                        }}
                                    >
                                        중복확인
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10 }}>{errors.id?.message && <Text style={styles.errorText}>{errors.id?.message}</Text>}</View>
                        </InputForm>
                        <InputForm container={styles.container} label={styles.label} text={'비밀번호'}>
                            <Controller
                                control={control}
                                name="passwd1"
                                rules={{
                                    required: '비밀번호 입력이 필요합니다',
                                    minLength: { value: 8, message: '8자리 이상 영어, 숫자, 특수문자(!, @, #, $, %, ^, &, *)를 사용하세요.' },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                                        message: '8자리 이상 영어, 숫자, 특수문자(!, @, #, $, %, ^, &, *)를 사용하세요.',
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="입력"
                                        placeholderTextColor="#B0B0B0"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        textContentType="password"
                                        secureTextEntry={true}
                                    />
                                )}
                            />
                            <View style={{ marginTop: 10 }}>
                                {errors.passwd1?.message && <Text style={styles.errorText}>{errors.passwd1?.message}</Text>}
                            </View>
                        </InputForm>
                        <InputForm container={styles.container} label={styles.label} text={'비밀번호 확인'}>
                            <Controller
                                control={control}
                                name="passwd2"
                                rules={{
                                    required: '비밀번호 확인이 필요합니다',
                                    validate: value => value === watch('passwd1') || '비밀번호가 맞지 않습니다.',
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="입력"
                                        placeholderTextColor="#B0B0B0"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        textContentType="password"
                                        secureTextEntry={true}
                                    />
                                )}
                            />
                            <View style={{ marginTop: 10 }}>
                                {errors.passwd2?.message && <Text style={styles.errorText}>{errors.passwd2?.message}</Text>}
                            </View>
                        </InputForm>
                        <InputForm container={styles.container} label={styles.label} text={'이름'}>
                            <Controller
                                control={control}
                                name="name"
                                rules={{ required: '이름 입력이 필요합니다' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="입력"
                                        placeholderTextColor="#B0B0B0"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            <View style={{ marginTop: 10 }}>
                                {errors.name?.message && <Text style={styles.errorText}>{errors.name?.message}</Text>}
                            </View>
                        </InputForm>
                        <InputForm container={styles.container} label={styles.label} text={'email'}>
                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: '이메일 입력이 필요합니다',
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '유효한 email을 입력해주세요' },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="입력"
                                        placeholderTextColor="#B0B0B0"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            <View style={{ marginTop: 10 }}>
                                {errors.email?.message && <Text style={styles.errorText}>{errors.email?.message}</Text>}
                            </View>
                        </InputForm>
                        <InputForm container={styles.container} label={styles.label} text={'생년월일'}>
                            <Controller
                                control={control}
                                name="birthDate"
                                rules={{ required: '생년월일이 필요합니다' }}
                                render={({ field: { onChange, value } }) => (
                                    <View style={{ maxWidth: 320 }}>
                                        <TouchableOpacity style={styles.input} onPress={() => setShow(!show)}>
                                            <Text style={{ color: '#90909F' }}>
                                                {value && value.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </Text>
                                            <CarotDown width={20} height={20} />
                                        </TouchableOpacity>
                                        {show && (
                                            <DateTimePicker
                                                mode="date"
                                                value={value}
                                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                minimumDate={new Date('1910-01-01')}
                                                locale={'ko-KR'}
                                                onChange={async (event, selectedDate) => {
                                                    if (Platform.OS === 'android') {
                                                        setShow(false)
                                                    }
                                                    if (event.type === 'set' && selectedDate) {
                                                        onChange(selectedDate)
                                                    }
                                                }}
                                            />
                                        )}
                                    </View>
                                )}
                            />
                            <View style={{ marginTop: 10 }}>
                                {errors.birthDate?.message && <Text style={styles.errorText}>{errors.birthDate?.message}</Text>}
                            </View>
                        </InputForm>
                        <InputForm container={styles.container} label={styles.label} text={'성별'}>
                            <Controller
                                control={control}
                                name="gender"
                                rules={{ required: '성별 입력이 필요합니다', validate: value => value !== -1 || '성별 입력이 필요합니다' }}
                                render={({ field: { onChange, value } }) => (
                                    <PickerSelect
                                        placeholder={{ label: '입력', value: -1 }}
                                        style={{
                                            inputIOS: styles.input,
                                            inputAndroid: styles.input,
                                        }}
                                        fixAndroidTouchableBug={true}
                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={value => onChange(value)}
                                        items={[
                                            { label: '남자', value: 1 },
                                            { label: '여자', value: 2 },
                                        ]}
                                        value={value}
                                    />
                                )}
                            />
                            <View style={{ marginTop: 10 }}>
                                {errors.gender?.message && <Text style={styles.errorText}>{errors.gender?.message}</Text>}
                            </View>
                        </InputForm>
                        <InputForm container={styles.container} label={styles.label} text={'직업'}>
                            <View>
                                <Controller
                                    control={control}
                                    name="occupation"
                                    rules={{ required: '직업 입력이 필요합니다' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="입력"
                                            placeholderTextColor="#B0B0B0"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                                <Text style={{ marginTop: 4, paddingLeft: 5, color: '#90909F', fontSize: 12 }}>
                                    현재 직업이 없는 경우 이전 직업을 선택해주세요
                                </Text>
                                <View style={{ marginTop: 10 }}>
                                    {errors.occupation?.message && <Text style={styles.errorText}>{errors.occupation?.message}</Text>}
                                </View>
                            </View>
                        </InputForm>
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
                                회원가입
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Modal animationType="fade" transparent={true} visible={success}>
                    <View style={{ height: '100%', width: '100%', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, marginBottom: 10 }}>회원 가입 완료</Text>
                        <View
                            style={{
                                height: 140,
                                width: 300,
                                justifyContent: 'center',
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: '#DCDCE2',
                                paddingHorizontal: 50,
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>회원님의 아이디는</Text>
                            <View>
                                <Text style={{ width: '100%', fontSize: 25, color: '#FF6C3ECC' }}>{watch('id')}</Text>
                                <Text style={{ fontSize: 20 }}>입니다.</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#FF6C3ECC',
                                borderRadius: 7,
                                minWidth: 300,
                                minHeight: 50,
                                padding: 20,
                                marginTop: 40,
                                alignItems: 'center',
                            }}
                            onPress={onModalClose}
                        >
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    fontSize: 18,
                                    textAlignVertical: 'center',
                                }}
                            >
                                로그인 하러가기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
