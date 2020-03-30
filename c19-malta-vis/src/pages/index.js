import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import CountCard from "../components/cards/count-card"
import CountGraphCard from "../components/cards/count-graph-card"

import CountOverTimeChart from "../components/charts/count-over-time"
import CaseTypeProportionPieChart from "../components/charts/case_type_proportion_pie"

import allCaseTypeCounts from "../../content/all_case_type_counts.json"
import caseCounts from "../../content/case_counts.json"

const IndexPage = () => {
  const totalCountData = caseCounts.per_day.map(dayCounts => ({
    x: dayCounts.date,
    y: dayCounts.counts_cumulative.count,
  }))

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
        <CountCard count={allCaseTypeCounts.count} text="Total Cases" />
        <CountGraphCard
          count={allCaseTypeCounts.count}
          text="Total Cases"
          data={totalCountData}
        />
        <CountCard count={allCaseTypeCounts.count_active} text="Active Cases" />
        <CountCard
          count={allCaseTypeCounts.count_recovered}
          text="Recovered Cases"
        />
        <div style={{ height: 300, width: 500 }}>
          <CaseTypeProportionPieChart />
        </div>
      </div>

      <div style={{ height: 500 }}>
        <CountOverTimeChart />
      </div>
    </Layout>
  )
}

export default IndexPage
