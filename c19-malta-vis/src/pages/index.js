import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import CountCard from "../components/cards/count-card"

import TotalCountCard from "../components/cards/stats/total-count-card"

import CountOverTimeChart from "../components/charts/count-over-time"
import CaseTypeProportionPieChart from "../components/charts/case_type_proportion_pie"
import CaseTypeOverTimeLineChart from "../components/charts/case-type-over-time-line"
import CaseLocationsOverTimeLineChart from "../components/charts/case-locations-line"

import allCaseTypeCounts from "../../content/all_case_type_counts.json"

const IndexPage = () => {
  return (
    <Layout maxWidth="100%" hideLinkToHome>
      <SEO title="COVID-19 Malta" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        <TotalCountCard />
        <CountCard count={allCaseTypeCounts.count_active} text="Active Cases" />
        <CountCard
          count={allCaseTypeCounts.count_recovered}
          text="Recovered Cases"
        />
      </div>

      <div style={{ height: 500 }}>
        <CountOverTimeChart />
      </div>
      <div style={{ height: 500, display: "flex" }}>
        <div style={{ width: "60%" }}>
          <CaseTypeOverTimeLineChart />
        </div>
        <div style={{ width: "40%" }}>
          <CaseTypeProportionPieChart />
        </div>
      </div>
      <div style={{ height: 500 }}>
        <CaseLocationsOverTimeLineChart />
      </div>
    </Layout>
  )
}

export default IndexPage
