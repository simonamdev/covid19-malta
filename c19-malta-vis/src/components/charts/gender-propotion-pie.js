import React from "react"

import { ResponsivePie } from "@nivo/pie"

import genderProportion from "../../../content/case_proportion_by_gender.json"

const GenderProportionPieChart = () => {
  const male = genderProportion["male"]
  const female = genderProportion["female"]
  const other = genderProportion["other"]
  const transformedData = [
    {
      id: "male",
      label: "Male",
      value: male["count"],
      color: "hsl(155, 70%, 50%)",
    },
    {
      id: "female",
      label: "Female",
      value: female["count"],
      color: "hsl(7, 70%, 50%)",
    },
    {
      id: "other",
      label: "Other",
      value: other["count"],
      color: "hsl(7, 70%, 50%)",
    },
  ]

  return (
    <ResponsivePie
      data={transformedData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  )
}

export default GenderProportionPieChart
