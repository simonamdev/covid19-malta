import React from "react"

import CountCard from "./count-card"
import SimpleTrendLine from "../charts/simple-trend-line"

const CountGraphCard = ({ count, text, data }) => (
  <CountCard count={count} text={text} style={{ height: 200, width: 200 }}>
    <div style={{ height: 100 }}>
      <SimpleTrendLine data={data} />
    </div>
  </CountCard>
)

export default CountGraphCard
