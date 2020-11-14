import React from 'react'
import { LineSeriesPoint } from 'react-vis';

interface CountersProps {
    activeCasesData: LineSeriesPoint[];
    deathsData: LineSeriesPoint[];
}

export default ({ activeCasesData, deathsData }: CountersProps) => {
    const diffCount = activeCasesData[activeCasesData.length - 1].y - activeCasesData[activeCasesData.length - 2].y;
    const isUp = diffCount > 0;
    const diffDeathCount = deathsData[deathsData.length - 1].y - deathsData[deathsData.length - 2].y;
    const deathsIsUp = diffDeathCount > 0;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
            <h3>{activeCasesData[activeCasesData.length - 1].y.toLocaleString()} Active Cases</h3>
            <h4>, {Math.abs(diffCount)} {isUp ? 'more' : 'less'} case{Math.abs(diffCount) > 1 ? 's' : ''} than yesterday.</h4>{' '}
            <h3 style={{ paddingLeft: '0.25em' }}>{deathsData[deathsData.length - 1].y} Deaths</h3>
            <h4>, {Math.abs(diffDeathCount)} {deathsIsUp ? 'more' : 'less'} death{Math.abs(diffDeathCount) > 1 ? 's' : ''} than yesterday.</h4>
        </div>
    )
}
