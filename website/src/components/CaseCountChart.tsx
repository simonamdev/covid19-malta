import React from 'react'
import '../../node_modules/react-vis/dist/style.css';
import {
    FlexibleXYPlot,
    LineSeries,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeriesPoint,
} from 'react-vis';


interface CaseCountChartProps {
    title: string;
    data: LineSeriesPoint[]
}

export default (props: CaseCountChartProps) => (
    <FlexibleXYPlot margin={50} xType="time">
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Date" />
        <YAxis title={props.title} />
        <LineSeries data={props.data} />
    </FlexibleXYPlot>
)