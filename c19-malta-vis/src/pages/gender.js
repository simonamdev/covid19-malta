import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GenderProportionPieChart from "../components/charts/gender-propotion-pie"

const Gender = () => {
  return (
    <Layout>
      <SEO title="Gender" />
      <h1>Gender Proportion of Cases</h1>
      <div style={{ height: 300 }}>
        <GenderProportionPieChart />
      </div>
    </Layout>
  )
}

export default Gender
