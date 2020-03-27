import React from "react"

import { ResponsiveBar } from "@nivo/bar"

import atRiskByAgeGroup from "../../../content/at_risk_count_by_age_group.json"

const MortalityByAgeBarChart = () => {
  const transformedData = atRiskByAgeGroup.map(
    ({ low, high, risk_percentage }) => ({
      age_group: `${low} - ${high}`,
      risk_percentage,
    })
  )

  return (
    <ResponsiveBar
      data={transformedData}
      keys={["risk_percentage"]}
      indexBy="age_group"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
        legend: "Age Group",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Risk Percentage",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  )
}

export default MortalityByAgeBarChart
