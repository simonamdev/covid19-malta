import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import '../../node_modules/react-vis/dist/style.css';
import {
  FlexibleXYPlot,
  LineSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis';

import latestData from '../../../data/latest_data.json';

interface CaseData {
  date: Date;
  new_cases: number;
  total_cases: number;
  recovered: number;
  deaths: number;
  active_cases: number;
}

const parsedData: CaseData[] = latestData.map((d) => {
  const [day, month, year] = d.date.split('-')
  return {
    ...d,
    date: new Date(`${day} ${month} ${year} 12:00:00 GMT+2`)
  }
})

const totalCasesData = parsedData.map((d) => ({ x: d.date.getTime(), y: d.total_cases }))
const activeCasesData = parsedData.map((d) => ({ x: d.date.getTime(), y: d.active_cases }))
const recoveriesData = parsedData.map((d) => ({ x: d.date.getTime(), y: d.recovered }))
const deathsData = parsedData.map((d) => ({ x: d.date.getTime(), y: d.deaths }))


// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

interface GraphSettings {
  showTotalCases: boolean;
  showActiveCases: boolean;
  showRecoveryCases: boolean;
  showDeathsData: boolean;
}

export default (props: IndexPageProps) => {
  const [settings, setSettings] = useState<GraphSettings>({ showActiveCases: true, showDeathsData: true, showRecoveryCases: true, showTotalCases: true });
  return (<div style={{ width: '100%', height: '80vh', margin: 0, padding: 0 }}>
    <FlexibleXYPlot margin={50} xType="time">
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis title="Date" />
      <YAxis />
      {settings.showTotalCases && <LineSeries data={totalCasesData} />}
      {settings.showActiveCases && <LineSeries data={activeCasesData} />}
      {settings.showRecoveryCases && <LineSeries data={recoveriesData} />}
      {settings.showDeathsData && <LineSeries data={deathsData} />}
    </FlexibleXYPlot>
    <Link to="/page-2/">Go to page 2</Link>
    <div>
      <button onClick={() => setSettings({ ...settings, showTotalCases: !settings.showTotalCases })}>Total Cases</button>
      <button onClick={() => setSettings({ ...settings, showActiveCases: !settings.showActiveCases })}>Active Cases</button>
      <button onClick={() => setSettings({ ...settings, showDeathsData: !settings.showDeathsData })}>Deaths</button>
      <button onClick={() => setSettings({ ...settings, showRecoveryCases: !settings.showRecoveryCases })}>Recovered Cases</button>
    </div>
  </div>)
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
