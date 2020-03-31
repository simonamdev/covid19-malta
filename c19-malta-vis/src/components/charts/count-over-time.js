import React from "react"

import { ResponsiveLine } from "@nivo/line"

import cumulativeCountsByDate from "../../../content/cumulative_counts_by_date.json"

const CountOverTimeChart = () => {
  const cumulativeCounts = Object.keys(cumulativeCountsByDate).map(date => ({
    date,
    total: cumulativeCountsByDate[date].total,
    recovered: cumulativeCountsByDate[date].recovered,
    active: cumulativeCountsByDate[date].active,
  }))
  const transformedData = [
    {
      id: "Total",
      color: "hsl(212, 70%, 50%)",
      data: cumulativeCounts.map(dayCounts => ({
        x: dayCounts.date,
        y: dayCounts.total,
      })),
    },
    {
      id: "Active",
      color: "hsl(212, 70%, 50%)",
      data: cumulativeCounts.map(dayCounts => ({
        x: dayCounts.date,
        y: dayCounts.active,
      })),
    },
    {
      id: "Recovered",
      color: "hsl(180, 40%, 70%)",
      data: cumulativeCounts.map(dayCounts => ({
        x: dayCounts.date,
        y: dayCounts.recovered,
      })),
    },
  ]

  return (
    <ResponsiveLine
      data={transformedData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 0,
        tickRotation: 30,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={{ scheme: "nivo" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}

export default CountOverTimeChart
