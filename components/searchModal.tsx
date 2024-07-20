import React, { useEffect, useState } from 'react'
import { Dimensions, Modal } from 'react-native'
import styled from 'styled-components/native'
import { Controller, useForm } from 'react-hook-form'

import { TagButtonList } from '@/components/tagButton'
import { ChevronLeftIcon, CrossButton, SearchIcon } from '@/icon'
import { SearchTarget } from '@/type'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchResultType2 } from '@/components/searchResult'
import { Shadow } from 'react-native-shadow-2'

interface Props {
    defaultTarget: SearchTarget
    onClose: () => void
}

interface HistoryProps {
    data: SearchTarget[]
    update: () => void
}

interface Inputs {
    text: string
}

const screen = Dimensions.get('screen')

const ShadowStyle = styled(Shadow)``

const MainView = styled.View`
    width: 100%;
    height: 100%;
    background-color: #dcdce2;
    z-index: 1;
`

const HeaderView = styled.View`
    width: 100%;
    background-color: #ffffff;
    padding-top: ${screen.height * 0.08}px;
    padding-bottom: 10px;
`

const HeaderBox = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`

const TagBox = styled.View`
    margin-left: 35px;
`

const SearchHistoryView = styled.ScrollView`
    background-color: #ffffff;
    width: 100%;
    margin-top: 10px;
`

const HistoryBox = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-color: #dcdce2;
    border-bottom-width: 1px;
`

const HistoryContent = styled.View`
    flex-direction: row;
    align-items: center;
`

const CloseButton = styled.TouchableOpacity`
    margin-left: 10px;
`

const HeaderText = styled.TextInput`
    font-size: 20px;
    margin-left: 10px;
    width: 80%;
`

const HistoryText = styled.Text`
    font-size: 20px;
    margin-left: 10px;
`

const HistoryDateText = styled.Text`
    font-size: 15px;
    color: #90909f;
`

function SearchHistory({ data, update }: HistoryProps) {
    const deleteHistory = async (index: number) => {
        const newData = data.filter((_, i) => i !== index)
        await AsyncStorage.setItem('search-history', JSON.stringify(newData))
        update()
    }

    return (
        <SearchHistoryView>
            {data &&
                data.map((h, i) => (
                    <HistoryBox key={i}>
                        <HistoryContent>
                            <SearchIcon width={20} height={20} />
                            <HistoryText>{h.searchText}</HistoryText>
                        </HistoryContent>
                        <HistoryContent>
                            <HistoryDateText>{h.createdAt}</HistoryDateText>
                            <CloseButton activeOpacity={0} onPress={() => deleteHistory(i)}>
                                <CrossButton width={20} height={20} />
                            </CloseButton>
                        </HistoryContent>
                    </HistoryBox>
                ))}
        </SearchHistoryView>
    )
}

export function SearchModal({ defaultTarget, onClose }: Props) {
    const [clickedTags, setClickedTags] = useState<string[]>(defaultTarget.tagList)
    const [history, setHistory] = useState<SearchTarget[]>([])
    const [showResult, setShowResult] = useState(false)
    const { control, setValue, watch, handleSubmit, reset } = useForm<Inputs>()

    useEffect(() => {
        loadHistory()
        if (defaultTarget.searchText !== '') {
            setTimeout(() => {
                setValue('text', defaultTarget.searchText)
                onSubmit({ text: watch('text') })
            }, 500)
        }
    }, [defaultTarget])

    const onPress = () => {
        if (showResult) {
            setShowResult(false)
            reset()
        } else {
            reset()
            onClose()
        }
    }

    const handleTagClick = (text: string) => {
        setClickedTags(prevState => (prevState.includes(text) ? prevState.filter(tag => tag !== text) : [...prevState, text]))
    }

    const loadHistory = async () => {
        const data = await AsyncStorage.getItem('search-history')
        if (data !== null) {
            setHistory(JSON.parse(data))
        }
    }

    const saveHistory = async (data: SearchTarget[]) => {
        await AsyncStorage.setItem('search-history', JSON.stringify(data))
    }

    const onSubmit = async (data: Inputs) => {
        const today = new Date()
        const newRecord: SearchTarget = {
            searchText: data.text,
            tagList: clickedTags,
            createdAt: `${today.getFullYear()}. ${today.getMonth()}. ${today.getDate()}`,
        }
        await saveHistory([newRecord, ...history])
        await loadHistory()
        setShowResult(true)
    }

    return (
        <Modal>
            <MainView>
                <ShadowStyle distance={5}>
                    <HeaderView>
                        <HeaderBox>
                            <CloseButton onPress={onPress}>
                                <ChevronLeftIcon width={28} height={28} />
                            </CloseButton>
                            <Controller
                                control={control}
                                rules={{ required: '검색 문구가 없습니다' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <HeaderText
                                        placeholder={'직업 훈련 기관 검색'}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        onSubmitEditing={handleSubmit(onSubmit)}
                                    />
                                )}
                                name="text"
                            />
                        </HeaderBox>
                        <TagBox>
                            <TagButtonList clickedTags={clickedTags} handleTagClick={handleTagClick} />
                        </TagBox>
                    </HeaderView>
                </ShadowStyle>
                {!showResult && <SearchHistory data={history} update={loadHistory} />}
                {showResult && <SearchResultType2 onClose={() => {}} target={history[0]} />}
            </MainView>
        </Modal>
    )
}
