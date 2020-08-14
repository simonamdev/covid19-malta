import React, { useState } from 'react'
import { graphql } from 'gatsby'
import CaseCountChart from '../components/CaseCountChart';


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

const activeCasesData = parsedData.map((d) => ({ x: d.date.getTime(), y: d.active_cases }))

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

export default () => {
    return (<div style={{ width: '100%', height: '80vh', margin: 0, padding: 0 }}>
        <CaseCountChart title="Active Cases" data={activeCasesData} />
    </div>)
}

export const pageQuery = graphql`
  query ActiveCasesQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
