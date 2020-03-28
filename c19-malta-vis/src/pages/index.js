import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import CountOverTimeChart from "../components/charts/count-over-time"
import CaseTypeProportionPieChart from "../components/charts/case_type_proportion_pie"

import caseCounts from "../../content/case_counts.json"

const IndexPage = () => (
  <Layout maxWidth="100%" hideLinkToHome>
    <SEO title="COVID-19 Malta" />
    <h1>Malta Covid-19 Data</h1>
    <p>{caseCounts.total} Cases so far</p>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link to="/nationality/">Nationality</Link>
      <Link to="/gender/">Gender</Link>
      <Link to="/age/">Age</Link>
      <Link to="/data/">Data</Link>
    </div>
    <div style={{ height: 500 }}>
      <CountOverTimeChart />
    </div>
    <div style={{ height: 500 }}>
      <CaseTypeProportionPieChart />
    </div>
  </Layout>
)

export default IndexPage
