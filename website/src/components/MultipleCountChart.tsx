import React, { useState, useEffect } from 'react'
import '../../node_modules/react-vis/dist/style.css';
import {
    FlexibleXYPlot,
    LineSeries,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    MarkSeries,
    Crosshair
} from 'react-vis';
import { CountChartData, MeasuresData } from './types';

interface CaseCountChartProps {
    countChartData: CountChartData[];
    measuresData: MeasuresData[];
}

interface Measure {
    x: number;
    y: string;
}

const chartMeasuresData: Record<number, string[]> = {};


export default ({ countChartData, measuresData }: CaseCountChartProps) => {
    const [measuresInEffect, setMeasuresInEffect] = useState<Measure[]>([]);
    useEffect(() => {
        // console.log('Parsed');
        measuresData.forEach((md) => {
            chartMeasuresData[md.date.getTime()] = md.measures;
        });
    }, [])
    return (
        <>
            <FlexibleXYPlot margin={50} xType="time" onMouseLeave={() => setMeasuresInEffect([])}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title="Date" />
                <YAxis />
                {countChartData.map((data, i) => <LineSeries key={data.title} data={data.data} color={data.colour} onNearestX={(value, { index }) => {
                    // Only apply the crosshair to the top line series to avoid duplicates
                    if (i === 0) {
                        // console.log('Triggered');
                        const measureExists = value.x in chartMeasuresData;
                        if (measureExists) {
                            setMeasuresInEffect(chartMeasuresData[value.x].map((cmd) => ({ x: value.x, y: cmd })));
                        }
                    }
                }} />)}
                <Crosshair values={measuresInEffect} titleFormat={(d) => ({ title: 'Date', value: new Date(d[0].x).toISOString().split('T')[0] })} />
            </FlexibleXYPlot>
        </>
    )
}
