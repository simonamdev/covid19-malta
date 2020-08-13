import React from 'react'
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

const data = parsedData.map((d) => ({ x: d.date.getTime(), y: d.total_cases }))


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

export default (props: IndexPageProps) => {
  return (<div style={{ width: '100%', height: '100%' }}>
    <h1>Hi people</h1>
    <p>
      Welcome to your new{' '}
      <strong>{props.data.site.siteMetadata.title}</strong> site.
    </p>
    <p>Now go build something great.</p>
    <div style={{ width: '100%', height: 1000 }}>
      <FlexibleXYPlot margin={50} xType="time">
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Date" />
        <YAxis title="Total Cases" />
        <LineSeries data={data} />
      </FlexibleXYPlot>
    </div>

    <Link to="/page-2/">Go to page 2</Link>
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
