import React, { useState } from 'react'

import { CountChartData, CountChart } from './types';
import MultipleCountChart from './MultipleCountChart';

interface ControllableMultipleCountChartProps {
    countChartData: CountChartData[]
}

const allCharts = [CountChart.ACTIVE_CASES, CountChart.DEATHS, CountChart.RECOVERIES, CountChart.TOTAL_CASES] as const;


export default ({ countChartData }: ControllableMultipleCountChartProps) => {
    const [visibleCharts, setVisibleCharts] = useState<CountChart[]>([...allCharts]);
    const toggleChart = (chart: CountChart) =>
        visibleCharts.includes(chart) ?
            setVisibleCharts(visibleCharts.filter((c) => c !== chart)) :
            setVisibleCharts([...visibleCharts, chart])
    return (
        <>
            <MultipleCountChart countChartData={countChartData.filter((ccd) => visibleCharts.includes(ccd.title))} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                {allCharts.map((chart) => <button key={chart} onClick={() => toggleChart(chart)}>{visibleCharts.includes(chart) ? 'Hide' : ' Show'} {chart}</button>)}
            </div>
        </>
    )
}
