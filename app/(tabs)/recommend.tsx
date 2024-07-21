import { useQuery } from '@tanstack/react-query'

import RecommendInfoRequired from '@/components/RecommendInfoRequired'
import RecommendTrainCourseList from '@/components/RecommendTrainCourseList'
import { useAuthorization } from '@/provider'
import { getUserDetail } from '@/api'

const Recommend = () => {
    const { jwt } = useAuthorization()
    const { data: userDetail } = useQuery({
        queryKey: ['getUserDetail', jwt],
        queryFn: () => getUserDetail({ jwt }),
        enabled: !!jwt,
    })
    if (userDetail && userDetail.occupation && userDetail.jobObjectives && userDetail.major) {
        return <RecommendTrainCourseList user={userDetail} />
    } else {
        return <RecommendInfoRequired />
    }
}

export default Recommend
