import { ParamListBase, RouteProp, useRoute } from '@react-navigation/core'
import { TrainCenterList } from '@/components/trainCenterList'
import { trainCenter } from '@/type'
import styled from 'styled-components/native'

interface ParamList extends ParamListBase {
    search: {
        searchText: string
        tagList: string[]
    }
}

const MainView = styled.View`
    background-color: #ffffff;
`

const Search = () => {
    // TODO: searchText, tagList logic 추가
    const route = useRoute<RouteProp<ParamList, 'search'>>()
    const { searchText, tagList } = route.params
    // TODO: remove dummy data
    const data: trainCenter[] = Array.from({ length: 10 }, _ => ({
        _id: '6697568d5211f45c4dc63c35',
        inoNm: '(사)대한민국경비협회 서울지방협회',
        grade: '1년 인증',
        zipCd: '02490',
        addr: '서울특별시 동대문구 홍릉로 28 (청량리동 성일빌딩) 4층',
        telNo: '02-336-0195',
        faxNo: '02-336-0194',
        email: 'seoulroksa@naver.com',
        hpAddr: 'http://www.seoulroksa.or.kr',
    }))
    return (
        <MainView>
            <TrainCenterList data={data} />
        </MainView>
    )
}

export default Search
