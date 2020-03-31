import React from "react"

import { ResponsiveCalendar } from "@nivo/calendar"

import allOnDateCounts from "../../../content/all_on_date_counts.json"

const ArrivalDateCalendar = () => {
  const dates = Object.keys(allOnDateCounts)
  const minDate = dates[0]
  const maxDate = dates[dates.length - 1]
  const data = dates.map(date => ({
    day: date,
    value: allOnDateCounts[date].arrived,
  }))
  return (
    <>
      <ResponsiveCalendar
        data={data}
        from={minDate}
        to={maxDate}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </>
  )
}

export default ArrivalDateCalendar
