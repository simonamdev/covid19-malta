import React from "react"

import CountGraphCard from "../count-graph-card"

import caseCounts from "../../../../content/case_counts.json"
import cumulativeCountsByDate from "../../../../content/cumulative_counts_by_date.json"

const TotalRecoveredCountCard = () => {
  const cumulativeCounts = Object.keys(cumulativeCountsByDate).map(date => ({
    date,
    recovered: cumulativeCountsByDate[date].recovered,
  }))
  const totalCountData = cumulativeCounts.map(dayCounts => ({
    x: dayCounts.date,
    y: dayCounts.recovered,
  }))
  return (
    <CountGraphCard
      count={caseCounts.total_recovered}
      max={caseCounts.total}
      text="Recovered Cases"
      data={totalCountData}
    />
  )
}

export default TotalRecoveredCountCard
