import React from "react"

import { ResponsiveLine } from "@nivo/line"

const SimpleTrendLine = ({ data, max }) => (
  <ResponsiveLine
    data={[{ color: "hsl(212, 70%, 50%)", data }]}
    yScale={{
      type: "linear",
      min: "auto",
      max: max || "auto",
      reverse: false,
    }}
    lineWidth={5}
    enableArea={true}
    enablePoints={false}
    enableGridX={false}
    enableGridY={false}
    areaOpacity={0.8}
    colors={{ scheme: "nivo" }}
    pointSize={2}
    pointColor={{ theme: "background" }}
  />
)

export default SimpleTrendLine
