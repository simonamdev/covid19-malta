import React from "react"

import CountGraphCard from "../count-graph-card"

import caseCounts from "../../../../content/case_counts.json"
import cumulativeCountsByDate from "../../../../content/cumulative_counts_by_date.json"

const TotalActiveCountCard = () => {
  const cumulativeCounts = Object.keys(cumulativeCountsByDate).map(date => ({
    date,
    active: cumulativeCountsByDate[date].active,
  }))
  const totalCountData = cumulativeCounts.map(dayCounts => ({
    x: dayCounts.date,
    y: dayCounts.active,
  }))
  return (
    <CountGraphCard
      count={caseCounts.total_active}
      max={caseCounts.total}
      text="Active Cases"
      data={totalCountData}
    />
  )
}

export default TotalActiveCountCard
