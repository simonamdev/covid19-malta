import React from 'react'
import { graphql } from 'gatsby'
import '../../node_modules/react-vis/dist/style.css';

import latestData from '../../../data/latest_data.json';
import measuresData from '../../../data/measures.json';
import { CountChartData, CountChart, MeasuresData } from '../components/types';
import ControllableMultipleCountChart from '../components/ControllableMultipleCountChart';

interface CaseData {
  date: Date;
  new_cases: number;
  total_cases: number;
  recovered: number;
  deaths: number;
  active_cases: number;
}

interface RawMeasuresData {
  date: string;
  measures: string[];
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

const parsedMeasuresData: MeasuresData[] = (measuresData as RawMeasuresData[]).map((md) => ({ date: new Date(`${md.date} 12:00:00 GMT+2`), measures: md.measures }))

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    currentBuildDate: {
      currentDate: string
    }
  }
}

const data: CountChartData[] = [
  { title: CountChart.ACTIVE_CASES, data: activeCasesData },
  { title: CountChart.RECOVERIES, data: recoveriesData },
  { title: CountChart.TOTAL_CASES, data: totalCasesData },
  { title: CountChart.DEATHS, data: deathsData },
]

export default (props: IndexPageProps) => {
  return (<div style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
    <h1>Covid-19 in Malta</h1>
    <div>
      <p>Website by <a href="https://simonam.dev">Simon Agius Muscat</a>. Data retrieved from the <a href="https://github.com/COVID19-Malta/COVID19-Cases">Public Health Open Dataset</a></p>
      <p>Last updated: {new Date(props.data.currentBuildDate.currentDate).toLocaleDateString()} {new Date(props.data.currentBuildDate.currentDate).toLocaleTimeString()}</p>
    </div>
    <div style={{ height: '80vh' }}>
      <ControllableMultipleCountChart countChartData={data} measuresData={parsedMeasuresData} />
    </div>
    {/* <Link to="/active-cases/">Active Cases</Link> */}
  </div>)
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    currentBuildDate {
      currentDate
    }
  }
`
