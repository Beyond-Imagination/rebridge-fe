import { useMemo, useState } from 'react'
import { ActivityIndicator, StyleProp, TextStyle, View } from 'react-native'
import { BarChart, PieChart, pieDataItem } from 'react-native-gifted-charts'
import PickerSelect from 'react-native-picker-select'
import styled from 'styled-components/native'
import { useQuery } from '@tanstack/react-query'

import { getCategorySummary, getRegionDetail, getRegionSummary } from '@/api/trainStatistic'
import { CarotDown } from '@/icon'

interface Props {
    year: number
}

interface RegionDetailProps extends Props {
    region: string
}

interface PieStatisticProps extends Props {
    data: pieDataItem[]
}

const Loading = styled.ActivityIndicator`
    min-height: 200px;
    max-height: 200px;
    align-self: center;
`

const SmallLoading = styled.View`
    min-height: 150px;
    max-height: 150px;
    align-self: center;
    justify-content: center;
`

const StyledView = styled.View`
    width: 100%;
    background-color: inherit;
    margin-bottom: 30px;
`

const SmallBlock = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`

const SelectBlock = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 70px;
    border-width: 1px;
    border-radius: 4px;
    border-color: #90909f;
`

const StatisticBlock = styled.View`
    width: 90%;
    align-self: center;
    border-radius: 12px;
    border-width: 1px;
    border-color: #ffffff;
    background-color: #ffffff;
    padding: 10px;
`

const ChartView = styled.View`
    align-self: center;
    font-size: 10px;
`

const SubChartView = styled.View`
    width: 45%;
    margin-top: 20px;
`

const PieChartView = styled.View`
    flex-direction: row;
    font-size: 10px;
    width: 100%;
    height: 220px;
`

const TitleText = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    margin-bottom: 10px;
`

const SubTitle = styled.Text`
    color: #000000;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    margin-left: 30px;
    margin-bottom: 5px;
`

const SmallText = styled.Text`
    color: #90909f;
    font-size: 12px;
`

const TopLevelText = styled.Text`
    color: #000000;
    text-align: center;
    font-size: 9px;
    width: 35px;
`

const DonutText = styled.Text`
    color: #000000;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    align-self: center;
`

const colorList = [
    '#FF1A35CC',
    '#FF6C3ECC',
    '#FF9F3ECC',
    '#FFD33ECC',
    '#4E8527CC',
    '#168F78CC',
    '#1FE288CC',
    '#46709FCC',
    '#2A023ECC',
    '#A8C615CC',
    '#FF3E77CC',
]

function RegionDetailStatistic({ region, year }: RegionDetailProps) {
    const { data: detailData } = useQuery({
        queryKey: ['regionDetail', region, year],
        queryFn: () => getRegionDetail(region, year),
        enabled: region !== '기타',
        refetchOnWindowFocus: false,
    })

    if (region === '기타') {
        return (
            <SubChartView style={{ justifyContent: 'center' }}>
                <SubTitle>No data</SubTitle>
            </SubChartView>
        )
    }

    if (!detailData) {
        return (
            <SubChartView>
                <SubTitle>{region} 훈련 과정 구분</SubTitle>
                <SmallLoading>
                    <ActivityIndicator size="small" />
                </SmallLoading>
            </SubChartView>
        )
    }

    const sortedData = [...detailData.docs].sort((a, b) => b.trainCourseNm - a.trainCourseNm)

    const data = sortedData.map((doc, index) => ({
        value: doc.trainCourseNm,
        label: doc.category,
        frontColor: colorList[index],
        topLabelComponent: () => <TopLevelText>{index === 0 && doc.trainCourseNm}</TopLevelText>,
    }))

    const xAxisLabelsHeight = detailData.totalDocs > 6 ? 100 : detailData.totalDocs > 5 ? 95 : 90

    return (
        <SubChartView>
            <SubTitle>{region} 훈련 과정 구분</SubTitle>
            <BarChart
                data={data}
                height={150}
                horizontal={true}
                disablePress={false}
                noOfSections={6}
                hideRules={true}
                barBorderTopLeftRadius={3}
                barBorderTopRightRadius={3}
                barWidth={(20 * 5) / detailData.totalDocs}
                stepHeight={25}
                spacing={(12 * 5) / detailData.totalDocs}
                initialSpacing={3}
                shiftX={-10}
                shiftY={-10}
                stepValue={data[0].value * 0.25}
                disableScroll={true}
                isAnimated={true}
                yAxisAtTop={true}
                yAxisLabelWidth={0}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisLabelsVerticalShift={-30}
                xAxisLabelsHeight={xAxisLabelsHeight}
                xAxisLabelTextStyle={{ fontSize: 10, textAlign: 'center' }}
                labelWidth={100}
            />
        </SubChartView>
    )
}

function PieStatistic({ data, year }: PieStatisticProps) {
    const [region, setRegion] = useState(data[0].text as string)
    return (
        <PieChartView>
            <SubChartView style={{ marginRight: 10 }}>
                <PieChart
                    extraRadiusForFocused={10}
                    radius={80}
                    showText={true}
                    donut={true}
                    focusOnPress={true}
                    toggleFocusOnPress={true}
                    labelsPosition={'outward'}
                    data={data}
                    textSize={10}
                    textColor="#FFFFFF"
                    centerLabelComponent={() => {
                        return <DonutText>{'지역별\n훈련과정'}</DonutText>
                    }}
                    onPress={(item: pieDataItem) => {
                        setRegion(item.text as string)
                    }}
                />
            </SubChartView>
            <RegionDetailStatistic year={year} region={region} />
        </PieChartView>
    )
}

function RegionStatistic({ year }: Props) {
    const { data: regionSummary } = useQuery({
        queryKey: ['regionSummary', year],
        queryFn: () => getRegionSummary(year),
        refetchOnWindowFocus: false,
    })
    if (!regionSummary) {
        return (
            <ChartView>
                <PieChartView>
                    <Loading size="large" />
                </PieChartView>
            </ChartView>
        )
    }

    const sortedData = [...regionSummary.docs].sort((a, b) => b.trainCourseNm - a.trainCourseNm)

    const data = sortedData.slice(0, 8).map((doc, index) => ({
        value: doc.trainCourseNm,
        label: doc.region,
        frontColor: colorList[index],
        topLabelComponent: () => <TopLevelText>{doc.trainCourseNm}</TopLevelText>,
    }))

    const otherValue = sortedData.slice(8).reduce((acc, doc) => acc + doc.trainCourseNm, 0)

    data.push({
        value: otherValue,
        label: '기타',
        frontColor: colorList[colorList.length - 1],
        topLabelComponent: () => <TopLevelText>{otherValue}</TopLevelText>,
    })
    const pieData: pieDataItem[] = data.map((v, index) => ({
        value: v.value,
        text: v.label,
        color: v.frontColor,
        focused: index === 0,
    }))
    return (
        <ChartView>
            <PieStatistic data={pieData} year={year} />
            <BarChart
                data={data}
                noOfSections={5}
                hideRules={true}
                disablePress={true}
                barBorderRadius={3}
                barWidth={25}
                spacing={10}
                endSpacing={0}
                disableScroll={true}
                isAnimated={true}
                stepValue={data[0].value * 0.2}
                yAxisLabelWidth={0}
                yAxisThickness={0}
                xAxisThickness={0}
                labelWidth={25}
            />
        </ChartView>
    )
}

function CategoryStatistic({ year }: Props) {
    const { data: categorySummary } = useQuery({
        queryKey: ['categorySummary', year],
        queryFn: () => getCategorySummary(year),
        refetchOnWindowFocus: false,
    })
    if (!categorySummary) {
        return (
            <ChartView>
                <Loading size="large" />
            </ChartView>
        )
    }

    const sortedData = [...categorySummary.docs].sort((a, b) => b.trainCourseNm - a.trainCourseNm)

    const data = sortedData.slice(0, 8).map((doc, index) => ({
        value: doc.trainCourseNm,
        label: doc.category,
        frontColor: colorList[index],
        topLabelComponent: () => <TopLevelText>{doc.trainCourseNm}</TopLevelText>,
    }))
    return (
        <ChartView>
            <BarChart
                data={data}
                noOfSections={5}
                hideRules={true}
                disablePress={true}
                barBorderRadius={3}
                barWidth={30}
                spacing={12}
                endSpacing={0}
                disableScroll={true}
                isAnimated={true}
                stepValue={data[0].value * 0.3}
                yAxisLabelWidth={0}
                yAxisThickness={0}
                xAxisThickness={0}
                xAxisLabelTextStyle={{ fontSize: 10, textAlign: 'center' }}
                xAxisTextNumberOfLines={3}
                labelWidth={30}
            />
        </ChartView>
    )
}

export function TrainStatistic() {
    const [regionYear, setRegionYear] = useState<number>(0)
    const [categoryYear, setCategoryYear] = useState<number>(0)
    const styles: StyleProp<TextStyle> = useMemo(
        () => ({
            color: '#90909f',
            fontSize: 12,
            textAlign: 'center',
            width: 50,
        }),
        [],
    )

    return (
        <View>
            <StyledView>
                <TitleText>지역별 훈련 과정 현황</TitleText>
                <StatisticBlock>
                    <SmallBlock>
                        <SmallText>2020~2024.07 기준 현황</SmallText>
                        <SelectBlock>
                            <PickerSelect
                                style={{
                                    inputIOS: styles,
                                    inputAndroid: styles,
                                }}
                                placeholder={{}}
                                fixAndroidTouchableBug={true}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={value => setRegionYear(value)}
                                items={[
                                    { label: '전체', value: 0 },
                                    { label: '2024', value: 2024 },
                                    { label: '2023', value: 2023 },
                                    { label: '2022', value: 2022 },
                                    { label: '2021', value: 2021 },
                                    { label: '2020', value: 2020 },
                                ]}
                                value={regionYear}
                            />
                            <CarotDown width={15} height={15} />
                        </SelectBlock>
                    </SmallBlock>
                    <RegionStatistic year={regionYear} />
                </StatisticBlock>
            </StyledView>
            <StyledView>
                <TitleText>분류별 훈련 과정 현황</TitleText>
                <StatisticBlock>
                    <SmallBlock>
                        <SmallText>2020~2024.07 기준 현황</SmallText>
                        <SelectBlock>
                            <PickerSelect
                                style={{
                                    inputIOS: styles,
                                    inputAndroid: styles,
                                }}
                                placeholder={{}}
                                fixAndroidTouchableBug={true}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={value => setCategoryYear(value)}
                                items={[
                                    { label: '전체', value: 0 },
                                    { label: '2024', value: 2024 },
                                    { label: '2023', value: 2023 },
                                    { label: '2022', value: 2022 },
                                    { label: '2021', value: 2021 },
                                    { label: '2020', value: 2020 },
                                ]}
                                value={categoryYear}
                            />
                            <CarotDown width={15} height={15} />
                        </SelectBlock>
                    </SmallBlock>
                    <CategoryStatistic year={categoryYear} />
                </StatisticBlock>
            </StyledView>
        </View>
    )
}
