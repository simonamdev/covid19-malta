import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import TotalCountCard from "../components/cards/stats/total-count-card"
import TotalActiveCountCard from "../components/cards/stats/total-active-card"
import TotalRecoveredCountCard from "../components/cards/stats/total-recovered-card"

import CountOverTimeChart from "../components/charts/count-over-time"
import CaseTypeProportionPieChart from "../components/charts/case_type_proportion_pie"
import CaseTypeOverTimeLineChart from "../components/charts/case-type-over-time-line"
import CaseLocationsOverTimeLineChart from "../components/charts/case-locations-line"
import ArrivalDateCalendar from "../components/charts/arrival-date-calendar"
import SymptomDateCalendar from "../components/charts/symptom-date-calendar"

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
        <TotalRecoveredCountCard />
        <TotalActiveCountCard />
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
      <div style={{ height: 500 }}>
        <ArrivalDateCalendar />
      </div>
      <div style={{ height: 500 }}>
        <SymptomDateCalendar />
      </div>
    </Layout>
  )
}

export default IndexPage
