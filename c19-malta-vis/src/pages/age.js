import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AgeGroupCountHeatMap from "../components/charts/age-group-count-heatmap"

const Age = () => {
  return (
    <Layout>
      <SEO title="Age" />
      <h1>Age Statistics of Cases</h1>
      <div style={{ height: 600, width: 600 }}>
        <AgeGroupCountHeatMap />
      </div>
    </Layout>
  )
}

export default Age
