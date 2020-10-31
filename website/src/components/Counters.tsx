import React from 'react'
import { LineSeriesPoint } from 'react-vis';

interface CountersProps {
    activeCasesData: LineSeriesPoint[];
}

export default ({ activeCasesData }: CountersProps) => {
    const diffCount = activeCasesData[activeCasesData.length - 1].y - activeCasesData[activeCasesData.length - 2].y;
    const isUp = diffCount > 0;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
            <h3>{activeCasesData[activeCasesData.length - 1].y} Active Cases</h3>
            <h4>, {Math.abs(diffCount)} {isUp ? 'more' : 'less'} cases than yesterday.</h4>
        </div>
    )
}
