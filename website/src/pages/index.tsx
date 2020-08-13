import React from 'react'
import Link from 'gatsby-link'
import '../../node_modules/react-vis/dist/style.css';
import {
  XYPlot, LineSeries,

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

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context)
  }
  public render() {



    return (
      <div>
        <h1>Hi people</h1>
        <p>
          Welcome to your new{' '}
          <strong>{this.props.data.site.siteMetadata.title}</strong> site.
        </p>
        <p>Now go build something great.</p>
        <XYPlot margin={50} xType="time" height={300} width={600}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title="Date" />
          <YAxis title="Total Cases" />
          <LineSeries data={data} />
        </XYPlot>

        <Link to="/page-2/">Go to page 2</Link>
      </div>
    )
  }
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
