import RecommendInfoRequired from '@/components/RecommendInfoRequired'
import RecommendTrainCourseList from '@/components/RecommendTrainCourseList'
import { useAuthorization } from '@/provider'

const Recommend = () => {
    //TODO: user의 추가 정보가 없는경우 hasInfo를 false로 변경
    let hasInfo = false
    const { jwt } = useAuthorization()
    if (jwt) {
        hasInfo = true
    }

    return <>{hasInfo ? <RecommendTrainCourseList /> : <RecommendInfoRequired />}</>
}

export default Recommend
