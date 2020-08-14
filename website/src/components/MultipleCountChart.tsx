import React from 'react'
import '../../node_modules/react-vis/dist/style.css';
import {
    FlexibleXYPlot,
    LineSeries,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
} from 'react-vis';
import { CountChartData } from './types';

interface CaseCountChartProps {
    countChartData: CountChartData[]
}

export default ({ countChartData }: CaseCountChartProps) => {
    return (
        <>
            <FlexibleXYPlot margin={50} xType="time">
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title="Date" />
                <YAxis />
                {countChartData.map((data) => <LineSeries key={data.title} data={data.data} />)}
            </FlexibleXYPlot>
        </>
    )
}
