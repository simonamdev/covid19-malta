import React from "react"

import { ResponsiveHeatMap } from "@nivo/heatmap"

import caseCountsByAgeGroup from "../../../content/case_counts_by_age_group.json"

const AgeGroupCountHeatMap = () => {
  const ageGroups = Object.keys(caseCountsByAgeGroup)
  const countTypes = Object.keys(caseCountsByAgeGroup["0-9"]).filter(
    ct => ct !== "age_group"
  )
  const transformedData = Object.values(caseCountsByAgeGroup)
  for (let i = 0; i < ageGroups.length; i++) {
    transformedData[i]["age_group"] = ageGroups[i]
  }

  return (
    <ResponsiveHeatMap
      data={transformedData}
      keys={countTypes}
      indexBy="age_group"
      colors="reds"
      margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
      forceSquare={false}
      axisTop={{
        orient: "top",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: "",
        legendOffset: 36,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Age Group",
        legendPosition: "middle",
        legendOffset: -70,
      }}
      cellOpacity={1}
      cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(0, 0, 0, 0.9)",
          rotation: -45,
          lineWidth: 4,
          spacing: 7,
        },
      ]}
      fill={[{ id: "lines" }]}
      animate={true}
      motionStiffness={80}
      motionDamping={9}
      hoverTarget="cell"
      cellHoverOthersOpacity={0.25}
    />
  )
}

export default AgeGroupCountHeatMap
