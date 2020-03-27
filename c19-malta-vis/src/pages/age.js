import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import AgeGroupCountHeatMap from "../components/charts/age-group-count-heatmap"
import MortalityByAgeBarChart from "../components/charts/mortality-by-age-bar"

const Age = () => {
  return (
    <Layout>
      <SEO title="Age" />
      <h1>Age Statistics of Cases</h1>
      <div style={{ height: 600, width: 600 }}>
        <AgeGroupCountHeatMap />
      </div>
      <div style={{ height: 600 }}>
        <MortalityByAgeBarChart />
      </div>
    </Layout>
  )
}

export default Age
