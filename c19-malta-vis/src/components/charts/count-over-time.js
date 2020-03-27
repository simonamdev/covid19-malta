import React from "react"

import { ResponsiveLine } from "@nivo/line"

import caseCounts from "../../../content/case_counts.json"

const CountOverTimeChart = () => {
  const transformedData = [
    {
      id: "Total",
      color: "hsl(212, 70%, 50%)",
      data: caseCounts.per_day.map(dayCounts => ({
        x: dayCounts.date,
        y: dayCounts.counts_cumulative.count,
      })),
    },
    {
      id: "Active",
      color: "hsl(212, 70%, 50%)",
      data: caseCounts.per_day.map(dayCounts => ({
        x: dayCounts.date,
        y: dayCounts.counts_cumulative.count_active,
      })),
    },
    {
      id: "Imported",
      color: "hsl(0, 70%, 50%)",
      data: caseCounts.per_day.map(dayCounts => ({
        x: dayCounts.date,
        y: dayCounts.counts_cumulative.count_imported,
      })),
    },
    {
      id: "Local Transmission",
      color: "hsl(75, 70%, 50%)",
      data: caseCounts.per_day.map(dayCounts => ({
        x: dayCounts.date,
        y: dayCounts.counts_cumulative.count_local,
      })),
    },
    {
      id: "Travel Related",
      color: "hsl(125, 70%, 50%)",
      data: caseCounts.per_day.map(dayCounts => ({
        x: dayCounts.date,
        y: dayCounts.counts_cumulative.count_exposure,
      })),
    },
    {
      id: "Recovered",
      color: "hsl(180, 40%, 70%)",
      data: caseCounts.per_day.map(dayCounts => ({
        x: dayCounts.date,
        y: dayCounts.counts_cumulative.count_recovered,
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
