import React from "react"

import CountCard from "../count-card"
import CountGraphCard from "../count-graph-card"

import caseCounts from "../../../../content/case_counts.json"

const TotalCountCard = () => {
  const totalCountData = caseCounts.per_day.map(dayCounts => ({
    x: dayCounts.date,
    y: dayCounts.counts_cumulative.count,
  }))
  const total = caseCounts.total
  return (
    <>
      <CountCard count={total} text="Total Cases" />
      <CountGraphCard count={total} text="Total Cases" data={totalCountData} />
    </>
  )
}

export default TotalCountCard
