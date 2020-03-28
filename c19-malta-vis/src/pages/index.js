import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import CountCard from "../components/cards/count-card"

import CountOverTimeChart from "../components/charts/count-over-time"
import CaseTypeProportionPieChart from "../components/charts/case_type_proportion_pie"

import caseCounts from "../../content/case_counts.json"

const IndexPage = () => (
  <Layout maxWidth="100%" hideLinkToHome>
    <SEO title="COVID-19 Malta" />
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
      }}
    >
      <CountCard count={caseCounts.total} text="Cases in total so far" />
      <div style={{ height: 300, width: 500 }}>
        <CaseTypeProportionPieChart />
      </div>
    </div>

    <div style={{ height: 500 }}>
      <CountOverTimeChart />
    </div>
  </Layout>
)

export default IndexPage
