import React from "react"

import { ResponsiveLine } from "@nivo/line"

import caseLocationsByDate from "../../../content/case_locations_by_date.json"

const CaseLocationsOverTimeLineChart = () => {
  const transformedData = [
    // {
    //   id: "Total",
    //   color: "hsl(20, 70%, 50%)",
    //   data: caseLocationsByDate.map(caseLocs => ({
    //     x: caseLocs.date,
    //     y: caseLocs.total,
    //   })),
    // },
    {
      id: "MDH ITU",
      color: "hsl(0, 100%, 50%)",
      data: caseLocationsByDate.map(caseLocs => ({
        x: caseLocs.date,
        y: caseLocs["MDH Intensive Therapy Unit"],
      })),
    },
    {
      id: "MDH IDU",
      color: "hsl(100, 70%, 50%)",
      data: caseLocationsByDate.map(caseLocs => ({
        x: caseLocs.date,
        y: caseLocs["MDH Infectious Diseases Unit"],
      })),
    },
    {
      id: "STH",
      color: "hsl(150, 70%, 50%)",
      data: caseLocationsByDate.map(caseLocs => ({
        x: caseLocs.date,
        y: caseLocs["St. Thomas Hospital"],
      })),
    },
    {
      id: "At Home",
      color: "hsl(212, 70%, 50%)",
      data: caseLocationsByDate.map(caseLocs => ({
        x: caseLocs.date,
        y: caseLocs["At Home"],
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
        stacked: true,
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
      //   colors={{ scheme: "nivo" }}
      pointSize={5}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      useMesh={true}
      enableArea={true}
      areaOpacity={1.0}
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

export default CaseLocationsOverTimeLineChart
