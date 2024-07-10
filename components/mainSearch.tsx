import { Dimensions } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import { Shadow } from 'react-native-shadow-2'

import { TagButtonList } from '@/components/tagButton'
import { SearchIcon } from '@/icon'
import { Controller, useForm } from 'react-hook-form'
import React, { useState } from 'react'

interface BoxProps {
    pos: number
}

interface Inputs {
    text: string
}

const screen = Dimensions.get('screen')

const BackgroundImage = styled.ImageBackground`
    width: 100%;
    height: ${screen.width}px;
    align-items: center;
    justify-items: center;
    margin-top: 30px;
`

const MainView = styled.View`
    background-color: #ffffff;
    width: 100%;
`

const ShadowStyle = styled(Shadow)`
    background-color: #ffffff;
    border-radius: 12px;
    border-color: #ffffff;
`

const InputBox = styled.View`
    background-color: #ffffff;
    border-radius: 12px;
    border-color: #ffffff;
    padding: 10px 20px 0 20px;
`

const BoxContent = styled.View<BoxProps>`
    background-color: #ffffff;
    flex-direction: row;
    width: ${screen.width * 0.7}px;
    align-items: center;
    border-bottom-left-radius: ${props => (props.pos === 3 ? '4px' : '0px')};
    border-bottom-right-radius: ${props => (props.pos === 3 ? '4px' : '0px')};
    border-top-left-radius: ${props => (props.pos === 1 ? '4px' : '0px')};
    border-top-right-radius: ${props => (props.pos === 1 ? '4px' : '0px')};
    border-color: #dcdce2;
    border-bottom-width: ${props => (props.pos === 1 ? '1px' : '0px')};
    padding: 10px 2px;
`

const TextInput = styled.TextInput`
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    min-width: ${screen.width * 0.6}px;
    max-width: ${screen.width * 0.6}px;
`

const Button = styled.TouchableOpacity`
    background-color: #ff6c3ecc;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    padding: 15px 10px;
`

const ButtonText = styled.Text`
    color: #ffffff;
    width: ${screen.width * 0.7}px;
    font-weight: bold;
    font-size: 25px;
    text-align: center;
`

export function MainSearch() {
    const navigator = useNavigation()
    const [clickedTags, setClickedTags] = useState<string[]>([])
    const { control, handleSubmit } = useForm<Inputs>()

    const handleTagClick = (text: string) => {
        setClickedTags(prevState => (prevState.includes(text) ? prevState.filter(tag => tag !== text) : [...prevState, text]))
    }
    const onPress = (data: Inputs) => {
        navigator.dispatch(
            CommonActions.navigate('search', {
                searchText: data.text,
                tagList: clickedTags,
            }),
        )
    }

    return (
        <MainView>
            <BackgroundImage height={screen.width} source={require('../assets/images/main-search-image.jpg')}>
                <ShadowStyle distance={5}>
                    <InputBox>
                        <BoxContent pos={1}>
                            <SearchIcon width={20} height={20} />
                            <Controller
                                control={control}
                                rules={{ required: '검색 문구가 없습니다' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder={'훈련기관 검색'}
                                        placeholderTextColor={'#90909F'}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="text"
                            />
                        </BoxContent>
                        <BoxContent pos={2}>
                            <TagButtonList clickedTags={clickedTags} handleTagClick={handleTagClick} />
                        </BoxContent>
                    </InputBox>
                    <Button onPress={handleSubmit(onPress)}>
                        <ButtonText>훈련기관 조회하기</ButtonText>
                    </Button>
                </ShadowStyle>
            </BackgroundImage>
        </MainView>
    )
}
