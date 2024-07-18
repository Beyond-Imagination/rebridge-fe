import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { CommonActions, useNavigation } from '@react-navigation/native'

import { ChatbotIcon, ChevronLeftIcon, UserIcon } from '@/icon'
import Logo from '@/components/Logo'
import { useAuthorization } from '@/provider'

interface Props {
    type: number // 1: main, 2: subTitle, 3: back with title
    title?: string
}

interface titleProps {
    color: string
}

const MainViewType1 = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    height: 100px;
    background-color: #ffffff;
`

const MainViewType2 = styled.View`
    flex-direction: row;
    align-items: flex-end;
    height: 100px;
    background-color: #ffffff;
`

const ContentBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const TitleBlock = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`

const LinkBlock = styled.TouchableOpacity`
    margin: 0 10px 5px 10px;
`

const Title = styled.Text<titleProps>`
    font-weight: bold;
    font-size: 24px;
    margin-left: 15px;
    color: ${props => props.color};
`

export function Header({ type, title }: Props) {
    const navigator = useNavigation()
    const auth = useAuthorization()
    if (type === 1) {
        const userPress = () => {
            if (!auth.jwt) {
                navigator.dispatch(CommonActions.navigate({ name: 'user/signIn' }))
            } else {
                navigator.dispatch(CommonActions.navigate({ name: 'myInfo' }))
            }
        }
        return (
            <MainViewType1>
                <Logo type={2} style={{ width: 120, height: 50 }} />
                <ContentBlock>
                    {/*TODO: link to chatbot*/}
                    <LinkBlock>
                        <ChatbotIcon width={40} height={40} />
                    </LinkBlock>
                    {/*TODO: link to user page*/}
                    <LinkBlock onPress={userPress}>
                        <UserIcon width={40} height={40} />
                    </LinkBlock>
                </ContentBlock>
            </MainViewType1>
        )
    } else {
        return (
            <MainViewType2>
                <TitleBlock>
                    {type === 3 && (
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => {
                                navigator.goBack()
                            }}
                        >
                            <ChevronLeftIcon width={28} height={28} />
                        </TouchableOpacity>
                    )}
                    <Title color={type === 3 ? '#90909F' : '#000000'}>{title}</Title>
                </TitleBlock>
            </MainViewType2>
        )
    }
}
