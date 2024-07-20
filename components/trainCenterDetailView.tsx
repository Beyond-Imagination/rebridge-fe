import styled from 'styled-components/native'
import { useQuery } from '@tanstack/react-query'
import { Modal, Dimensions } from 'react-native'
import { getTrainCenterDetail } from '@/api'
import { CrossButton } from '@/icon'
import { Shadow } from 'react-native-shadow-2'
import { TrainCourseList } from '@/components/trainCourseList'

interface Props {
    id: string
    onClose: () => void
}

interface InfoProps {
    title: string
    content: string
}

const screen = Dimensions.get('screen')

const Loading = styled.ActivityIndicator`
    min-height: 600px;
    max-height: 600px;
    align-self: center;
`

const MainView = styled.ImageBackground`
    height: ${screen.height}px;
    align-items: center;
    justify-items: center;
    padding-top: 100px;
`

const ShadowStyle = styled(Shadow)`
    background-color: #ffffff;
    border-radius: 12px;
    border-color: #ffffff;
`

const DetailContainer = styled.View`
    background-color: #ffffff;
    border-radius: 6px;
    padding: 10px;
    width: ${screen.width * 0.9}px;
    height: ${screen.height * 0.8}px;
`

const InfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`

const InfoContentBlock = styled.View`
    width: ${screen.width * 0.6}px;
    border-color: #dcdce2;
    border-left-width: 1px;
    padding-left: 10px;
`

const TrainCourseBox = styled.View`
    width: ${screen.width * 0.8}px;
    align-self: center;
    align-items: center;
`

const DetailBlock = styled.ScrollView``

const CloseButton = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-end;
`

const Title = styled.Text`
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    margin-bottom: 30px;
    margin-top: 15px;
`

const InfoTitle = styled.Text`
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    width: ${screen.width * 0.2}px;
    margin-left: 10px;
`

const InfoContent = styled.Text`
    font-size: 16px;
    text-align: left;
`

const SubTitle = styled.Text`
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    margin: 20px 0 30px 10px;
`

function InfoBox({ title, content }: InfoProps) {
    return (
        <InfoContainer>
            <InfoTitle>{title}</InfoTitle>
            <InfoContentBlock>
                <InfoContent numberOfLines={2}>{content}</InfoContent>
            </InfoContentBlock>
        </InfoContainer>
    )
}

export default function TrainCenterDetailView({ id, onClose }: Props) {
    const { data } = useQuery({
        queryKey: ['trainCenterDetail', id],
        queryFn: () => getTrainCenterDetail(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    })

    const backImage = require('../assets/images/detail-view-image.png')

    if (!data) {
        return (
            <Modal>
                <MainView source={backImage}>
                    <ShadowStyle distance={7}>
                        <DetailContainer>
                            <CloseButton onPress={onClose}>
                                <CrossButton width={30} height={30} />
                            </CloseButton>
                            <Loading />
                        </DetailContainer>
                    </ShadowStyle>
                </MainView>
            </Modal>
        )
    }

    return (
        <Modal>
            <MainView source={backImage}>
                <ShadowStyle distance={7}>
                    <DetailContainer>
                        <CloseButton onPress={onClose}>
                            <CrossButton width={30} height={30} />
                        </CloseButton>
                        <DetailBlock>
                            <Title>
                                {data.trainCenter.inoNm}({data.trainCenter.grade})
                            </Title>
                            <InfoBox title={'주소'} content={`${data.trainCenter.addr}(${data.trainCenter.zipCd})`} />
                            <InfoBox title={'전화번호'} content={data.trainCenter.telNo} />
                            <InfoBox title={'팩스번호'} content={data.trainCenter.faxNo} />
                            <InfoBox title={'이메일'} content={data.trainCenter.email} />
                            <InfoBox title={'홈페이지'} content={data.trainCenter.hpAddr} />
                            <SubTitle>모집중인 훈련과정</SubTitle>
                            <TrainCourseBox>
                                <TrainCourseList data={data.trainCourses} size={18} />
                            </TrainCourseBox>
                        </DetailBlock>
                    </DetailContainer>
                </ShadowStyle>
            </MainView>
        </Modal>
    )
}
