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
    LineSeriesPoint,
    MarkSeriesPoint,
    Hint,
} from 'react-vis';
import { CountChart, CountChartData, MeasuresData } from './types';


interface CaseCountChartProps {
    countChartData: CountChartData[];
    sevenDayMovingAverageData: LineSeriesPoint[];
    measuresData: MeasuresData[];
}


const chartMeasuresData: Record<number, string[]> = {};
const chartSevenDayMovingAverageData: Record<number, number> = {};


export default ({ countChartData, sevenDayMovingAverageData, measuresData }: CaseCountChartProps) => {
    const [measurePoints, setMeasurePoints] = useState<LineSeriesPoint[]>([]);
    const [nearestPoint, setNearestPoint] = useState<MarkSeriesPoint | undefined>(undefined);
    useEffect(() => {
        measuresData.forEach((md) => {
            chartMeasuresData[md.date.getTime()] = md.measures;
        });
        sevenDayMovingAverageData.forEach((sdmad) => {
            chartSevenDayMovingAverageData[sdmad.x] = sdmad.y;
        })
        const activeCaseData: CountChartData | undefined = countChartData.find((ccd) => ccd.title === CountChart.ACTIVE_CASES);
        if (activeCaseData) {
            const daysWithMeasures = Object.keys(chartMeasuresData).map((date) => parseInt(date));
            const parsedMeasurePoints = activeCaseData.data.filter((point) => daysWithMeasures.includes(point.x));
            setMeasurePoints(parsedMeasurePoints);
        }
    }, [])
    return (
        <>
            <FlexibleXYPlot margin={50} xType="time" onMouseLeave={() => setNearestPoint(undefined)}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title="Date" />
                <YAxis />
                {countChartData.map((data) => <LineSeries key={data.title} data={data.data} color={data.colour} />)}
                <MarkSeries data={measurePoints} strokeWidth={0.5} color="#00b300" onNearestX={(p) => setNearestPoint(p)} />
                {
                    nearestPoint &&
                    <LineSeries
                        key={`measure-${nearestPoint.x}-${nearestPoint.y}`}
                        data={[{ x: nearestPoint.x as number, y: nearestPoint.y as number }, { x: nearestPoint.x as number, y: 0 }]}
                        color="black"
                        stroke="black"
                    />
                }
                {
                    nearestPoint &&
                    <Hint
                        value={nearestPoint}
                    >
                        <div className="rv-hint__content">
                            <p>{new Date(nearestPoint.x).toLocaleDateString()} ({Math.floor((new Date().getTime() - new Date(nearestPoint.x).getTime()) / (1000 * 3600 * 24))} day/s ago).</p>
                            <p>{nearestPoint.y.toLocaleString()} Active Cases</p>
                            <p>Seven Day Moving Average: {chartSevenDayMovingAverageData[nearestPoint.x as number].toLocaleString()} Cases</p>
                            <ul>
                                {chartMeasuresData[nearestPoint.x as number].map((measure, i) => <li key={`m-list-${i}`} style={{ margin: 0, padding: 0 }}>{measure}</li>)}
                            </ul>
                        </div>
                    </Hint>
                }
            </FlexibleXYPlot>
        </>
    )
}
